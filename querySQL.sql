CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(20),
    gender VARCHAR(20),
    email VARCHAR(50),
    password VARCHAR(50),
    PRIMARY KEY (id)
)

CREATE TABLE dataJadwal (
    idDJ int NOT NULL AUTO_INCREMENT,
    idC int NOT NULL,
    Status VARCHAR(5),
    nama VARCHAR(255),
    namaP VARCHAR(255),
    pelayanan VARCHAR(50),
    sesi int,
    dateJ VARCHAR(50),
    MPay VARCHAR(50),
    TPay int,
    dateT date not null DEFAULT (CURDATE()),
    PRIMARY KEY (idDJ),
    FOREIGN KEY (idC) REFERENCES user(id)
)

CREATE TABLE dataHasil (
    idDH int NOT NULL AUTO_INCREMENT,
    idC int NOT NULL, 
    idDJ int NOT NULL,
    status VARCHAR(5),
    nama VARCHAR(255),
    namaP VARCHAR(255),
    pelayanan VARCHAR(50),
    dateJ VARCHAR(50),
    dateT date not null DEFAULT (CURDATE()),
    fileName VARCHAR(255),
    path VARCHAR(255),
    PRIMARY KEY (idDH),
    FOREIGN key (idC) REFERENCES user(id),
    FOREIGN KEY (idDJ) REFERENCES dataJadwal(idDJ)
)

CREATE TABLE dataSP (
    idSP int NOT NULL AUTO_INCREMENT,
    dateP VARCHAR(50),
    PRIMARY KEY (idSP)
)

CREATE TABLE dataSAC (
    idSAC int NOT NULL AUTO_INCREMENT,
    dateAC VARCHAR(50),
    PRIMARY KEY (idSAC)
)

CREATE TABLE dataSK (
    idSK int NOT NULL AUTO_INCREMENT,
    dateK VARCHAR(50),
    PRIMARY KEY (idSK)
)

CREATE TABLE dataSC (
    idSC int NOT NULL AUTO_INCREMENT,
    dateC VARCHAR(50),
    PRIMARY KEY (idSC)
)

CREATE TABLE dataST (
    idST int NOT NULL AUTO_INCREMENT,
    dateT VARCHAR(50),
    PRIMARY KEY (idST)
)

SELECT * FROM dataSP
DELETE FROM dataSP


SELECT * FROM dataHasil