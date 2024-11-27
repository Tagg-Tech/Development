var express = require("express");
var router = express.Router();

var analistaController = require("../controllers/analistaController");

// Rota para listar máquinas de uma empresa
router.get("/maquinas/:idEmpresa", analistaController.listarMaquinas);

// Rota para listar registros agregados (com base no intervalo de tempo)
router.get("/registros", (req, res) => {
    const { idEmpresa, filtro } = req.query; // Filtro pode ser 'CPU', 'RAM', 'Disco'
    analistaController.listarRegistros(req, res, idEmpresa, filtro);
});


module.exports = router;
