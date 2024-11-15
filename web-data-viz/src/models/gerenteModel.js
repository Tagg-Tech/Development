var database = require("../database/config");

function reqDados(idUsuario) {

    var instrucaoSql = `
        SELECT reg.fkMaquina, AVG(reg.percentualCPU) AS mediaPercentualCPU FROM registros reg JOIN usuarioresponsavelmaquina assoc ON reg.fkMaquina = assoc.fkMaquina WHERE assoc.fkUsuario = ${idUsuario} AND reg.dataHora BETWEEN NOW() - INTERVAL 30 DAY AND NOW() GROUP BY reg.fkMaquina;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function reqDadosRam(idUsuario){

    var instrucaoSql = `
        SELECT maquina.placaDeRede AS servidor, DATE(registros.dataHora) AS dia, AVG(registros.percentualMemoria) AS media_ram FROM registros JOIN maquina ON registros.fkMaquina = maquina.idMaquina JOIN usuarioresponsavelmaquina assoc ON registros.fkMaquina = assoc.fkMaquina WHERE assoc.fkUsuario = ${idUsuario} GROUP BY maquina.placaDeRede, DATE(registros.dataHora) ORDER BY dia DESC, servidor;
    `;
    console.log("Executando a instrução SQL(ram): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    reqDados,
    reqDadosRam
};
