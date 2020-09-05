-- creando base de datos
CREATE DATABASE uid;

-- usando la base de datos
use uid;

-- creando una tabla
CREATE TABLE uids (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id64 varchar(17),
    uid varchar(50),
    discordserver varchar(200),
    usuariotag varchar(200)
);

-- mostrando las tablas
SHOW TABLES;

-- como quedaron las tablas
describe uid;