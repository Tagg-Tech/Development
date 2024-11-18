var express = require("express");
var router = express.Router();
var analistaController = require("../controllers/analistaController");

// Rota para listar máquinas de uma empresa
router.get("/maquinas/:idEmpresa", analistaController.listarMaquinas);

// Rota para listar registros agregados (com base no intervalo de tempo)
router.get("/registros/:idEmpresa", analistaController.listarRegistros);

module.exports = router;
