var alertas = [];

var primeiraChamada = true

var numChamados = 0

var teste = 0

function atualizacaoPeriodica() {
    
    getChamadosAlerta()
    
    setTimeout(atualizacaoPeriodica, 7000);



}



async function getChamadosAlerta(){

        
      const response = await fetch("/verChamados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
       // Exibe a resposta completa
      
      // Acessando o array de issues
      const issues = data.resultado.issues; // Aqui estamos acessando o array de issues
      

      if(primeiraChamada == true){
        numChamados = issues.length
        primeiraChamada == false
      }

  

      if(numChamados < teste){

        var novoChamado = issues[issues.length - 1]
        novoChamado = novoChamado.fields
        const descAtual = novoChamado.description; // Supondo que você tenha um campo 'description'  
        const tipoChamado = novoChamado.project.key;
  
        index = descAtual.indexOf("''");
        if(tipoChamado == "DOWN"){
          index2 = descAtual.indexOf("ficou")
              var servidorAtual = descAtual.substring(index +2,  index2  );    
        }else{
              var servidorAtual = descAtual.substring(index + 2);
        }
  
        exibirAlerta(tipoChamado,servidorAtual)

        numChamados = issues.length

      }
      teste = numChamados + 1
  
  
    }
  

function exibirAlerta(tipoChamado, servidorAtual){



    const alertaDiv = document.getElementById("alertaJira");
    alertaDiv.style.display = "flex";
    const alertaTexto = document.getElementById("pAlerta");
    if(tipoChamado == "DOWN"){
        
        alertaTexto.textContent = `Alerta: O servidor ${servidorAtual} está fora do ar`;
    }else{
        alertaTexto.textContent = `Alerta: O servidor ${servidorAtual} entrou em estado de pica!`;
    }



}



function obterdados(idAquario) {
    fetch(`/medidas/tempo-real/${idAquario}`)
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idAquario);
                });
            } else {
                console.error(`Nenhum dado encontrado para o id ${idAquario} ou erro na API`);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

function alertar(resposta, idAquario) {
    var temp = resposta[0].temperatura;

    var grauDeAviso = '';

    var limites = {
        muito_quente: 23,
        quente: 22,
        ideal: 20,
        frio: 10,
        muito_frio: 5
    };

    var classe_temperatura = 'cor-alerta';

    if (temp >= limites.muito_quente) {
        classe_temperatura = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.muito_quente && temp >= limites.quente) {
        classe_temperatura = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.quente && temp > limites.frio) {
        classe_temperatura = 'cor-alerta ideal';
        removerAlerta(idAquario);
    }
    else if (temp <= limites.frio && temp > limites.muito_frio) {
        classe_temperatura = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp <= limites.muito_frio) {
        classe_temperatura = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    }

    var card;

    if (document.getElementById(`temp_aquario_${idAquario}`) != null) {
        document.getElementById(`temp_aquario_${idAquario}`).innerHTML = temp + "°C";
    }

    if (document.getElementById(`card_${idAquario}`)) {
        card = document.getElementById(`card_${idAquario}`)
        card.className = classe_temperatura;
    }
}


function removerAlerta(idAquario) {
    alertas = alertas.filter(item => item.idAquario != idAquario);
    exibirCards();
}

function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}

function transformarEmDiv({ idAquario, temp, grauDeAviso, grauDeAvisoCor }) {

    var descricao = JSON.parse(sessionStorage.AQUARIOS).find(item => item.id == idAquario).descricao;
    return `
    <div class="mensagem-alarme">
        <div class="informacao">
            <div class="${grauDeAvisoCor}">&#12644;</div> 
            <h3>${descricao} está em estado de ${grauDeAviso}!</h3>
            <small>Temperatura capturada: ${temp}°C.</small>   
        </div>
        <div class="alarme-sino"></div>
    </div>
    `;
}

