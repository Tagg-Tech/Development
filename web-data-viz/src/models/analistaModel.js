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

function buscarUltimosRegistros(idEmpresa, componente) {
    let colunaPercentual = "";
    if (componente === "CPU") {
        colunaPercentual = "percentualCPU";
    } else if (componente === "RAM") {
        colunaPercentual = "percentualMemoria";
    } else if (componente === "Disco") {
        colunaPercentual = "percentualDisco";
    }

    var instrucaoSql = `
        SELECT 
            m.idMaquina, 
            r.${colunaPercentual} AS percentual,
            r.dataHora AS ultimaAtualizacao
        FROM maquina m
        LEFT JOIN registros r 
            ON r.fkMaquina = m.idMaquina 
            AND r.dataHora = (
                SELECT MAX(dataHora)
                FROM registros
                WHERE fkMaquina = m.idMaquina
            )
        WHERE m.fkEmpresa = ${idEmpresa};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarMaquinas,
    buscarUltimosRegistros
};
