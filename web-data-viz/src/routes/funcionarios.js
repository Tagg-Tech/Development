var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController.js");

//Recebendo os dados do html e direcionando para a função cadastrar de funcionarioController.js
router.post("/cadastrar", function (req, res) {
    funcionarioController.cadastrar(req, res);
})

router.post("/alterar", function (req, res) {
    funcionarioController.alterar(req, res);
})

router.post("/autenticar", function (req, res) {
    funcionarioController.autenticar(req, res);
});

router.post("/associar", function (req, res) {
    funcionarioController.associar(req, res);
})

router.post("/desassociar", function (req, res) {
    funcionarioController.desassociar(req, res);
})

router.post("/excluir", function (req, res) {
    funcionarioController.excluir(req, res);
})


module.exports = router;
