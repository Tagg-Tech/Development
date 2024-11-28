var express = require("express");
var router = express.Router();

var analistaController = require("../controllers/analistaController");

router.get("/alertas/:idEmpresa", analistaController.buscarServidoresEmAlerta);
router.get("/desvio-padrao/:idEmpresa", analistaController.calcularDesvioPadrao);
router.get("/grafico-barras/:idEmpresa/:componente", analistaController.graficoBarras);
router.get("/grafico-horizontais/:idEmpresa/:componente", analistaController.graficoHorizontais);
// Rota para acessar KPIs
router.get('/kpis', analistaController.kpis);


module.exports = router;
