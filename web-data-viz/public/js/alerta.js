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

  
      console.log(issues)
      
      console.log(numChamados)
      console.log(issues.length)

      if(numChamados < issues.length){
        console.log("Entreeiiii")
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
        alertaTexto.textContent = `Alerta: O servidor ${servidorAtual} entrou em estado de pica!`;
    }



}



function irParaAlertas(){
    window.location.href = 'alerta.html';
}


function numeroPicosPorServidor(idServidor){
  
}

function rankingForaDoAr(){

}

function qtdAlertasMensal(){

}
