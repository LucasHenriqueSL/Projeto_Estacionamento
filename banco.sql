create database banco;
use banco;

CREATE TABLE `banco`.`usuarios` (
  `idusuarios` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idusuarios`)
);

select * from banco.usuarios;