function servidoresEmAlerta(idEmpresa) {
    const query = `
        SELECT COUNT(*) AS alertas
        FROM maquina m
        JOIN registros r ON r.fkMaquina = m.idMaquina
        WHERE m.fkEmpresa = ${idEmpresa} AND 
              (r.percentualCPU >= m.porcentagemAlarme OR 
               r.percentualMemoria >= m.porcentagemAlarme OR 
               r.percentualDisco >= m.porcentagemAlarme);
    `;
    return database.executar(query);
}

function desvioPadrao(idEmpresa) {
    const query = `
        SELECT STDDEV_SAMP(r.percentualCPU) AS desvioCPU,
               STDDEV_SAMP(r.percentualMemoria) AS desvioMemoria,
               STDDEV_SAMP(r.percentualDisco) AS desvioDisco
        FROM maquina m
        JOIN registros r ON r.fkMaquina = m.idMaquina
        WHERE m.fkEmpresa = ${idEmpresa};
    `;
    return database.executar(query);
}

function dadosGraficoBarras(idEmpresa, componente) {
    const coluna = componente === 'CPU' ? 'percentualCPU' : componente === 'RAM' ? 'percentualMemoria' : 'percentualDisco';
    const query = `
        SELECT m.idMaquina, r.${coluna} AS valor
        FROM maquina m
        JOIN registros r ON r.fkMaquina = m.idMaquina
        WHERE m.fkEmpresa = ${idEmpresa};
    `;
    return database.executar(query);
}

function dadosGraficoHorizontais(idEmpresa, componente) {
    const coluna = componente === 'CPU' ? 'percentualCPU' : componente === 'RAM' ? 'percentualMemoria' : 'percentualDisco';
    const query = `
        SELECT m.idMaquina, MIN(r.${coluna}) AS minimo, MAX(r.${coluna}) AS maximo
        FROM maquina m
        JOIN registros r ON r.fkMaquina = m.idMaquina
        WHERE m.fkEmpresa = ${idEmpresa}
        GROUP BY m.idMaquina;
    `;
    return database.executar(query);
}

module.exports = {
    servidoresEmAlerta,
    desvioPadrao,
    dadosGraficoBarras,
    dadosGraficoHorizontais
};
