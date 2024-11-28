// src/controllers/analistadadosController.js
var analistaDadosModel = require("../models/analistadadosModel");

async function buscarDadosComponente(req, res) {
  const componente = req.params.componente;

  try {
    const dados = await analistaDadosModel.buscarDadosGrafico(componente);
    return res.status(200).json(dados);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar dados para o gráfico' });
  }
}

async function buscarMaxMinComponente(req, res) {
  const componente = req.params.componente;

  try {
    const dados = await analistaDadosModel.buscarMaxMinGrafico(componente);
    return res.status(200).json(dados);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar dados máximo e mínimo para o gráfico' });
  }
}

module.exports = {
  buscarDadosComponente,
  buscarMaxMinComponente
};
