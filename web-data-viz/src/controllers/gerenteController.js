var gerenteModel = require("../models/gerenteModel");

function reqDados(req, res, idUsuario) {
    console.log('Rota entrou, controller aceito!')
    if(!idUsuario){
        return res.status(400).send({message: 'ID do usuario não foi encontrado ou não foi passado, verificar controller gerente function reqDados'})
    }
    else{
        console.log('Passando para o model, model aceito!')
        gerenteModel.reqDados(idUsuario)
        .then(dados => {
            console.log("SQL aceitou! Retornando dados com a resposta")
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
function reqDadosRam(req, res, idUsuario){
    console.log('Rota entrou, controller aceito!')
    if(!idUsuario){
        return res.status(400).send({message: 'ID do usuario não foi encontrado ou não foi passado, verificar controller gerente function reqDados'})
    }else{
        console.log('Passando para o model, model aceito!')
        gerenteModel.reqDadosRam(idUsuario)
        .then(dados => {
            console.log("SQL aceitou! Retornando dados com a resposta")
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

function reqLimites(req, res, idUsuario){
    console.log('Rota entrou, controller aceito!')
    if(!idUsuario){
        return res.status(400).send({message: 'ID do usuario não foi encontrado ou não foi passado, verificar controller gerente function reqLimite'})
    }else{
        console.log('Passando para o model, model aceito!')
        gerenteModel.reqLimites(idUsuario)
        .then(dados => {
            console.log("SQL aceitou! Retornando dados com a resposta")
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

function buscarSemMedia(req, res, idUsuario){
    console.log('Rota entrou, controller aceito!')
    if(!idUsuario){
        return res.status(400).send({message: 'ID do usuario não foi encontrado ou não foi passado, verificar controller gerente function buscarSemMedia'})
    }else{
        console.log('Passando para o model, model aceito!')
        gerenteModel.buscarSemMedia(idUsuario)
        .then(dados => {
            console.log("SQL aceitou! Retornando dados com a resposta")
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
    reqDados,
    reqDadosRam,
    reqLimites,
    buscarSemMedia
};
