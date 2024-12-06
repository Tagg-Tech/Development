// src/models/analistadadosModel.js
var database = require("../database/config"); // Certifique-se de ter uma conexão com o banco de dados

async function buscarDadosGrafico(componente) {
  const coluna = componente === 'CPU' ? 'percentualCPU' :
                 componente === 'RAM' ? 'percentualMemoria' : 
                 componente === 'DISCO' ? 'percentualDisco' : 'percentualCPU';
  
  const query = `
    SELECT m.idMaquina, r.${coluna} AS valor
    FROM maquina m
    JOIN registros r ON r.fkMaquina = m.idMaquina
    WHERE r.${coluna} IS NOT NULL
    ORDER BY m.idMaquina;
  `;

  try {
    const result = await database.executar(query);
    return result;
  } catch (error) {
    throw error;
  }
}

async function buscarMaxMinGrafico(componente) {
  const coluna = componente === 'CPU' ? 'percentualCPU' :
                 componente === 'RAM' ? 'percentualMemoria' : 
                 componente === 'DISCO' ? 'percentualDisco' : 'percentualCPU';
  
  const query = `
    SELECT m.idMaquina, 
           MAX(r.${coluna}) AS maxValor,
           MIN(r.${coluna}) AS minValor
    FROM maquina m
    JOIN registros r ON r.fkMaquina = m.idMaquina
    WHERE r.${coluna} IS NOT NULL
    GROUP BY m.idMaquina
    ORDER BY m.idMaquina;
  `;

  try {
    const result = await database.executar(query);
    return result;
  } catch (error) {
    throw error;
  }
}

async function calcularDesvioPadraoGlobal() {
  const query = `
      SELECT STDDEV((percentualCPU + percentualMemoria + percentualDisco) / 3) AS desvioPadraoGlobal
      FROM registros
      WHERE percentualCPU IS NOT NULL AND percentualMemoria IS NOT NULL AND percentualDisco IS NOT NULL;
  `;

  try {
    const result = await database.executar(query);
    return result[0]; // Retorna o desvio padrão diretamente
  } catch (error) {
    console.error("Erro ao calcular desvio padrão global:", error);
    throw error;
  }
}


async function calcularKpiServidoresAlerta(idUsuario) {
  const query = `
    SELECT 
      COUNT(DISTINCT um.fkMaquina) AS totalServidores,
      SUM(
        CASE 
          WHEN (r.percentualCPU > m.porcentagemAlarmeCPU) OR 
               (r.percentualMemoria > m.porcentagemAlarmeRAM) OR 
               (r.percentualDisco > m.porcentagemAlarmeDisco) 
          THEN 1 ELSE 0 
        END
      ) AS servidoresEmAlerta
    FROM usuarioResponsavelMaquina um
    JOIN registros r ON r.fkMaquina = um.fkMaquina
    JOIN maquina m ON m.idMaquina = um.fkMaquina
    WHERE um.fkUsuario = 1
    GROUP BY um.fkUsuario;
  `;

  try {
    // Execute a consulta com o ID do usuário
    const resultado = await database.executar(query, [idUsuario]);
    
    if (resultado.length === 0) {
      return { totalServidores: 0, servidoresEmAlerta: 0 };
    }

    // Desestruturar o resultado da consulta
    const { totalServidores, servidoresEmAlerta } = resultado[0];

    // Retornar o KPI com a proporção
    return {
      totalServidores,
      servidoresEmAlerta,
      proporcao: totalServidores > 0 ? `${servidoresEmAlerta}/${totalServidores}` : "0/0"
    };
  } catch (error) {
    console.error("Erro ao calcular KPI de servidores em alerta:", error);
    throw error;
  }
}

module.exports = {
  buscarDadosGrafico,
  buscarMaxMinGrafico,
  calcularDesvioPadraoGlobal,
  calcularKpiServidoresAlerta, // Nova função adicionada
};

