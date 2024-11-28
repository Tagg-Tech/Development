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

module.exports = {
  buscarDadosGrafico,
  buscarMaxMinGrafico
};
