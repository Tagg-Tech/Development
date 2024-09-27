var servidorModel = require("../models/servidorModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var placaderede = req.body.placaderedeServer;
    var memoria = req.body.memoriaServer;
    var sistemaoperacional = req.body.sistemaoperacionalServer;
    var cpu = req.body.cpuServer;
    var disco = req.body.discoServer;
    
    // Faça as validações dos valores
    
    if (placaderede == undefined) {
        res.status(400).send("Seu Placa de Rede está indefinida!");;
    } else if (memoria == undefined) {
        res.status(400).send("Sua memória está indefinida!");
    } else if (sistemaoperacional == undefined) {
        res.status(400).send("Seu Sistema Operacional está indefinido!");
    } else if (cpu == undefined) {
        res.status(400).send("Sua CPU está indefinida!");
    } else if (disco == undefined) {
        res.status(400).send("Seu disco está indefinido!");
    } else {
        servidorModel.cadastrar(placaderede, memoria, sistemaoperacional, cpu, disco)
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
