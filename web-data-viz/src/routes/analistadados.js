// src/routes/analistadados.js
var express = require("express");
var router = express.Router();

var analistaDadosController = require("../controllers/analistadadosController");

// Rota para retornar dados para o gráfico
router.get("/:componente", analistaDadosController.buscarDadosComponente);

module.exports = router;
