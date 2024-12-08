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

function pegarCpuRamPorcentagem(id_usuario){
    var instrucaoSql = `
        SELECT percentualCPU, percentualMemoria FROM registros AS r 
	        JOIN usuarioresponsavelmaquina AS u ON r.fkMaquina = u.fkMaquina
            WHERE u.fkUsuario = '${id_usuario}';
    `;


    // var instrucaoSql = `
        // SELECT percentualCPU, percentualMemoria FROM registros AS r 
	        // JOIN usuarioresponsavelmaquina AS u ON r.fkMaquina = '${fk_maquina}'
            // WHERE u.fkUsuario = '${id_usuario}';
    // `;
    //console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarUsoDisco(id_usuario){
    var instrucaoSql = `
        SELECT percentualDisco FROM registros AS r
	        JOIN usuarioResponsavelMaquina AS u ON r.fkMaquina = u.fkMaquina
            WHERE u.fkUsuario = '${id_usuario}';
    `;

    // var instrucaoSql = `
    //     SELECT percentualDisco FROM registros AS r
    //     	JOIN usuarioResponsavelMaquina AS u ON r.fkMaquina = u.fkMaquina
    //         WHERE u.fkMaquina = '${fk_maquina}'; 
    // `;
    //console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarRAM(id_usuario){
    var instrucaoSql = `
        SELECT r.gigaBytesMemoria, m.qtdTotalRAM, r.percentualMemoria, m.porcentagemAlarmeRAM FROM registros AS r
	        JOIN maquina AS m ON m.idMaquina = r.fkMaquina
            JOIN usuarioresponsavelmaquina AS u ON u.fkMaquina = m.idMaquina
            WHERE u.fkUsuario = '${id_usuario}';
    `
    // var instrucaoSql = `
    //     SELECT r.gigaBytesMemoria, m.qtdTotalRAM, r.percentualMemoria, m.porcentagemAlarmeRAM FROM registros AS r
    //     	JOIN maquina AS m ON m.idMaquina = r.fkMaquina
    //         WHERE fkMaquina = '${fk_maquina}';
    // `;
    //console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function isInstable(id_usuario){
    var instrucaoSql = `
        SELECT percentualCPU, porcentagemAlarmeCPU FROM registros AS r 
	        JOIN usuarioresponsavelmaquina AS u ON r.fkMaquina = u.fkMaquina
            JOIN maquina AS m ON m.idMaquina = r.fkMaquina
            WHERE u.fkUsuario = '${id_usuario}';
    `

    // var instrucaoSql = `
    //     SELECT percentualCPU, porcentagemAlarmeCPU FROM registros AS r 
    //     	JOIN usuarioresponsavelmaquina AS u ON r.fkMaquina = '${fk_maquina}'
    //         JOIN maquina AS m ON m.idMaquina = r.fkMaquina
    //         WHERE u.fkUsuario = '${id_usuario}';
    // `;
    //console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function qtdAlertasUmServidor(id_usuario){
    var instrucaoSql = `
        SELECT
            COUNT(*) AS quantidade_alertas
        FROM
            registros AS r
        JOIN
            maquina AS m ON r.fkMaquina = m.idMaquina
        JOIN
            usuarioResponsavelMaquina urm ON m.idMaquina = urm.fkMaquina
        WHERE
            urm.fkUsuario = '${id_usuario}'
            AND m.idMaquina = r.fkMaquina
            AND (
                r.percentualCPU > m.porcentagemAlarmeCPU
                OR r.percentualMemoria > m.porcentagemAlarmeRAM
                OR r.percentualDisco > m.porcentagemAlarmeDisco
            );
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    pegarCpuRamPorcentagem,
    pegarUsoDisco,
    pegarRAM,
    isInstable,
    qtdAlertasUmServidor
};
