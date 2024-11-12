USE TagTech;

INSERT INTO empresa VALUES (1, "IvanTechSolutions", "IvanLTDA", "123445667788", "04561000");
INSERT INTO usuario VALUES (default, "Fernando BRandão", "brandao@gmail.com", "teste123","Analista", "11989765432","12345567890",null, 1),
						   (default, "Lucas Alves", "lucas@gmail.com", "teste@123","Gerente", "11987654321","1234567809", null, 1);
                           
INSERT INTO maquina (
  placaDeRede, 
  sistemaOperacional, 
  qtdTotalRAM, 
  qtdCpu, 
  qtdTotalDisco, 
  alertaCPU, 
  alertaRAM, 
  alertaDisco, 
  fkEmpresa
) 
VALUES (
  'x',  -- Trocar X pela placa de rede da maquina
  'Linux Ubuntu 20.04',  -- Exemplo de sistema operacional
  16384,  -- Quantidade de RAM em MB
  8,  -- Número de CPU'S
  512000,  -- Tamanho do disco em MB
  85,  -- Alerta de CPU (em porcentagem, por exemplo 85%)
  80,  -- Alerta de RAM (em porcentagem, por exemplo 80%)
  75,  -- Alerta de Disco (em porcentagem, por exemplo 75%)
  1  -- ID da empresa na tabela empresa
);



INSERT INTO usuarioresponsavelmaquina VALUES (1,1),(1,2),(1,3);

-- adicionar
UPDATE usuarioresponsavelmaquina SET fkUsuario = 2 WHERE fkMaquina = 3;
-- desassociar

-- excluir
-- DELETE usuario WHERE idUsuario = -- cod do funcionario

select * from empresa;
select * from usuario;
select * from maquina;
select * from usuarioresponsavelmaquina;
select * from registros;


