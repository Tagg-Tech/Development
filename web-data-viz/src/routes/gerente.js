var express = require("express");
var router = express.Router();

var gerenteController = require("../controllers/gerenteController.js");

//Recebendo os dados do html e direcionando para a função cadastrar de gerenteController.js
router.get("/", function (req, res) {
    const idUsuario = req.query.idUsuario
    gerenteController.reqDados(req, res, idUsuario);
});

router.get("/selectRam", function(req, res){
    const idUsuario = req.query.idUsuario
    gerenteController.reqDadosRam(req, res, idUsuario);
})

router.get("/selectLimite", function(req, res){
    const idUsuario = req.query.idUsuario
    gerenteController.reqLimites(req,res,idUsuario);
})

router.get("/buscarSemMedia", function(req, res){
    const idUsuario = req.query.idUsuario
    gerenteController.buscarSemMedia(req,res,idUsuario);
})

module.exports = router;
