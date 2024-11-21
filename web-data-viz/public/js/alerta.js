var alertas = [];

var primeiraChamada = true

var numChamados = 0


function atualizacaoPeriodica() {
    
    getChamadosAlerta()
    
    setTimeout(atualizacaoPeriodica, 12000);



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
        console.log("troquei")
        numChamados = issues.length
        primeiraChamada = false
      }

  

      if(numChamados < issues.length){
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

  
    }
  

function exibirAlerta(tipoChamado, servidorAtual){

    const alertaDiv = document.getElementById("alertaJira");
    alertaDiv.style.display = "flex";
    const alertaTexto = document.getElementById("pAlerta");
    if(tipoChamado == "DOWN"){
        
        alertaTexto.textContent = `Alerta: O servidor ${servidorAtual} está fora do ar`;
    }else{
        alertaTexto.textContent = `Alerta: O servidor ${servidorAtual} entrou em estado de pico!`;
    }



}



function irParaAlertas(){
    window.location.href = 'alerta.html';
}


async function numeroPicosPorServidor(idServidor){
  
  const response = await fetch("/verChamados", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  const issues = data.resultado.issues;
  
  var contPicos = 0;
  
  console.log(issues)

  // Processando as issues
  issues.forEach(issue => {


    const chamadoAtual = issue.fields;
    const descAtual = chamadoAtual.description;



    const tipoChamado = chamadoAtual.project.key;

    const index = descAtual.indexOf("''");
    if (index !== -1) {  
        var servidorAtual = descAtual.substring(index + 2);
    }


    if(tipoChamado == "TTCS" && servidorAtual == idServidor){
        contPicos ++;
    }

    
  });



  return contPicos;

}

async function rankingForaDoAr(){
  

  const response = await fetch("/verChamados", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  const issues = data.resultado.issues;


  const listaChamadosDown = []


  issues.forEach(issue => {


    const chamadoAtual = issue.fields;
    const tipoChamado = chamadoAtual.project.key;

    if (tipoChamado == "DOWN"){
      const chamado = chamadoAtual.description;


      index = chamado.indexOf("''");
      index2 = chamado.indexOf("ficou") - 1
      if (index !== -1) {  
          var servidorAtual = chamado.substring(index + 2,  index2  );
  
      }else{
        var servidorAtual = null
      }
     
      var index = chamado.indexOf("**");
      if (index !== -1) { 
          var dataAtual = chamado.substring(index + 2, index + 19);
          dataAtual = new Date(dataAtual) 
      }

      var fimDownTime = chamadoAtual.customfield_10046.completedCycles[0]  


      if(fimDownTime == undefined){
        var dataFechamento = new Date()
      }else{
        var dataFechamento = new Date(fimDownTime.stopTime.iso8601)
      }

      var tempoDownTime = dataAtual - dataFechamento;

      // Convertendo milissegundos para minutos
      var diferencaHoras = Math.floor(tempoDownTime / (1000 * 60));

      diferencaHoras = Math.round(diferencaHoras / 60, 2)

      //Deixando o valor positivo
      diferencaHoras = Math.abs(diferencaHoras)

      var servidor = listaChamadosDown.find(item => item.nome === servidorAtual);

      if (servidor) {
        // Incrementa o downtime se o nome já estiver na lista
        servidor.downtime += diferencaHoras;
      } else {
        // Adiciona um novo servidor na lista se ele não existir
        listaChamadosDown.push({ nome: servidorAtual, downtime: diferencaHoras });
      }

    }
  });

  return listaChamadosDown;
}

function qtdAlertasMensal(){

}
