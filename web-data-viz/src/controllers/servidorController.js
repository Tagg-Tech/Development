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

function pegarCpuRamPorcentagem(req, res){
    var id_usuario = req.body.idUsuarioServer;
    var fk_maquina = req.body.fkMaquinaServer;

    console.log('controler')
    if(!id_usuario | !fk_maquina){
        return res.status(400).send({message: 'id usuario ou fk maquina não foram encontrados ou não foram passados, verificar controller servidor function pegarCpuRamPorcentagem'})
    }
    else{
        console.log('model')
        servidorModel.pegarCpuRamPorcentagem(id_usuario, fk_maquina)
        .then(dados => {
            //console.log("SQL aceitou! Retornando dados com a resposta")
            res.status(200).send(dados);  
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ message: `
                ***ERRO INTERNO DO SERVIDOR***
                Verificar controller 
                ` });
        });
    }
}

function pegarUsoDisco(req, res){
    var fk_maquina = req.body.fkMaquinaServer;

    console.log('controler')
    if(!fk_maquina){
        return res.status(400).send({message: 'fk máquina não foram encontrados ou não foram passados, verificar controller servidor function pegarUsoDisco'})
    }
    else{
        console.log('model')
        servidorModel.pegarUsoDisco(fk_maquina)
        .then(dados => {
            //console.log("SQL aceitou! Retornando dados com a resposta")
            res.status(200).send(dados);  
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ message: `
                ***ERRO INTERNO DO SERVIDOR***
                Verificar controller 
                ` });
        });
    }
}

function pegarRAM(req, res){
    var fk_maquina = req.body.fkMaquinaServer;

    console.log('controler')
    if(!fk_maquina){
        return res.status(400).send({message: 'fk máquina não foram encontrados ou não foram passados, verificar controller servidor function pegarRAM'})
    }
    else{
        console.log('model')
        servidorModel.pegarRAM(fk_maquina)
        .then(dados => {
            //console.log("SQL aceitou! Retornando dados com a resposta")
            res.status(200).send(dados);  
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ message: `
                ***ERRO INTERNO DO SERVIDOR***
                Verificar controller 
                ` });
        });
    }
}

function isInstable(req, res){
    var id_usuario = req.body.idUsuarioServer;
    var fk_maquina = req.body.fkMaquinaServer;

    console.log('controler')
    if(!id_usuario | !fk_maquina){
        return res.status(400).send({message: 'id usuario ou fk máquina não foram encontrados ou não foram passados, verificar controller servidor function isInstable'})
    }
    else{
        servidorModel.isInstable(id_usuario, fk_maquina)
        .then(dados => {
            //console.log("SQL aceitou! Retornando dados com a resposta")
            res.status(200).send(dados);  
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ message: `
                ***ERRO INTERNO DO SERVIDOR***
                Verificar controller 
                ` });
        });
    }
}

function qtdAlertas(req, res){
    var id_usuario = req.body.idUsuarioServer;
    var fk_maquina = req.body.fkMaquinaServer;

    console.log('controler')
    if(!id_usuario | !fk_maquina){
        return res.status(400).send({message: 'id usuario ou fk máquina não foram encontrados ou não foram passados, verificar controller servidor function qtdAlertas'})
    }
    else{
        servidorModel.qtdAlertas(id_usuario, fk_maquina)
        .then(dados => {
            //console.log("SQL aceitou! Retornando dados com a resposta")
            res.status(200).send(dados);  
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ message: `
                ***ERRO INTERNO DO SERVIDOR***
                Verificar controller 
                ` });
        });
    }
}


module.exports = {
    cadastrar,
    pegarCpuRamPorcentagem,
    pegarUsoDisco,
    pegarRAM,
    isInstable,
    qtdAlertas
};
