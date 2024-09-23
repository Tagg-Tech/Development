var database = require("../database/config")


function cadastrar( placaderede, memoria, sistemaOperacional, cpu, disco) {
    var instrucaoSql = `
        INSERT INTO usuario (placaDeRede, qtd_totalmemoria, sistemaOperacional, qtd_cpu, qtd_totaldisco, fkEmpresa) VALUES ('${placaderede}', '${memoria}', '${sistemaOperacional}', '${cpu}', '${disco}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};