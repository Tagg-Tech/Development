// Abrindo conexão e configuração de rota
var express = require("express");
var router = express.Router();
var controller = require("../controllers/tomtomController");

router.get('/', (req, res)=>{
    // Executar a consulta
    controller.consultarDadosTrafego(req, res);
})

module.exports = router;