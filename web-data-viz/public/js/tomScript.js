// Script dashboard 1
window.addEventListener('DOMContentLoaded', ()=>{
    var cond = sessionStorage.getItem("condition") === "true";
    tomtomData(cond);    
    sessionStorage.setItem("condition", "false")
});


function upData(cond){
    sessionStorage.setItem("condition", cond.toString());
    window.location.reload();
}

// Buscando dados de API
async function tomtomData(condition) {

    try {
        let resposta = await fetch(`/tomtom/${condition}`);

        if (!resposta.ok) {
            console.error("Erro de requisição: ", resposta.statusText);
            return;
        }

        let respJson = await resposta.json();
        let data = respJson.data;
        // Criando novo vetor com a diferença de velocidade das rodovias
        let dataDif = data.map(item => {
            var traf;
            // Se houver diferença de tráfego na área mapeada
            if ((item.velocidadeLivre - item.velocidadeAtual) != 0) {
                traf = Math.round(((item.velocidadeLivre - item.velocidadeAtual) / item.velocidadeLivre) * 100, 0);
            } else {
                traf = 0;
            }

            return {
                // (...item) Operador de espelhamento, ele espelha todos os atributos do objeto
                ...item,
                diferenca: item.velocidadeLivre - item.velocidadeAtual,
                nivelTransito: traf
            };
        })
            .sort((a, b) => b.nivelTransito - a.nivelTransito); // Operador de arrays, ordena os dados do maior para o menor com base na diferença de velocidade
        console.log(dataDif);

        // Plot de tabela com pedágios mais utilizados
        plotTable(dataDif);
        // Pegando range do vetor: de 0 a 9, não inclui índice 10
        orgData(dataDif.slice(0, 10));
        // Exibindo data de geração de dados
        firstData(dataDif[0].dataHora);

    } catch (error) {
        console.error("Erro no servidor!");
    }
}

// Organizando dados de API
function orgData(vetor) {
    var dataForGraf = {
        nomePed: [],
        percTraf: []
    };

    vetor.forEach(element => {
        dataForGraf.nomePed.push(element.concessionaria);
        dataForGraf.percTraf.push(element.nivelTransito);
    });

    plotChart(dataForGraf);
}

// Construção de tabela
function plotTable(vetor){
    // Conteúdo tabela principal
    let line = "";
    // Conteúdo tabela parcial
    let lineParse = "";
    let cont = 0; // Limitador de conteúdo de tabela

    // Geração de contéudo das tabelas
    vetor.forEach(element =>{
        line += `
            <tr>
                <th>${element.uf}</th>
                <th>${element.municipio}</th>
                <th>${element.concessionaria}</th>
                <th>${element.rodovia}</th>
                <th>${element.nivelTransito}</th>
            </tr>
        `;
        
        // Tabela de conteúdo parcial
        if(cont < 6){
            lineParse += `
                <tr>
                    <th>${element.concessionaria}</th>
                    <th>${element.rodovia}</th>
                    <th>${element.nivelTransito}</th>
                </tr>
            `;
            cont++;
        }
    });

        // Configuração de tabela (header e estrutura)
        let confTable = `
            <i class="bi bi-x-circle" onclick="closeTable(true)"></i>
            <table>
                <caption>Uso estimado dos pedágios</caption>
                <thead>
                    <tr>
                        <th>Estado</th>
                        <th>Município</th>
                        <th>Concessionária</th>
                        <th>Rodovia</th>
                        <th>Uso Estimado (%)</th>
                    </tr>
                </thead>
                <tbody>
                    ${line}
                </tbody>
            </table>
        `;

        let confTableParse = `
            <table>
                <caption>Uso estimado dos pedágios</caption>
                <thead>
                    <tr>
                        <th>Concessionária</th>
                        <th>Rodovia</th>
                        <th>Uso Estimado (%)</th>
                    </tr>
                </thead>
                <tbody>
                    ${lineParse}
                </tbody>
            </table>
        `;

    document.querySelector('.tableDash1').innerHTML = confTableParse;
    document.querySelector('.tableDash1Comp').innerHTML = confTable;
}

// Construção de gráfico
function plotChart(object) {
    var options = {
        chart: {
            toolbar: {
                show: false
            },
            height: 300,
            width: 700,
            type: "bar",
            stacked: false
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#FF1654", "#247BA0"],
        series: [
            {
                name: "Series A",
                data: object.percTraf
            }
        ],
        stroke: {
            width: [4, 4]
        },
        plotOptions: {
            bar: {
                columnWidth: "35%"
            }
        },
        xaxis: {
            categories: object.nomePed
        },
        yaxis: [
            {
                axisTicks: {
                    show: true
                },
                axisBorder: {
                    show: true,
                    color: "#FF1654"
                },
                labels: {
                    style: {
                        colors: "#FF1654"
                    }
                },
                title: {
                    text: "0 a 100%",
                    style: {
                        color: "#FF1654"
                    }
                }
            }
        ],
        tooltip: {
            shared: false,
            intersect: true,
            x: {
                show: false
            },
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                // Obtendo o valor atual e adicionando o símbolo de porcentagem
                const value = series[seriesIndex][dataPointIndex];
                return `<div style="padding: 10px;">
                                <strong>${object.nomePed[dataPointIndex]}</strong><br>
                                <span>${value}%</span>
                            </div>`;
            }
        },
        legend: {
            horizontalAlign: "left",
            offsetX: 40
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart1"), options);

    chart.render();
}

// Exibindo data em que os dados foram capturados
function firstData(dataRaw){
    const data = new Date(dataRaw);
    const day = data.toLocaleDateString("pt-BR", { weekday : "long" });
    const time = data.toLocaleTimeString("pt-BR", { hour : "2-digit", minute : "2-digit" });
    console.log(dataRaw);
    let template = document.querySelector(".labelDataDay");

    template.innerHTML += `${day}, às ${time}.`
}

// Função para fechar ou abrir tabela completa
function closeTable(valid){
    let element = document.querySelector('.tableDash1Comp');
    if(valid){
        element.style.display = "none";
    } else{
        element.style.display = "block";
    }
}


// Indicadores gráfico pedágios:
var maisUti = "<span>CCR</span><span>80%</span>";
var menosUti = "<span>EcoVias</span><span>50%</span>";

function showMaisUti() {
    if (!indMped.innerHTML.includes(maisUti)) {
        indMped.innerHTML += maisUti;
    } else {
        indMped.innerHTML = "<span>Mais utilizado</span>";
    }
}


// <!-- script gráfico 2 -->
// Dados de exemplo
/*const scatterData = [
//     { x: 1, y: 2 },
//     { x: 2, y: 3 },
//     { x: 3, y: 5 },
//     { x: 4, y: 7 },
//     { x: 5, y: 8 },
];

// Cálculo da regressão linear (simples, para fins de demonstração)
const xValues = scatterData.map(point => point.x);
const yValues = scatterData.map(point => point.y);
const n = xValues.length;

const sumX = xValues.reduce((a, b) => a + b, 0);
const sumY = yValues.reduce((a, b) => a + b, 0);
const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
const sumX2 = xValues.reduce((sum, x) => sum + x * x, 0);

const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
const intercept = (sumY - slope * sumX) / n;

// Dados da linha de regressão
const regressionLine = xValues.map(x => ({ x, y: slope * x + intercept }));

// Configuração do gráfico
const options = {
    chart: {
        type: 'line',
        height: 300,
        width: 500
    },
    series: [
        {
            name: 'Data Points',
            type: 'line',
            data: scatterData,
        },
        {
            name: 'Regression Line',
            type: 'line',
            data: regressionLine,
        },
    ],
    xaxis: {
        title: {
            text: 'X-Axis',
        },
    },
    yaxis: {
        title: {
            text: 'Y-Axis',
        },
    },
};

// Renderizar o gráfico
const chart = new ApexCharts(document.querySelector("#chart2"), options);
chart.render();
*/

// <!-- script slider -->
const slider = document.getElementById("myRange");
const sliderValue = document.getElementById("sliderValue");

slider.addEventListener("input", () => {
    sliderValue.textContent = "Mês: " + slider.value + " de 2024";
});