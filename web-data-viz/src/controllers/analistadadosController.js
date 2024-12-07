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
    if (!resultado || !resultado.desvioPadraoGlobal) {
      return res.status(404).json({ error: "Nenhum dado encontrado" });
    }

    console.log("Desvio padrão global calculado:", resultado.desvioPadraoGlobal);
    return res.status(200).json({ desvioPadraoGlobal: resultado.desvioPadraoGlobal });
  } catch (error) {
    console.error("Erro ao buscar desvio padrão global:", error);
    return res.status(500).json({ error: "Erro ao buscar desvio padrão global" });
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

async function listarServidoresEmAlerta(req, res) {
  const { idUsuario } = req.params;

  try {
    // Chama o model para obter os servidores em alerta
    const servidoresEmAlerta = await analistaDadosModel.listarServidoresEmAlerta(idUsuario);

    // Retorna a lista de servidores em alerta
    return res.status(200).json(servidoresEmAlerta);
  } catch (error) {
    console.error("Erro ao listar servidores em alerta:", error);
    return res.status(500).json({ error: "Erro ao listar servidores em alerta" });
  }
}

module.exports = {
  buscarDadosComponente,
  buscarMaxMinComponente,
  buscarDesvioPadraoGlobal,
  kpiServidoresAlerta,
  listarServidoresEmAlerta, // Nova função adicionada
};
