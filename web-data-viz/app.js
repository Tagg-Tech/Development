var ambiente_processo = 'producao';
//var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

//Conexão cadastro da empresa
var empresaRouter = require("./src/routes/empresas");
//Conexão cadastro do funcionário
var funcionarioRouter = require("./src/routes/funcionarios");
//Conexão cadastro do servidor
var servidorRouter = require("./src/routes/servidores");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/empresas", empresaRouter);
app.use("/funcionarios", funcionarioRouter);
app.use("/servidores", servidorRouter);

app.listen(PORTA_APP, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n`)
    console.log(`Servidor rodando`);
});