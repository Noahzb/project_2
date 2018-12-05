DROP DATABASE IF EXISTS vroom;

CREATE DATABASE vroom;

-- Use database
USE vroom;

-- Create table
CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(80),
    PRIMARY KEY (id)
);

INSERT INTO user (name)
VALUES ("Juan");

INSERT INTO user (name)
VALUES ("Noah");

INSERT INTO user (name)
VALUES ("Josue");

INSERT INTO user (name)
VALUES ("Noah");
 
 
DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;
