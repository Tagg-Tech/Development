var analistaModel = require("../models/analistaModel");

function listarMaquinas(req, res) {
    var idEmpresa = req.params.idEmpresa;

    analistaModel.buscarMaquinas(idEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(404).send("Nenhuma máquina encontrada.");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar máquinas:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarRegistros(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var intervalo = req.query.intervalo || 'DIARIO'; // Diário como padrão

    analistaModel.buscarRegistros(idEmpresa, intervalo)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(404).send("Nenhum registro encontrado.");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar registros:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listarMaquinas,
    listarRegistros
};
