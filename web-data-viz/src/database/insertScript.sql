USE TagTech;

INSERT INTO empresa VALUES (1, "IvanTechSolutions", "IvanLTDA", "123445667788", "04561000");
INSERT INTO usuario VALUES (default, "Fernando BRandão", "brandao@gmail.com", "teste123","Analista", "11989765432","12345567890",null, 1),
						   (default, "Lucas Alves", "lucas@gmail.com", "teste@123","Gerente", "11987654321","1234567809", null, 1);
                           
INSERT INTO maquina VALUES (default, 91755279024, "Windows", 32, 64 , 1024, 80, 85, 92, 1),
						   (default, 25743737322, "Windows", 16, 16 , 512, 80, 85, 92, 1),
						   (default, 72799972352, "Linux"  , 64, 32 , 1024, 80, 85, 92, 1);


INSERT INTO usuarioresponsavelmaquina VALUES (1,1),(1,2),(1,3);



select * from empresa;
select * from usuario;
select * from maquina;
select * from usuarioresponsavelmaquina;
select * from registros;


