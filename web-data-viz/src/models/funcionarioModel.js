var database = require("../database/config")

function cadastrar(nome, email, senha, cargo, telefone, cpf, codigo) {
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, cargo, telefone, cpf, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', '${cargo}', '${telefone}', '${cpf}', '${codigo}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};
