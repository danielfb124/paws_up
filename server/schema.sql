/*escribir comandos para crear base de datos, tablas, consultas etc*/

CREATE DATABASE paws_up; //crea la base de datos
USE paws_up; //selecciona la base de datos

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    celular VARCHAR(15)
);
CREATE TABLE Animals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    animal_type VARCHAR(255),
    breed VARCHAR(255),
    sexing VARCHAR(255),
    state_description VARCHAR(255),
    exact_location VARCHAR(255),
    adopted BOOLEAN DEFAULT false,
    image_data VARCHAR(255),
    user_id INT
);
INSERT INTO users (name, email, password) VALUES ('Daniel', 'danielfw4k@gmail.com', '2024');

INSERT INTO Animals (animal_type, breed,sexing,state_description,exact_location,image_data) VALUES ('Perro', 'Criollo','Female', 'bien de salud','carrera 12 #1-8','https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSAOnLXSaPbc4K0IId0dSTI050OfwusYAyfQzMiCF6mrwNPVdmN');