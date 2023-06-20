CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(20),
    gender VARCHAR(20),
    email VARCHAR(50),
    password VARCHAR(50),
    PRIMARY KEY (id)
)

-- baru
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
    idPsikolog int,
    PRIMARY KEY (idDJ),
    FOREIGN KEY (idC) REFERENCES user(id)
)

-- ALTER TABLE dataHasil ADD idPsikolog int;
-- baru
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
    idPsikolog int,
    PRIMARY KEY (idDH),
    FOREIGN key (idC) REFERENCES user(id),
    FOREIGN KEY (idDJ) REFERENCES dataJadwal(idDJ)
)

SELECT * FROM dataHasil

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

CREATE TABLE psikolog (
    idPsikolog INT NOT NULL,
    namaPsikolog VARCHAR(50),
    ttlPsikolog VARCHAR(50),
    JKPsikolog VARCHAR(20),
    agamaPsikolog VARCHAR(20),
    statusPsikolog VARCHAR(20),
    noHpPsikolog VARCHAR(20),
    PRIMARY KEY (idPsikolog)
);

CREATE TABLE ratingUlasan(
    idRatingUlasan  int NOT NULL AUTO_INCREMENT,
    idPsikolog int NOT NULL,
    idDH int NOT NULL, 
    rating int NOT NULL,
    ulasan VARCHAR(100),
    PRIMARY KEY (idRatingUlasan),
    FOREIGN KEY (idPsikolog) REFERENCES psikolog(idPsikolog),
    FOREIGN KEY (idDH) REFERENCES dataHasil(idDH)
)

CREATE TABLE voucher(
    idVoucher  int NOT NULL AUTO_INCREMENT,
    namaVoucher VARCHAR(100) NOT NULL,
    jenisVoucher VARCHAR(50) NOT NULL,
    discount int NOT NULL,
    PRIMARY KEY (idVoucher)
)

DROP TABLE voucher

SELECT * FROM ratingUlasan

INSERT INTO psikolog
(idPsikolog, namaPsikolog, ttlPsikolog, JKPsikolog, agamaPsikolog, statusPsikolog, noHpPsikolog)
VALUES(001,'Chairiah Yulianti Siregar S.Psi., M.Psi Psikolog', 'Medan, 16 Juli 1967', 'Perempuan', 'Islam', 'Menikah', '082162429736' )

INSERT INTO psikolog
(idPsikolog, namaPsikolog, ttlPsikolog, JKPsikolog, agamaPsikolog, statusPsikolog, noHpPsikolog)
VALUES(002,'Sarinah S.Psi., M.Psi Psikolog', 'Tarutung, 27 April 1965 ', 'Perempuan', 'Kristen', 'Menikah', '08126402588' )

INSERT INTO psikolog
(idPsikolog, namaPsikolog, ttlPsikolog, JKPsikolog, agamaPsikolog, statusPsikolog, noHpPsikolog)
VALUES(003,'Hasdina Trisnasuci, S.Psi,M.Psi, Psikolog', 'Tebing Tinggi, 20 Mei 1967', 'Perempuan', 'Islam', 'Menikah', '08126059074' )

INSERT INTO psikolog
(idPsikolog, namaPsikolog, ttlPsikolog, JKPsikolog, agamaPsikolog, statusPsikolog, noHpPsikolog)
VALUES(004,'Achmad Irvan Dwi Putra, S.Psi,M.Psi, Psikolog', 'Medan, 15 Oktober 1985', 'Pria', 'Islam', 'Menikah', '085263510041' )

DELETE FROM psikolog WHERE idPsikolog=003

SELECT * FROM psikolog

SELECT * FROM psikolog WHERE = 1