const { buscarTodos } = require("../controllers/gerenteController");
var database = require("../database/config");

function reqDados(idUsuario) {

    var instrucaoSql = `
SELECT reg.fkMaquina AS maquina, ROUND(AVG(reg.percentualCPU), 2) AS mediaPercentualCPU FROM registros reg JOIN usuarioResponsavelMaquina assoc ON reg.fkMaquina = assoc.fkMaquina WHERE assoc.fkUsuario = ${idUsuario} AND reg.dataHora >= CURDATE() AND reg.dataHora <= NOW() GROUP BY reg.fkMaquina;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function reqDadosRam(idUsuario){

    var instrucaoSql = `
        SELECT maquina.placaDeRede AS servidor, DATE(registros.dataHora) AS dia, AVG(registros.gigabytesMemoria) AS media_ram FROM registros JOIN maquina ON registros.fkMaquina = maquina.idMaquina JOIN usuarioResponsavelMaquina assoc ON registros.fkMaquina = assoc.fkMaquina WHERE assoc.fkUsuario = ${idUsuario} GROUP BY maquina.placaDeRede, DATE(registros.dataHora) ORDER BY dia DESC, servidor;
    `;
    console.log("Executando a instrução SQL(ram): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function reqLimites(idUsuario){

    var instrucaoSql = `
       SELECT maq.idMaquina, maq.alertaCPU, maq.alertaRAM FROM usuarioResponsavelMaquina JOIN maquina AS maq ON fkMaquina = idMaquina WHERE fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL(ram): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarSemMedia(idUsuario){

    var instrucaoSql = `
        SELECT reg.fkMaquina AS maquina, reg.percentualCPU AS regCpu, reg.percentualMemoria as regRAM FROM registros reg JOIN usuarioResponsavelMaquina assoc ON reg.fkMaquina = assoc.fkMaquina WHERE assoc.fkUsuario = ${idUsuario} AND reg.dataHora >= CURDATE() AND reg.dataHora <= NOW() ORDER BY regCpu DESC;

    `;
    console.log("Executando a instrução SQL(ram): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    reqDados,
    reqDadosRam,
    reqLimites,
    buscarSemMedia
};
