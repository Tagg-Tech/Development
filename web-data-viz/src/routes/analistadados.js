// src/routes/analistadados.js
var express = require("express");
var router = express.Router();

var analistaDadosController = require("../controllers/analistadadosController");

// Rota para retornar dados para o gráfico
router.get("/:componente", analistaDadosController.buscarDadosComponente);

// Nova rota para pegar máximo e mínimo de cada servidor
router.get("/:componente/maxmin", analistaDadosController.buscarMaxMinComponente);

// Rota para calcular o desvio padrão global
router.get("/desviopadrao", analistaDadosController.buscarDesvioPadraoGlobal);

module.exports = router;
