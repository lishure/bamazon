DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  sku INTEGER AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45),
  department_name VARCHAR(30),
  price INTEGER,
  stock_quatitiy INTEGER,
  PRIMARY KEY (id)
);