//servidorModel.js
var database = require("../database/config");

function cadastrar(placaderede, memoria, sistemaOperacional, cpu, disco, porcentagemAlarmeCPU, 
    porcentagemAlarmeRAM, porcentagemAlarmeDisco ) {
    var instrucaoSql = `
        INSERT INTO maquina (placaDeRede, qtdTotalmemoria, sistemaOperacional, qtdCpu, qtdTotaldisco, porcentagemAlarmeCPU, 
        porcentagemAlarmeRAM, porcentagemAlarmeDisco  fkEmpresa)
         VALUES ('${placaderede}', '${memoria}', '${sistemaOperacional}', '${cpu}', '${disco}', '${porcentagemAlarmeCPU}' , '${porcentagemAlarmeRAM}' , '${porcentagemAlarmeDisco}' , '1');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarCpuRamPorcentagem(id_usuario, fk_maquina){
    var instrucaoSql = `
        SELECT percentualCPU, percentualMemoria FROM registros AS r 
	        JOIN usuarioresponsavelmaquina AS u ON r.fkMaquina = '${fk_maquina}'
            WHERE u.fkUsuario = '${id_usuario}';
    `;
    //console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarUsoDisco(fk_maquina){
    var instrucaoSql = `
        SELECT percentualDisco FROM registros AS r
        	JOIN usuarioResponsavelMaquina AS u ON r.fkMaquina = u.fkMaquina
            WHERE u.fkMaquina = '${fk_maquina}'; 
    `;
    //console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarRAM(fk_maquina){
    var instrucaoSql = `
        SELECT r.gigaBytesMemoria, m.qtdTotalRAM, r.percentualMemoria, m.alertaRAM FROM registros AS r
        	JOIN maquina AS m ON m.idMaquina = r.fkMaquina
            WHERE fkMaquina = '${fk_maquina}';
    `;
    //console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function isInstable(id_usuario, fk_maquina){
    var instrucaoSql = `
        SELECT percentualCPU, alertaCPU FROM registros AS r 
        	JOIN usuarioresponsavelmaquina AS u ON r.fkMaquina = '${fk_maquina}'
            JOIN maquina AS m ON m.idMaquina = r.fkMaquina
            WHERE u.fkUsuario = '${id_usuario}';
    `;
    //console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    pegarCpuRamPorcentagem,
    pegarUsoDisco,
    pegarRAM,
    isInstable
};
