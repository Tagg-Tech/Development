//servidorController.js
var servidorModel = require("../models/servidorModel");
function cadastrar(req, res) {
    var placaderede = req.body.placaderedeServer;
    var memoria = req.body.memoriaServer;
    var sistemaoperacional = req.body.sistemaoperacionalServer;
    var cpu = req.body.cpuServer;
    var disco = req.body.discoServer;
    var porcentagemAlarmeCPU = req.body.porcentagemAlarmeCPU;
    var porcentagemAlarmeRAM = req.body.porcentagemAlarmeRAM;
    var porcentagemAlarmeDisco = req.body.porcentagemAlarmeDisco;

    if (!placaderede) {
        res.status(400).json({ error: "Sua Placa de Rede está indefinida!" });
    } else if (!memoria) {
        res.status(400).json({ error: "Sua memória está indefinida!" });
    } else if (!sistemaoperacional) {
        res.status(400).json({ error: "Seu Sistema Operacional está indefinido!" });
    } else if (!cpu) {
        res.status(400).json({ error: "Sua CPU está indefinida!" });
    } else if (!disco) {
        res.status(400).json({ error: "Seu disco está indefinido!" });
    } else if (
        !porcentagemAlarmeCPU ||
        porcentagemAlarmeCPU < 1 ||
        porcentagemAlarmeCPU > 100
    ) {
        res.status(400).json({ error: "Porcentagem de alarme de CPU inválida!" });
    } else if (
        !porcentagemAlarmeRAM ||
        porcentagemAlarmeRAM < 1 ||
        porcentagemAlarmeRAM > 100
    ) {
        res.status(400).json({ error: "Porcentagem de alarme de RAM inválida!" });
    } else if (
        !porcentagemAlarmeDisco ||
        porcentagemAlarmeDisco < 1 ||
        porcentagemAlarmeDisco > 100
    ) {
        res.status(400).json({ error: "Porcentagem de alarme de disco inválida!" });
    } else {
        servidorModel
            .cadastrar(
                placaderede,
                memoria,
                sistemaoperacional,
                cpu,
                disco,
                porcentagemAlarmeCPU,
                porcentagemAlarmeRAM,
                porcentagemAlarmeDisco
            )
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json({ error: erro.sqlMessage });
            });
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


module.exports = {
    cadastrar,
    pegarCpuRamPorcentagem,
    pegarUsoDisco,
    pegarRAM,
    isInstable
};
