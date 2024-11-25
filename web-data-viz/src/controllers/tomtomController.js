const dotenv = require('dotenv');
const csv = require('csv-parser');
const fs = require('fs');

// Carregar variáveis de ambiente
dotenv.config({ path: ".env" });
const apiKey = process.env.TOM_TOKEN;
const url = 'https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json';

// Variáveis de escopo global:
// Lista de localizações dos trechos onde há pedágios
const listaLocalizacoes = [
    '-23.341210,-46.573664', '-23.322298,-46.581097', '-23.330558,-46.578337', '-22.908685,-46.424877','-22.628487,-46.077890',
    '-21.970441,-45.631188', '-21.545700,-45.240203', '-21.000367,-44.966967', '-20.591486,-44.701506', '-20.268346,-44.423711',
    '-22.476441,-42.088519', '-21.552594,-41.331597', '-22.687469,-42.539855', '-22.774713,-42.945500', '-22.049750,-41.685157'
];



// Carregar o CSV com as informações dos trechos de rodovias
function loadCsv(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath, {encoding: 'utf8'}) // Estrutura do leitor do CSV, semelhante ao do Java
            .pipe(csv({ separator: ';' }))
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
}


// Busca informações do trecho com base nas coordenadas
async function getInfoDeRodovia(coordinates, caminhoCsv) {
    const trechos = await loadCsv(caminhoCsv);

    // Procura pelas coordenadas exatas no arquivo CSV
    for (const trecho of trechos) {
        const trechoLat = parseFloat(trecho.latitude.replace(',', '.'));
        const trechoLon = parseFloat(trecho.longitude.replace(',', '.'));
        const [lat, lon] = coordinates.split(',').map(Number);

        if (trechoLat === lat && trechoLon === lon) {
            return {
                rodovia: trecho.rodovia,
                municipio: trecho.municipio,
                uf: trecho.uf,
                concessionaria: trecho.concessionaria,
            };
        }
    }

    return null; // Caso nenhuma correspondência seja encontrada
}


async function consultarDadosTrafego(req, res) {
    //Constante para armazenar os resultados da localização:
    const resultados = [];
    // Constante de localizações de arquivo de praças de pedágios
    const caminhoCsv = __dirname + '/pracas.csv';
    console.log(`Chave da API : ${apiKey}`);

    //Monta as requisições iterando a partir da listaLocalizacoes
    for (const localizacao of listaLocalizacoes) {
        const params = new URLSearchParams({
            key: apiKey,
            point: localizacao,
            unit: 'KMPH',
        });

        try {
            const response = await fetch(`${url}?${params}`);
            if (response.ok) {
                // Convertendo a resposta da requisição
                const data = await response.json();
                // Verificar se os dados esperados estão disponíveis, nesse caso o if se encarrega de verificar se o elemento existe
                if (data.flowSegmentData && data.flowSegmentData.coordinates) {
                    const coordinates = data.flowSegmentData.coordinates.coordinate;
                    const filteredCoordinates = [coordinates[0], coordinates[coordinates.length - 1]];


                    // Consultar informações da rodovia no CSV
                    const highwayInfo = await getInfoDeRodovia(localizacao, caminhoCsv);

                    // Criação de objeto com dados de tráfego e informações de pedágios correspondentes
                    resultados.push({
                        localizacao,
                        rodovia: highwayInfo ? highwayInfo.rodovia : 'Desconhecida',
                        municipio: highwayInfo ? highwayInfo.municipio : 'Desconhecido',
                        uf: highwayInfo ? highwayInfo.uf : 'Desconhecido',
                        concessionaria: highwayInfo ? highwayInfo.concessionaria : 'Desconhecida',
                        velocidadeAtual: data.flowSegmentData.currentSpeed,
                        velocidadeLivre: data.flowSegmentData.freeFlowSpeed,
                        confiabilidade: data.flowSegmentData.confidence,
                        coordenadas_inicial: filteredCoordinates[0],
                        coordenadas_final: filteredCoordinates[1],
                        dataHora: new Date().toISOString(),
                    });
                } else {
                    console.error('Dados insuficientes para a localização:', localizacao);
                }
            } else {
                console.error(`Erro na requisição para ${localizacao}: ${response.status}`);
            }
        } catch (error) {
            console.error('Erro ao processar a requisição:', error);
        }
    }

    console.log(resultados[0]);
    // Enviando resultados ao termino do for
    res.status(200).send({
        msg: "Requisição bem sucedida!",
        data: resultados
    });
};

module.exports = {
    consultarDadosTrafego
}