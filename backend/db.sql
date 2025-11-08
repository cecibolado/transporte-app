CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  email VARCHAR(50) UNIQUE,
  password VARCHAR(102)
);

CREATE TABLE vehiculos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  marca VARCHAR(50),
  modelo VARCHAR(50),
  patente VARCHAR(20),
  ano INT,
  capacidad_carga INT
);

CREATE TABLE conductores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  apellido VARCHAR(50),
  dni INT UNIQUE,
  licencia TINYINT,
  telefono INT,
);

CREATE TABLE viajes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vehiculo_id INT,
  conductor_id INT,
  fecha_salida DATE,
  fecha_llegada DATE,
  origen VARCHAR(100),
  destino VARCHAR(100),
  kilometros DECIMAL(10,2),
  FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id),
  FOREIGN KEY (conductor_id) REFERENCES conductores(id)
);