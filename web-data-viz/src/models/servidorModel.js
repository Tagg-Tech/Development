var database = require("../database/config");

function cadastrar(placaderede, memoria, sistemaOperacional, cpu, disco, porcentagemAlarme) {
    var instrucaoSql = `
        INSERT INTO maquina (placaDeRede, qtdTotalmemoria, sistemaOperacional, qtdCpu, qtdTotaldisco, porcentagemAlarme, fkEmpresa)
         VALUES ('${placaderede}', '${memoria}', '${sistemaOperacional}', '${cpu}', '${disco}', '${porcentagemAlarme}', '1');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};
