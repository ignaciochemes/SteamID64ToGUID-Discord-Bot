-- creando base de datos
CREATE DATABASE guid;

-- usando la base de datos
use guid;

-- creando una tabla
CREATE TABLE guids (
    id int NOT NULL AUTO_INCREMENT,
    id64 varchar(17),
    guid varchar(32),
    discordserver varchar(200),
    usuariotag varchar(200),
    PRIMARY KEY (id)
);

-- mostrando las tablas
SHOW TABLES;

-- como quedaron las tablas
describe guid;