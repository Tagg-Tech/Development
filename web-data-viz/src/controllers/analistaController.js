var analistaModel = require("../models/analistaModel");

function buscarServidoresEmAlerta(req, res) {
    const idEmpresa = req.params.idEmpresa;

    analistaModel.servidoresEmAlerta(idEmpresa)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ erro: err.sqlMessage }));
}

function calcularDesvioPadrao(req, res) {
    const idEmpresa = req.params.idEmpresa;

    analistaModel.desvioPadrao(idEmpresa)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ erro: err.sqlMessage }));
}

function graficoBarras(req, res) {
    const { idEmpresa, componente } = req.params;

    analistaModel.dadosGraficoBarras(idEmpresa, componente)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ erro: err.sqlMessage }));
}

function graficoHorizontais(req, res) {
    const { idEmpresa, componente } = req.params;

    analistaModel.dadosGraficoHorizontais(idEmpresa, componente)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ erro: err.sqlMessage }));
}

// Função para calcular KPIs de servidores
async function kpis(req, res) {
    try {
        // Obtenha os dados dos servidores com base nos filtros e parâmetros desejados
        const dadosServidores = await analistaModel.getDadosServidores();

        // Calcular KPI por servidor
        const kpisPorServidor = calcularKpisPorServidor(dadosServidores);

        // Calcular KPI total
        const kpisTotais = calcularKpisTotais(kpisPorServidor);

        // Retorne as informações de KPI calculadas
        return res.status(200).json({ kpisPorServidor, kpisTotais });
    } catch (err) {
        console.error("Erro ao calcular KPIs:", err);
        return res.status(500).json({ message: 'Erro ao calcular KPIs' });
    }
}

// Função para calcular KPIs individuais por servidor
function calcularKpisPorServidor(dados) {
    return dados.map(servidor => {
        const kpiCPU = (servidor.cpuUtilizado / servidor.cpuTotal) * 100;
        const kpiRAM = (servidor.ramUtilizada / servidor.ramTotal) * 100;
        const kpiDisco = (servidor.discoUtilizado / servidor.discoTotal) * 100;

        return {
            idServidor: servidor.id,
            kpiCPU,
            kpiRAM,
            kpiDisco
        };
    });
}

// Função para calcular KPIs agregados
function calcularKpisTotais(kpisPorServidor) {
    let totalCPU = 0;
    let totalRAM = 0;
    let totalDisco = 0;

    kpisPorServidor.forEach(kpi => {
        totalCPU += kpi.kpiCPU;
        totalRAM += kpi.kpiRAM;
        totalDisco += kpi.kpiDisco;
    });

    const totalServidores = kpisPorServidor.length;

    return {
        kpiCPU: totalCPU / totalServidores,
        kpiRAM: totalRAM / totalServidores,
        kpiDisco: totalDisco / totalServidores
    };
}

module.exports = {
    buscarServidoresEmAlerta,
    calcularDesvioPadrao,
    graficoBarras,
    graficoHorizontais,
    kpis
};
