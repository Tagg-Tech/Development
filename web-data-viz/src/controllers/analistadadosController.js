// src/controllers/analistadadosController.js
var analistaDadosModel = require("../models/analistadadosModel");

async function buscarDadosComponente(req, res) {
  const componente = req.params.componente;

  try {
    // Chamamos o model para buscar os dados com base no componente
    const dados = await analistaDadosModel.buscarDadosGrafico(componente);

    // Se houver dados, retornamos em formato JSON
    return res.status(200).json(dados);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar dados para o gráfico' });
  }
}

module.exports = {
  buscarDadosComponente
};
