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

const listaLocCompleta = [
    '-23.341210,-46.573664', '-23.322298,-46.581097', '-23.330558,-46.578337', '-22.908685,-46.424877', '-22.628487,-46.077890', '-21.970441,-45.631188',
    '-21.545700,-45.240203', '-21.000367,-44.966967', '-20.591486,-44.701506', '-20.268346,-44.423711', '-22.476441,-42.088519', '-21.552594,-41.331597',
    '-22.687469,-42.539855', '-22.774713,-42.945500', '-22.049750,-41.685157', '-25.747708,-49.129655', '-25.991898,-48.881469', '-26.591635,-48.722079',
    '-27.185065,-48.612362', '-27.885105,-48.647677', '-27.010584,-50.374335', '-25.713458,-49.318037', '-26.570363,-50.221795', '-26.070580,-49.739911',
    '-27.010584,-50.428716', '-23.787647,-46.913922', '-24.157869,-47.326280', '-24.389325,-47.722391', '-24.722483,-48.082580', '-24.964044,-48.412000',
    '-25.289252,-48.933841', '-16.115707,-48.589240', '-19.617614,-47.346547', '-19.776951,-48.458219', '-16.438631,-49.019137', '-17.163180,-49.212582',
    '-18.268544,-49.245811', '-19.471586,-48.871046', '-20.142521,-49.110488', '-19.909615,-44.506725', '-19.788259,-45.584630', '-19.647341,-46.240088',
    '-22.609965,-43.285552', '-22.284389,-43.120269', '-21.928252,-43.316282', '-15.810000,-55.310000', '-17.219391,-54.758685', '-16.393565,-54.714281',
    '-15.702041,-55.829527', '-15.349875,-56.415628', '-14.599728,-56.240858', '-13.919520,-56.093419', '-13.265990,-56.022777', '-12.441635,-55.653798',
    '-18.539374,-48.046762', '-18.749841,-48.235551', '-17.772000,-47.749953', '-19.915657,-47.829377', '-17.121178,-47.721416', '-19.180717,-48.157415',
    '-18.184679,-39.922088', '-18.860000,-39.940000', '-19.563100,-40.177600', '-20.032507,-40.396538', '-20.519316,-40.478607', '-20.878542,-40.966079',
    '-21.158397,-41.280614', '-22.877944,-43.115734', '-22.820833,-43.805000', '-22.607222,-43.028611', '-22.670000,-42.980000', '-21.638611,-42.710277',
    '-21.278333,-42.412222', '-20.823611,-42.321111', '-20.430277,-42.163055', '-19.991666,-42.143611', '-19.468055,-42.133888', '-19.027777,-41.989444',
    '-22.647307,-43.187968', '-22.657363,-43.086196', '-22.610815,-43.032112', '-22.716277,-43.716858', '-22.715213,-43.730252', '-31.851958,-52.326177',
    '-31.026386,-52.049430', '-31.449786,-52.640644', '-31.820075,-52.526711', '-31.625261,-52.318116', '-11.446100,-48.990283', '-12.340000,-49.150000',
    '-12.943414,-49.133122', '-13.791358,-49.034842', '-14.372969,-49.158264', '-14.799372,-49.284164', '-15.827072,-49.281722', '-14.814189,-49.042442',
    '-16.001028,-48.840289', '-18.876436,-48.519762', '-18.881821,-49.035257', '-18.962292,-49.591723', '-18.912533,-50.224138', '-18.882177,-50.756750',
    '-18.471225,-51.082657', '-18.111396,-51.480543', '-25.552500,-49.036388', '-23.003888,-49.909722', '-24.912222,-50.086388', '-24.319166,-49.778611',
    '-23.865169,-54.329788', '-23.167432,-54.198970', '-22.476042,-54.860799', '-21.865146,-54.528504', '-20.882783,-54.504644', '-20.040000,-54.410000',
    '-19.473376,-54.496991', '-18.722782,-54.814951', '-17.766671,-54.750815', '-22.910000,-43.890000', '-23.050000,-44.580000', '-23.006320,-44.099135',
    '-23.340000,-46.150000', '-23.420000,-46.370000', '-23.350000,-46.160000', '-23.410000,-46.360000', '-23.410000,-46.360000', '-22.490000,-44.570000',
    '-22.490000,-44.570000', '-23.300000,-46.010000', '-23.300000,-46.010000', '-22.930000,-45.360000', '-22.930000,-45.360000', '-22.716155,-43.716697',
    '-22.715133,-43.730239', '-22.485435,-43.919084', '-22.208911,-43.382139', '-21.962326,-42.861675', '-20.588611,-49.318055', '-20.997500,-49.628333',
    '-21.710555,-49.808611', '-22.336311,-49.898833', '-16.738900,-47.617540', '-20.767020,-43.806680', '-21.262710,-43.662240', '-17.098310,-47.026240',
    '-17.505980,-46.564650', '-17.945770,-46.034250', '-18.132650,-45.408170', '-18.565400,-45.021160', '-19.079300,-44.654950', '-19.601210,-44.221960',
    '-20.272880,-43.951120', '-25.470000,-49.660000', '-25.470000,-49.900000', '-25.440000,-50.720000', '-25.160000,-50.540000', '-25.725664,-49.699992',
    '-12.751217,-38.431574', '-12.451647,-38.708421', '-12.531931,-39.415020', '-13.008714,-39.957042', '-14.055969,-40.204450', '-14.646178,-40.455782',
    '-15.232323,-41.100949', '-11.339218,-55.331222', '-9.756473,-54.894430', '-4.620594,-55.951381', '-28.350722,-48.739429', '-28.554278,-49.054214',
    '-28.897740,-49.473136', '-29.243667,-49.754475', '-20.272880,-43.951120', '-20.767020,-43.806680', '-21.262710,-43.662240', '-29.520461,-49.996581',
    '-29.819760,-51.360405', '-29.626833,-51.775773', '-28.905316,-52.396797', '-28.502039,-52.644709', '-29.885897,-50.448964', '-29.925023,-50.859104'
];


async function consultarDadosTrafego(req, res) {
    // Verificando se o cliente deseja ou não atualizar os dados de API
    const reqType = req.params.condition == "true";
    // Requisitando dados da API armazenados em cache
    const dataApi = cache.get("dadosApi");

    console.log(dataApi == undefined)
    console.log(reqType)

    // Verificando se há dados de API ou se o usuário deseja uma atualização
    if (dataApi == undefined || reqType) {
        console.log("Enviando dados quentes!");
        //Constante para armazenar os resultados da localização:
        const resultados = [];
        // Constante de localizações de arquivo de praças de pedágios
        const caminhoCsv = __dirname + '/pracasTeste.csv';
        console.log(`Chave da API : ${apiKey}`);

        //Monta as requisições iterando a partir da listaLocalizacoes
        for (const localizacao of listaLocCompleta) {
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
                            praca: highwayInfo ? highwayInfo.praca : 'Desconhecida',
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
                praca: trecho.praca_de_pedagio
            };
        }
    }

    return null; // Caso nenhuma correspondência seja encontrada
}

module.exports = {
    consultarDadosTrafego
}