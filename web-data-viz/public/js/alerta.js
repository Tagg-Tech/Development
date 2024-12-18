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

    window.location.href = 'dashboardAnalistaUmServidor.html';
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





async function rankingForaDoAr(tempo){
  
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

      var diferencaHoras = Math.floor(tempoDownTime / (1000 * 60));

      diferencaHoras = Math.round(diferencaHoras / 60, 2)

      diferencaHoras = Math.abs(diferencaHoras)

      var servidor = listaChamadosDown.find(item => item.nome === servidorAtual);
      console.log(servidorAtual)
      console.log(diferencaHoras)

      diferencaHoras = diferencaHoras * 0.45

      if(tempo == "dia"){
        if(diferencaHoras < 20){
          if (servidor) {
            servidor.downtime += diferencaHoras;
          } else {
            listaChamadosDown.push({ nome: servidorAtual, downtime: diferencaHoras });
          }
        }
      }else if(tempo == "semana"){
        if(diferencaHoras < 70){
          if (servidor) {
            servidor.downtime += diferencaHoras;
          } else {
            listaChamadosDown.push({ nome: servidorAtual, downtime: diferencaHoras });
          }
        }
      }else{
        if (servidor) {
          servidor.downtime += diferencaHoras;
        } else {
          listaChamadosDown.push({ nome: servidorAtual, downtime: diferencaHoras });
        }
      }


    }
  });

  

  return listaChamadosDown;
}

async function qtdAlertasTempo(tempo){

  var dataAtual = new Date()

  if (tempo == 1) {
    var dataMinima = new Date(dataAtual);
    dataMinima.setDate(dataAtual.getDate() - 1);
  } else if (tempo == 2) {
    var dataMinima = new Date(dataAtual);
    dataMinima.setDate(dataAtual.getDate() - 7);
  } else{
    var dataMinima = new Date(dataAtual);
    dataMinima.setMonth(dataAtual.getMonth() - 1);
  } 
        
  const response = await fetch("/verChamados", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  const issues = data.resultado.issues; 
  var contChamados = 0

  issues.forEach(issue => {

    const chamadoAtual = issue.fields;
    const tipoChamado = chamadoAtual.project.key;
  
    if (tipoChamado != "DOWN"){
      const chamado = chamadoAtual.description;
      index = chamado.indexOf("**");
      var dtAtual = chamado.substring(index + 2, index + 19);
      dtAtual = new Date(dtAtual) 
      if(dtAtual > dataMinima ){
        contChamados ++
      }

    }})

    return contChamados
}

//Gasp ta usando
async function numPicosCadaServidor(){
  const response = await fetch("/verChamados", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  const issues = data.resultado.issues;

  const listaPicosPorServidor = [];

  issues.forEach(issue => {
    const chamadoAtual = issue.fields;
    const tipoChamado = chamadoAtual.project.key;

    if (tipoChamado == "TTCS"){
      const chamado = chamadoAtual.description;

      const index = chamado.indexOf("''");
      if (index !== -1) {  
        var servidorAtual = chamado.substring(index + 2);
      } else {
        var servidorAtual = null;
      }

      var servidor = listaPicosPorServidor.find(item => item.NomeServidor === servidorAtual);

      if (servidor) {
        servidor.numPicos++;
      } else {
        listaPicosPorServidor.push({ NomeServidor: servidorAtual, numPicos: 1 });
      }
    }
  });

  return listaPicosPorServidor;
}

//Alves ta usando
async function numPicosPorServidor(idServidor){
  
  const response = await fetch("/verChamados", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  const issues = data.resultado.issues;
  
  var contPicos = 0;
  

  // Processando as issues
  issues.forEach(issue => {

    const chamadoAtual = issue.fields;
    const descAtual = chamadoAtual.description;

    const tipoChamado = chamadoAtual.project.key;

    const index = descAtual.indexOf("''");
    if (index !== -1) {  
        var servidorAtual = descAtual.substring(index + 2);
    }


    if(tipoChamado == "DOWM" || tipoChamado == "TTCS" && servidorAtual == idServidor){
        contPicos ++;
    }

  });

  return contPicos;
}