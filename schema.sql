CREATE DATABASE IF NOT EXISTS db_retrogames;

USE db_retrogames;

CREATE TABLE IF NOT EXISTS jogos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    plataforma VARCHAR(100) NOT NULL,
    desenvolvedora VARCHAR(150) NOT NULL,
    imagem_url VARCHAR(2048) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO jogos (titulo, plataforma, desenvolvedora, imagem_url, preco)
VALUES
('Super Mario World', 'SNES', 'Nintendo',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTraCIE9Us-7DIEtpH4DzckhX-hxi1GJbbo023AC8QCBzYdFVVVbIzWz0Pm&s=10', 149.90),

('Sonic', 'Mega Drive', 'Sega',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD_j4Bpx8KxtykRFFagEadfwPTmmvyID2ngZ4Bxkoj9AaN1aKB8qNmzGyJ&s=10', 99.90),

('Crash Bandicoot', 'PlayStation 1', 'Naughty Dog',
'https://static.wikia.nocookie.net/crashbandicoot/images/5/58/Bandicoot.png/revision/latest?cb=20080719231406&path-prefix=pt', 129.90);