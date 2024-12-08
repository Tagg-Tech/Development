// Abrindo conexão e configuração de rota
var express = require("express");
var router = express.Router();
var controller = require("../controllers/tomtomController");

// Rota para atualização e envio de dados API
router.get('/:condition', (req, res)=>{
    // Executar a consulta
    controller.consultarDadosTrafego(req, res);
})

// Rota para inserir dados da API em arquivo JSON
router.post('/insertData', (req, res)=>{
    controller.writeFile(req, res);
})

// Rota para buscar dados por histórico
router.get('/getData/:data', (req, res)=>{
    controller.getDataAPI(req, res);
})

module.exports = router;