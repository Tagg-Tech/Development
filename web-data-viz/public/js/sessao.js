// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

function direcionarDashboard() {
    var cargo = sessionStorage.CARGO;
    var dashboardLink = document.getElementById('dashboardLink');

    if (cargo === 'Analista') {
        dashboardLink.href = 'dashboardAnalista.html';
        alert("Direcionando para analista")
    } else{
        alert("Direcionando para Gerente")
        dashboardLink.href = 'dashboardGerente.html';
    }
}


// carregamento (loading)
// function aguardar() {
//     var divAguardar = document.getElementById("div_aguardar");
//     divAguardar.style.display = "flex";
// }
// 
// function finalizarAguardar(texto) {
//     var divAguardar = document.getElementById("div_aguardar");
//     divAguardar.style.display = "none";
// 
//     var divErrosLogin = document.getElementById("div_erros_login");
//     if (texto) {
//         divErrosLogin.style.display = "flex";
//         divErrosLogin.innerHTML = texto;
//     }
// }

