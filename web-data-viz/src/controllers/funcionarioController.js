var funcionarioModel = require("../models/funcionarioModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var cargo = req.body.cargoServer;
    var telefone = req.body.telefoneServer;
    var cpf = req.body.cpfServer;
    var foto = req.body.fotoServer;
    var codigo = req.body.codigoServer;
    
    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cargo == undefined) {
        res.status(400).send("Seu cargo está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (foto == undefined) {
        res.status(400).send("Sua foto está undefined!");
    } else if (codigo == undefined) {
        res.status(400).send("Seu codigo está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        funcionarioModel.cadastrar(nome, email, senha, cargo, telefone, cpf,foto, codigo)
            .then(
                function (resultado) {
                    res.status(200).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function alterar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo perfil.html

    var id = req.body.idServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var telefone = req.body.telefoneServer;
    var foto = req.body.fotoServer;
    
    // Faça as validações dos valores
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (foto == undefined) {
        res.status(400).send("Sua foto está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        funcionarioModel.alterar(id, email, senha,telefone,foto)
            .then(
                function (resultado) {
                    res.status(200).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a alteração! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está indefinida!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        funcionarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        res.status(200).json(resultadoAutenticar);
                        if(resultadoAutenticar > 0){
                            res.json({
                                idUsuario: resultadoAutenticar[0].idUsuario,
                                nome: resultadoAutenticar[0].nome,
                                email: resultadoAutenticar[0].email,
                                cargo: resultadoAutenticar[0].cargo,
                                senha: resultadoAutenticar[0].senha,
                            });
                        }
                    } else if (resultadoAutenticar.length == 0) {   
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function associar(req, res){
    // Crie uma variável que vá recuperar os valores do arquivo perfil.html
    var codFuncionarioAssociar = req.body.codFuncionarioAssociarServer;
    var codServidorReferencia = req.body.codServidorReferenciaServer;
    
    // Faça as validações dos valores
    if (codFuncionarioAssociar == undefined) {
        res.status(400).send("Seu código de funcionário está undefined!");
    } else if (codServidorReferencia == undefined) {
        res.status(400).send("Seu servidor de referência está undefined!");
    } else {

        funcionarioModel.associar(codFuncionarioAssociar, codServidorReferencia)
            .then(
                function (resultado) {
                    res.status(200).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao associar este funcionário a este servidor",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}



function desassociar(req, res){
    // Crie uma variável que vá recuperar os valores do arquivo perfil.html
    var codFuncionarioAssociar = req.body.codFuncionarioAssociarServer;
    var codServidorReferencia = req.body.codServidorReferenciaServer;
    
    // Faça as validações dos valores
    if (codFuncionarioAssociar == undefined) {
        res.status(400).send("Seu código de funcionário está undefined!");
    } else if (codServidorReferencia == undefined) {
        res.status(400).send("Seu servidor de referência está undefined!");
    } else {

        funcionarioModel.desassociar(codFuncionarioAssociar, codServidorReferencia)
            .then(
                function (resultado) {
                    res.status(200).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao desassociar este funcionário a este servidor",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function excluir(req, res){
    // Crie uma variável que vá recuperar os valores do arquivo perfil.html
    var codFuncionarioAssociar = req.body.codFuncionarioAssociarServer;
    
    // Faça as validações dos valores
    if (codFuncionarioAssociar == undefined) {
        res.status(400).send("Seu código de funcionário está undefined!");
    }else {

        funcionarioModel.excluir(codFuncionarioAssociar)
            .then(
                function (resultado) {
                    res.status(200).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao desassociar este funcionário a este servidor",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
    autenticar,
    cadastrar,
    alterar,
    associar,
    desassociar,
    excluir
}