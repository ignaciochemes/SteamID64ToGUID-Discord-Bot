-- creando base de datos
CREATE DATABASE guid;

-- usando la base de datos
use guid;

-- creando una tabla
CREATE TABLE guids (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id64 varchar(17),
    guid varchar(32),
    discordserver varchar(200),
    usuariotag varchar(200)
);

-- mostrando las tablas
SHOW TABLES;

-- como quedaron las tablas
describe guid;