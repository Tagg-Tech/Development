var servidorModel = require("../models/servidorModel");

function cadastrar(req, res) {
    var placaderede = req.body.placaderedeServer;
    var memoria = req.body.memoriaServer;
    var sistemaoperacional = req.body.sistemaoperacionalServer;
    var cpu = req.body.cpuServer;
    var disco = req.body.discoServer;
    var porcentagemAlarme = req.body.porcentagemAlarmeServer;

    if (placaderede == undefined) {
        res.status(400).send("Sua Placa de Rede está indefinida!");
    } else if (memoria == undefined) {
        res.status(400).send("Sua memória está indefinida!");
    } else if (sistemaoperacional == undefined) {
        res.status(400).send("Seu Sistema Operacional está indefinido!");
    } else if (cpu == undefined) {
        res.status(400).send("Sua CPU está indefinida!");
    } else if (disco == undefined) {
        res.status(400).send("Seu disco está indefinido!");
    } else if (porcentagemAlarme == undefined || porcentagemAlarme < 1 || porcentagemAlarme > 100) {
        res.status(400).send("Porcentagem de alarme inválida!");
    } else {
        servidorModel.cadastrar(placaderede, memoria, sistemaoperacional, cpu, disco, porcentagemAlarme)
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
};
