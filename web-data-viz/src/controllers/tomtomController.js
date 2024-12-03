const dotenv = require('dotenv');
const csv = require('csv-parser');
const fs = require('fs');
const iconv = require('iconv-lite');
const NodeCache = require('node-cache');
const cache = new NodeCache();

// Carregar variáveis de ambiente
dotenv.config({ path: ".env" });
const apiKey = process.env.TOM_TOKEN;
const url = 'https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json';

// Variáveis de escopo global:
// Lista de localizações dos trechos onde há pedágios

// Amostra com 10 localizações
const listaLoc10 = [
    '-23.341210,-46.573664', '-23.322298,-46.581097', '-23.330558,-46.578337', '-22.908685,-46.424877', '-22.628487,-46.077890',
    '-21.970441,-45.631188', '-21.545700,-45.240203', '-21.000367,-44.966967', '-20.591486,-44.701506', '-20.268346,-44.423711',
]

// Amostra com 15 localizações
const listaLoc15 = [
    '-23.341210,-46.573664', '-23.322298,-46.581097', '-23.330558,-46.578337', '-22.908685,-46.424877', '-22.628487,-46.077890',
    '-21.970441,-45.631188', '-21.545700,-45.240203', '-21.000367,-44.966967', '-20.591486,-44.701506', '-20.268346,-44.423711',
    '-22.476441,-42.088519', '-21.552594,-41.331597', '-22.687469,-42.539855', '-22.774713,-42.945500', '-22.049750,-41.685157'
];

// Amostra com 45 localizações
const listaLoc45 = [
    '-27.185065,-48.612362', '-27.885105,-48.647677', '-27.010584,-50.374335', '-25.713458,-49.318037', '-26.570363,-50.221795', '-26.070580,-49.739911',
    '-27.010584,-50.428716', '-23.787647,-46.913922', '-24.157869,-47.326280', '-24.389325,-47.722391', '-24.722483,-48.082580', '-24.964044,-48.412000',
    '-25.289252,-48.933841', '-16.115707,-48.589240', '-19.617614,-47.346547', '-19.776951,-48.458219', '-16.438631,-49.019137',
    '-17.163180,-49.212582', '-18.268544,-49.245811', '-19.471586,-48.871046', '-20.142521,-49.110488', '-19.909615,-44.506725', '-19.788259,-45.584630',
];


async function consultarDadosTrafego(req, res) {
    // Requisitando dados da API armazenados em cache
    const dataApi = cache.get("dadosApi");

    // Verificando se há dados de API
    if (dataApi == undefined) {
        console.log("Enviando dados quentes!");
        //Constante para armazenar os resultados da localização:
        const resultados = [];
        // Constante de localizações de arquivo de praças de pedágios
        const caminhoCsv = __dirname + '/pracas.csv';
        console.log(`Chave da API : ${apiKey}`);

        //Monta as requisições iterando a partir da listaLocalizacoes
        for (const localizacao of listaLoc10) {
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
                        console.error('Dados insuficientes para a localização: ', localizacao);
                    }
                } else {
                    console.error(`Erro na requisição para ${localizacao}: ${response.status}`);
                }
            } catch (error) {
                console.error('Erro ao processar a requisição:', error);
            }
        }

        resultados.forEach(result => console.log("Notação: " + result.municipio));

        // Armazenando dados da API no cache do servidor
        cache.set("dadosApi", resultados, 0); // O tempo foi setado como zero, ou seja, não expira

        // Enviando resultados ao termino do for
        res.status(200).send({
            msg: "Requisição bem sucedida!",
            data: resultados
        });
    } else {
        // Enviando dados armazenados em cache
        console.log("Enviando dados de cache!");
        res.status(200).send({
            msg: "Requisição bem sucedida!",
            data: dataApi
        });
    }
};

// Carregar o CSV com as informações dos trechos de rodovias
function loadCsv(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath, { encoding: 'utf-8' }) // Estrutura do leitor do CSV, semelhante ao do Java
            // .pipe(iconv.decodeStream('ISO-8859-1'))
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

module.exports = {
    consultarDadosTrafego
}