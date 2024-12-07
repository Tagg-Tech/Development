var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController.js");

//Recebendo os dados do html e direcionando para a função cadastrar de servidorController.js
router.post("/cadastrar", function (req, res) {
    servidorController.cadastrar(req, res);
})

router.post("/pegarCpuRamPorcentagem", function (req, res){
    servidorController.pegarCpuRamPorcentagem(req, res);
})

router.post("/pegarUsoDisco", function (req, res){
    servidorController.pegarUsoDisco(req, res);
})

router.post("/pegarRAM", function (req, res){
    servidorController.pegarRAM(req, res);
})

router.post("/isInstable", function (req, res){
    servidorController.isInstable(req, res);
})

router.post("/qtdAlertas", function (req, res){
    servidorController.qtdAlertas(req, res);
})

module.exports = router;
