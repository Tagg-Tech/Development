var servidorModel = require("../models/servidorModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id = req.body.idServer;
    var placaderede = req.body.placaderedeServer;
    var senha = req.body.senhaServer;
    var memoria = req.body.memoriaServer;
    var sistemaoperacional = req.body.sistemaoperacionalServer;
    var cpu = req.body.cpuServer;
    var disco = req.body.discoServer;
    
    // Faça as validações dos valores
    if (id == undefined) {
        res.status(400).send("Seu ID está indefinido!");
    } else if (placaderede == undefined) {
        res.status(400).send("Seu Placa de Rede está indefinida!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else if (memoria == undefined) {
        res.status(400).send("Sua memória está indefinida!");
    } else if (sistemaoperacional == undefined) {
        res.status(400).send("Seu Sistema Operacional está indefinido!");
    } else if (cpu == undefined) {
        res.status(400).send("Sua CPU está indefinida!");
    } else if (disco == undefined) {
        res.status(400).send("Seu disco está indefinido!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        servidorModel.cadastrar(id, placaderede, senha, memoria, sistemaoperacional, cpu, disco)
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

module.exports = {
    cadastrar
}