var database = require("../database/config")

function cadastrar(nome, email, senha, cargo, telefone, cpf,foto, codigo) {
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, cargo, telefone, cpf, fotoPerfil, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', '${cargo}', '${telefone}', '${cpf}','${foto}', '${codigo}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function alterar(id, email, senha, telefone, foto) {
    console.log("ACESSEI O USUARIO MODEL em ALTERAR \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",id, email, senha, telefone, foto);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
    UPDATE usuario SET email = '${email}', senha = '${senha}', telefone = '${telefone}', fotoPerfil = '${foto}' WHERE idUsuario = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    alterar
};
