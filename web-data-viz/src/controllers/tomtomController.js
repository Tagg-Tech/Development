const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config({ path: ".env" });
const apiKey = process.env.TOM_TOKEN;
const url = 'https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json';


// Lista de localizações dos trechos onde há pedágios
const listaLocalizacoes = [
    '-23.341210,-46.573664', '-23.322298,-46.581097', '-23.330558,-46.578337'
];

async function consultarDadosTrafego(req, res) {
    //Constante para armazenar os resultados da localização:
    const resultados = [];
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

                    // Criação de objeto com dados de tráfego
                    resultados.push({
                        localizacao,
                        velocidadeAtual: data.flowSegmentData.currentSpeed,
                        velocidadeLivre: data.flowSegmentData.freeFlowSpeed,
                        confiabilidade: data.flowSegmentData.confidence,
                        coordenadas_inicial: filteredCoordinates[0],
                        coordenadas_final: filteredCoordinates[1],
                        dataHora: new Date().toISOString()
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