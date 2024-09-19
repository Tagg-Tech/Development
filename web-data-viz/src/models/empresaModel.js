var database = require("../database/config")

function cadastrar(razaoSocial, nomeFantasia, cnpj, cep){
    var instrucao = `
        INSERT INTO empresa (razaoSocial, nomeFantasia, cnpj, cep) VALUES ('${razaoSocial}', '${nomeFantasia}', '${cnpj}', '${cep}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};