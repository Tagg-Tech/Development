var database = require("../database/config");

function buscarMaquinas(idEmpresa) {
    var instrucaoSql = `
        SELECT 
            m.idMaquina, 
            m.placaDeRede, 
            m.sistemaOperacional, 
            m.qtdTotalRAM, 
            m.qtdCpu, 
            m.qtdTotalDisco,
            r.percentualMemoria, 
            r.percentualDisco, 
            r.percentualCPU, 
            r.dataHora
        FROM maquina m
        LEFT JOIN registros r ON r.fkMaquina = m.idMaquina
        WHERE m.fkEmpresa = ${idEmpresa} 
        ORDER BY r.dataHora DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRegistros(idEmpresa, intervalo = 'DIARIO') {
    let agrupamentoData;
    switch (intervalo.toUpperCase()) {
        case 'SEMANAL':
            agrupamentoData = "YEARWEEK(r.dataHora)";
            break;
        case 'MENSAL':
            agrupamentoData = "DATE_FORMAT(r.dataHora, '%Y-%m')";
            break;
        default:
            agrupamentoData = "DATE(r.dataHora)";
            break;
    }

    var instrucaoSql = `
        SELECT 
            ${agrupamentoData} AS periodo, 
            AVG(r.percentualCPU) AS mediaCPU,
            AVG(r.percentualMemoria) AS mediaMemoria,
            AVG(r.percentualDisco) AS mediaDisco
        FROM registros r
        JOIN maquina m ON r.fkMaquina = m.idMaquina
        WHERE m.fkEmpresa = ${idEmpresa}
        GROUP BY periodo
        ORDER BY periodo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarMaquinas,
    buscarRegistros
};
