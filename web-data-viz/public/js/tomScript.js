// Script dashboard 1
window.addEventListener('DOMContentLoaded', () => {
    var cond = sessionStorage.getItem("condition") === "true";
    if (cond) sessionStorage.setItem("condition", "false")
    tomtomData(cond);
});

// Vetor com objetos de resposta em escopo global
let dataDif;

// Atualização de dados da API
function upData(cond) {
    if (cond) sessionStorage.setItem("travaData", "false")
    sessionStorage.setItem("condition", cond.toString());
    window.location.reload();
}

// Buscando dados de API
async function tomtomData(condition) {
    // Elementos para carregamento de página
    let gif = document.querySelector('.carregGif');
    let visual = document.querySelector('.visual');
    visual.style.opacity = '0.5';
    gif.style.display = 'block';

    try {
        let resposta = await fetch(`/tomtom/${condition}`);

        if (!resposta.ok) {
            console.error("Erro de requisição: ", resposta.statusText);
            return;
        }
        let respJson = await resposta.json();

        visual.style.opacity = '1';
        gif.style.display = 'none';

        let data = respJson.data;

        // Criando novo vetor com a diferença de velocidade das rodovias
        dataDif = data.map(item => {
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
            .sort((a, b) => b.nivelTransito - a.nivelTransito); // Operador de arrays, ordena os dados do maior para o menor com base na diferença de percentual de velocidade
        console.log(dataDif);

        // Plot de tabela com pedágios mais utilizados
        plotTable(dataDif, true);
        // Pegando range do vetor: de 0 a 9, não inclui índice 10
        orgData(dataDif.slice(0, 10));
        // Exibindo data de geração de dados
        firstData(dataDif[0].dataHora);
        // Plotando dados disponíveis da API
        listDatas(respJson.dateAPI)
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
        dataForGraf.nomePed.push(`${element.uf} / ${element.rodovia}`);
        dataForGraf.percTraf.push(element.nivelTransito);
    });

    plotChart(dataForGraf);
}

// Construção de tabela
function plotTable(vetor, type) {
    // alert("plot")
    // Conteúdo tabela principal
    let line = "";
    // Conteúdo tabela parcial
    let lineParse = "";
    let cont = 0; // Limitador de conteúdo de tabela

    // Geração de contéudo das tabelas
    vetor.forEach(element => {
        line += `
            <tr onclick="infoPed(${cont}); closeCard(false)">
                <th>${element.uf}</th>
                <th>${element.municipio}</th>
                <th>${element.concessionaria}</th>
                <th>${element.rodovia}</th>
                <th>${element.nivelTransito}</th>
            </tr>
        `;

        // Tabela de conteúdo parcial
        if (cont < 5) {
            lineParse += `
                <tr onclick="infoPed(${cont}); closeCard(false)">
                    <th>${element.concessionaria}</th>
                    <th>${element.rodovia}</th>
                    <th>${element.nivelTransito}</th>
                </tr>
            `;
        }
        cont++;
    });

    // Configuração de tabela (header e estrutura)
    let confTable = `
            <table>
                <caption>Uso estimado dos pedágios</caption>
                <thead>
                    <tr>
                        <th style="color: white;">Estado</th>
                        <th style="color: white;">Município</th>
                        <th style="color: white;">Concessionária</th>
                        <th style="color: white;">Rodovia</th>
                        <th style="color: white;">Trânsito Estimado (%)</th>
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
                        <th style="color: white;">Concessionária</th>
                        <th style="color: white;">Rodovia</th>
                        <th style="color: white;">Trânsito Estimado (%)</th>
                    </tr>
                </thead>
                <tbody>
                    ${lineParse}
                </tbody>
            </table>
            <button onclick="closeTable(false)">Expandir tabela</button>
        `;

    if (type) document.querySelector('.tableDash1').innerHTML = confTableParse;
    document.querySelector('#conteudoTabela').innerHTML = confTable;
}

// Filtro para conteúdo de tabela
function filtTable(cont) {
    cont = cont.toLowerCase();
    if (cont.length == 0) {
        plotTable(dataDif);
    } else {
        let v = dataDif.filter(item => {
            return (
                item.uf.toLowerCase().includes(cont) ||
                item.municipio.toLowerCase().includes(cont) ||
                item.concessionaria.toLowerCase().includes(cont) ||
                item.rodovia.toLowerCase().includes(cont) ||
                item.praca.toLowerCase().includes(cont)
            );
        });

        plotTable(v, false);
    }
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
            enabled: true,
            formatter: function (val) {
                return val + "%";
            },
            style: {
                colors: ["#fff"]
            }
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
                columnWidth: "55%"
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
function firstData(dataRaw) {
    const data = new Date(dataRaw);
    const day = data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" });
    const time = data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    console.log(dataRaw);
    let template = document.querySelector(".labelDataDay");

    template.innerHTML += `${day}, às ${time}.`
}

// Criando card com as informações do pedágio conrespondente
function infoPed(i) {
    console.log(`Índice do card: ${i}`);
    let card = document.querySelector(".cardPed");

    let vetor = dataDif[i];
    card.innerHTML = `
        <i class="bi bi-x-circle" onclick="closeCard(true)"></i>
        <div class="dadosPed">
            <span>Estado: ${vetor.uf}</span>
            <span>Municípo: ${vetor.municipio}</span>
            <span>Rodovia: ${vetor.rodovia}</span>
            <span>Praça: ${vetor.praca}</span>
            <span>Velocidade livre: ${vetor.velocidadeLivre} KM</span>
            <span>Valocidade atual: ${vetor.velocidadeAtual} KM</span>
            <span>Trânsito: ${vetor.nivelTransito}%</span>
            <span>Confiabilidade do dado: ${Math.round(vetor.confiabilidade * 100, 0)}%</span>
        </div>
    `;
}

// Função para fechar ou abrir tabela completa
function closeTable(valid) {
    let element = document.querySelector('.tableDash1Comp');
    if (valid) {
        element.style.display = "none";
    } else {
        element.style.display = "block";
    }
}

// Função para fechar ou abrir card de pedágio
function closeCard(valid) {
    let element = document.querySelector('.cardPed');
    if (valid) {
        element.style.display = "none";
    } else {
        element.style.display = "flex";
    }
}

// Função para fechar ou abrir menu de histórico
function closeHist(valid) {
    let element = document.querySelector('.datasAPI');
    if (valid) {
        element.style.display = "none"
    } else {
        element.style.display = "flex";
    }
}

// Enviando dados de API para escrita em histórico no servidor
async function sendDataAPI() {
    if (sessionStorage.getItem("travaData") == "true") {
        alert("Você ja está visualizando um dado histórico!");
        return;
    } else {
        sessionStorage.setItem("travaData", "true")
        // Montando objeto a ser enviado
        let objForServer = {
            date: dataDif[0].dataHora,
            dataAPI: dataDif
        }

        let resposta;

        try {
            resposta = await fetch('/tomtom/insertData',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(objForServer)
                });

            if (!resposta.ok) {
                console.log(`Erro ao fazer resquisição: ${resposta.statusText}.`)
            } else {
                console.log("Requisição bem sucedida!")
            }

            alert("Dados registrados!")
            upData(false);
        } catch (error) {
            console.error("Erro ao enviar dados:", error)
        }
    }


}

async function getDataAPI(dataQuery) {
        sessionStorage.setItem("travaData", "true")
        let resposta;
        try {
            resposta = await fetch(`/tomtom/getData/${dataQuery}`);
            if (!resposta.ok) {
                console.error(`Erro de requisição: ${resposta.statusText}`)
            }

            upData(false);

            console.log()
        } catch (error) {
            console.error('Problema em requisição: ', error)
        }
}

// Listando datas disponíveis no histórico
function listDatas(data) {
    let element = document.querySelector('.contHist');

    console.log("Dados de datas: " + data.datas[0])

    data.datas.forEach(item => {
        const dateItem = new Date(item);

        const day = dateItem.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" });
        const time = dateItem.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
        element.innerHTML += `<span onclick="getDataAPI('${item}')">${day} : ${time}</span>`;
    });
}