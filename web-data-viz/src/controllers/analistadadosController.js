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

async function buscarDesvioPadraoGlobal(req, res) {
  try {
      const resultado = await analistaDadosModel.calcularDesvioPadraoGlobal();
      return res.status(200).json(resultado);
  } catch (error) {
      console.error("Erro ao calcular desvio padrão global:", error);
      return res.status(500).json({ error: "Erro ao calcular desvio padrão global" });
  }
}
async function kpiServidoresAlerta(req, res) {
  const { idUsuario } = req.params;

  try {
    // Chamar o modelo para calcular o KPI de servidores em alerta
    const resultado = await analistaDadosModel.calcularKpiServidoresAlerta(idUsuario);

    // Retornar a resposta com os dados do KPI
    return res.status(200).json(resultado);
  } catch (error) {
    console.error("Erro ao calcular KPI de servidores em alerta:", error);
    return res.status(500).json({ error: "Erro ao calcular KPI de servidores em alerta" });
  }
}

module.exports = {
  buscarDadosComponente,
  buscarMaxMinComponente,
  buscarDesvioPadraoGlobal,
  kpiServidoresAlerta, // Nova função adicionada
};
