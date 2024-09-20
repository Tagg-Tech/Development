var empresaModel = require("../models/empresaModel");

function cadastrar(req, res){
    var razaoSocial = req.body.razaoSocialServer;
    var nomeFantasia = req.body.nomeFantasiaServer;
    var cnpj = req.body.cnpjServer;
    var cep = req.body.cepServer;

    if(razaoSocial == undefined){
        res.status(400).send("A Razão Social está undefined!");
    } else if(nomeFantasia == undefined){
        res.status(400).send("O nome fantasia está undefined!");
    } else if(cnpj == undefined){
        res.status(400).send("O CNPJ está undefined!");
    } else if(cep == undefined){
      res.status(400).send("O CEP está undefined!");
    }

    empresaModel.cadastrar(razaoSocial, nomeFantasia, cnpj, cep)
      .then(function(resposta){
          res.status(200).send("Empresa criada com sucesso");
      }).catch(function(erro){
          res.status(500).json(erro.sqlMessage);
      })
}

module.exports = {
    cadastrar
}




// var empresaModel = require("../models/empresaModel");
// 
// function buscarPorCnpj(req, res) {
//   var cnpj = req.query.cnpj;
// 
//   empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
//     res.status(200).json(resultado);
//   });
// }
// 
// function listar(req, res) {
//   empresaModel.listar().then((resultado) => {
//     res.status(200).json(resultado);
//   });
// }
// 
// function buscarPorId(req, res) {
//   var id = req.params.id;
// 
//   empresaModel.buscarPorId(id).then((resultado) => {
//     res.status(200).json(resultado);
//   });
// }
// 
// function cadastrar(req, res) {
//   var razao = req.body.razaoServer;
//   var fantasia = req.body.fantasiaServer;
//   var email = req.body.emailServer;
//   var cnpj = req.body.cnpjServer;
//   var telefone = req.body.telefoneServer;
// 
//   if (razao == undefined) {
//     res.status(400).send("Sua razão está undefined!");
//   } else if (fantasia = undefined) {
//     res.status(400).send("Seu nome fantasia está undefined!");
//   } else if (email == undefined) {
//     res.status(400).send("Seu e-mail está undefined!");
//     
//   }
// }
// 
// module.exports = {
//   buscarPorCnpj,
//   buscarPorId,
//   cadastrar,
//   listar,
// };


 /*
             razaoServer: razaoVar,
            fantasiaServer: fantasiaVar,
            emailServer: emailVar,
            cnpjServer: cnpjVar,
            telefoneServer: telefoneVar,
 */
