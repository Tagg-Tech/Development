var database = require("../database/config")


function cadastrar(id, placaderede, senha, memoria, sistemaoperacional, cpu, disco) {
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, cargo, telefone, cpf, fkEmpresa) VALUES ('${id}', '${placaderede}', '${senha}', '${memoria}', '${sistemaoperacional}', '${cpu}', '${disco}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};