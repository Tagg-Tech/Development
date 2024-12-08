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

INSERT INTO maquina VALUES (1, 'DESKTOP-001', 'Linux', 16384, 1.6, 512324, 85, 80, 60, 1);
UPDATE maquina SET qtdTotalRAM = 16384 WHERE idMaquina = 1;



-- INSERT INTO usuarioresponsavelmaquina VALUES (1,1),(1,2),(1,3);


-- EXEMPLO INSERT REGISTROS


INSERT INTO registros (percentualMemoria, gigaBytesMemoria, qtdUtilizadaDisco, percentualDisco, percentualCPU, frequenciaCPU, dataHora, fkMaquina) VALUES
(72.50, 14.50, 130000, 68.40, 55.20, 3.45, '2024-11-19 08:00:00', 1),
(72.55, 14.51, 130010, 68.42, 55.30, 3.46, '2024-11-19 08:00:05', 1),
(72.60, 14.52, 130020, 68.45, 55.40, 3.47, '2024-11-19 08:00:10', 1),
(72.60, 14.53, 130030, 68.47, 55.50, 3.48, '2024-11-19 08:00:15', 1),
(72.65, 14.54, 130040, 68.50, 55.60, 3.49, '2024-11-19 08:00:20', 1),
(72.70, 14.55, 130050, 68.52, 55.80, 3.50, '2024-11-19 08:00:25', 1),
(72.75, 14.56, 130060, 68.55, 55.90, 3.51, '2024-11-19 08:00:30', 1),
(72.80, 14.57, 130070, 68.57, 56.00, 3.52, '2024-11-19 08:00:35', 1),
(72.85, 14.58, 130080, 68.60, 56.10, 3.53, '2024-11-19 08:00:40', 1),
(72.90, 14.59, 130090, 68.62, 56.20, 3.54, '2024-11-19 08:00:45', 1),
(72.95, 14.60, 130100, 68.65, 56.30, 3.55, '2024-11-19 08:00:50', 1),
(73.00, 14.61, 130110, 68.67, 56.40, 3.56, '2024-11-19 08:00:55', 1),
(73.05, 14.62, 130120, 68.70, 56.50, 3.57, '2024-11-19 08:01:00', 1),
(73.10, 14.63, 130130, 68.72, 56.60, 3.58, '2024-11-19 08:01:05', 1),
(73.15, 14.64, 130140, 68.75, 56.70, 3.59, '2024-11-19 08:01:10', 1),
(73.20, 14.65, 130150, 68.77, 56.80, 3.60, '2024-11-19 08:01:15', 1),
(73.25, 14.66, 130160, 68.80, 56.90, 3.61, '2024-11-19 08:01:20', 1),
(73.30, 14.67, 130170, 68.82, 57.00, 3.62, '2024-11-19 08:01:25', 1),
(73.35, 14.68, 130180, 68.85, 57.10, 3.63, '2024-11-19 08:01:30', 1),
(73.40, 14.69, 130190, 68.87, 57.20, 3.64, '2024-11-19 08:01:35', 1),
(73.45, 14.70, 130200, 68.90, 57.30, 3.65, '2024-11-19 08:01:40', 1),
(73.50, 14.71, 130210, 68.92, 57.40, 3.66, '2024-11-19 08:01:45', 1),
(73.55, 14.72, 130220, 68.95, 57.50, 3.67, '2024-11-19 08:01:50', 1),
(73.60, 14.73, 130230, 68.97, 57.60, 3.68, '2024-11-19 08:01:55', 1),
(73.65, 14.74, 130240, 69.00, 57.70, 3.69, '2024-11-19 08:02:00', 1),
(73.70, 14.75, 130250, 69.02, 57.80, 3.70, '2024-11-19 08:02:05', 1),
(73.75, 14.76, 130260, 69.05, 57.90, 3.71, '2024-11-19 08:02:10', 1),
(73.80, 14.77, 130270, 69.07, 58.00, 3.72, '2024-11-19 08:02:15', 1),
(73.85, 14.78, 130280, 69.10, 58.10, 3.73, '2024-11-19 08:02:20', 1),
(73.90, 14.79, 130290, 69.12, 58.20, 3.74, '2024-11-19 08:02:25', 1),
(73.95, 14.80, 130300, 69.15, 58.30, 3.75, '2024-11-19 08:02:30', 1),
(74.00, 14.81, 130310, 69.17, 58.40, 3.76, '2024-11-19 08:02:35', 1),
(74.05, 14.82, 130320, 69.20, 58.50, 3.77, '2024-11-19 08:02:40', 1),
(74.10, 14.83, 130330, 69.22, 58.60, 3.78, '2024-11-19 08:02:45', 1),
(74.15, 14.84, 130340, 69.25, 58.70, 3.79, '2024-11-19 08:02:50', 1),
(74.20, 14.85, 130350, 69.27, 58.80, 3.80, '2024-11-19 08:02:55', 1),
(74.25, 14.86, 130360, 69.30, 58.90, 3.81, '2024-11-19 08:03:00', 1),
(74.30, 14.87, 130370, 69.32, 59.00, 3.82, '2024-11-19 08:03:05', 1),
(74.35, 14.88, 130380, 69.35, 59.10, 3.83, '2024-11-19 08:03:10', 1),
(74.40, 14.89, 130390, 69.37, 59.20, 3.84, '2024-11-19 08:03:15', 1),
(74.45, 14.90, 130400, 69.40, 59.30, 3.85, '2024-11-19 08:03:20', 1),
(74.50, 14.91, 130410, 69.42, 59.40, 3.86, '2024-11-19 08:03:25', 1),
(74.55, 14.92, 130420, 69.45, 59.50, 3.87, '2024-11-19 08:03:30', 1),
(74.60, 14.93, 130430, 69.47, 59.60, 3.88, '2024-11-19 08:03:35', 1),
(74.65, 14.94, 130440, 69.50, 59.70, 3.89, '2024-11-19 08:03:40', 1),
(69.40, 15.00, 130000, 65.17, 43.13, 3.13, '2024-11-22 10:55:13', 1),
(69.40, 15.95, 130000, 65.17, 43.13, 3.13, '2024-11-22 10:55:13', 1),
(69.40, 15.95, 130000, 65.17, 90.13, 3.13, '2024-11-22 10:55:13', 1),
(74.15, 14.84, 130340, 69.25, 58.70, 3.79, '2024-11-19 08:02:50', 1),
(84.15, 14.84, 130340, 69.25, 58.70, 3.79, '2024-11-19 08:02:50', 1);

INSERT INTO registros (percentualMemoria, gigaBytesMemoria, qtdUtilizadaDisco, percentualDisco, percentualCPU, frequenciaCPU, dataHora, fkMaquina) 
VALUES 
(58.34, 8.50, 150, 45.67, 34.50, 2.4, NOW(), 1),
(70.12, 7.80, 200, 51.45, 60.20, 2.5, NOW(), 1),
(54.89, 6.20, 100, 30.45, 15.30, 2.2, NOW(), 1),
(80.56, 12.50, 300, 65.00, 85.40, 3.0, NOW(), 1),
(62.78, 9.00, 180, 55.90, 42.10, 2.7, NOW(), 1),
(75.43, 11.00, 220, 59.80, 47.00, 2.8, NOW(), 1),
(66.92, 8.75, 210, 60.50, 52.30, 2.3, NOW(), 1),
(50.20, 5.80, 140, 39.20, 20.10, 2.0, NOW(), 1),
(67.34, 9.50, 160, 50.30, 39.20, 2.6, NOW(), 1),
(58.90, 6.50, 180, 47.00, 28.00, 2.4, NOW(), 1),
(82.60, 10.00, 250, 62.30, 75.90, 3.1, NOW(), 1),
(63.40, 7.90, 190, 52.50, 45.50, 2.5, NOW(), 1),
(72.30, 8.60, 210, 58.40, 55.30, 2.9, NOW(), 1),
(68.20, 6.00, 170, 45.10, 37.80, 2.3, NOW(), 1),
(79.10, 11.50, 280, 63.20, 78.00, 3.0, NOW(), 1),
(65.50, 9.20, 230, 57.50, 49.40, 2.8, NOW(), 1),
(51.30, 7.00, 160, 42.10, 22.00, 2.1, NOW(), 1),
(77.90, 12.00, 270, 61.90, 67.20, 3.0, NOW(), 1),
(59.60, 6.80, 150, 48.70, 34.10, 2.2, NOW(), 1),
(70.00, 8.40, 210, 53.90, 48.30, 2.7, NOW(), 1),
(70.00, 8.40, 210, 91.90, 91.30, 2.7, NOW(), 1),
(91.00, 15.10, 210, 91.90, 91.30, 2.7, NOW(), 1),
(91.00, 15.10, 210, 91.90, 84.30, 2.7, NOW(), 1),
(91.00, 15.10, 210, 91.90, 84.30, 2.7, NOW(), 1);

INSERT INTO usuarioResponsavelMaquina VALUES
(1,1);

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


-- Selects da DashBoard de um servidor --
-- Grafico de linhas
SELECT percentualCPU, percentualMemoria FROM registros AS r 
	JOIN usuarioresponsavelmaquina AS u ON r.fkMaquina = u.fkMaquina
    WHERE u.fkUsuario = 1;

-- Métrica de RAM 
SELECT r.gigaBytesMemoria, m.qtdTotalRAM, r.percentualMemoria, m.porcentagemAlarmeRAM FROM registros AS r
	JOIN maquina AS m ON m.idMaquina = r.fkMaquina
    JOIN usuarioresponsavelmaquina AS u ON u.fkMaquina = m.idMaquina
    WHERE u.fkUsuario = 1;

-- Métrica grafico de pizza
-- SELECT qtdTotalDisco, percentualDisco FROM maquina AS m 
--  	JOIN registros AS r ON m.idMaquina = r.fkMaquina;

-- Métrica grafico de pizza
SELECT percentualDisco FROM registros AS r
	JOIN usuarioResponsavelMaquina AS u ON r.fkMaquina = u.fkMaquina
    WHERE u.fkUsuario = 1;  
    
-- Métrica isInstable
SELECT percentualCPU, porcentagemAlarmeCPU FROM registros AS r 
	JOIN usuarioresponsavelmaquina AS u ON r.fkMaquina = u.fkMaquina
    JOIN maquina AS m ON m.idMaquina = r.fkMaquina
    WHERE u.fkUsuario = 1;
    
-- qtdErros
SELECT
    COUNT(*) AS quantidade_alertas
FROM
    registros r
JOIN
    maquina m ON r.fkMaquina = m.idMaquina
JOIN
    usuarioResponsavelMaquina urm ON m.idMaquina = urm.fkMaquina
WHERE
    urm.fkUsuario = 1  -- ID do usuário específico
    AND m.idMaquina = r.fkMaquina -- ID da máquina específica
    AND (
        r.percentualCPU > m.porcentagemAlarmeCPU
        OR r.percentualMemoria > m.porcentagemAlarmeRAM
        OR r.percentualDisco > m.porcentagemAlarmeDisco
    );



