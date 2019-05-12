DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  sku INTEGER,
  product_name VARCHAR(45),
  department_name VARCHAR(30),
  price DECIMAL(10,2),
  stock_quantity INTEGER,
  PRIMARY KEY (sku)
);

INSERT INTO products (sku, product_name, department_name, price, stock_quantity)
VALUES (1, "Monopoly", "Board Game", 10.00, 100);
INSERT INTO products (sku, product_name, department_name, price, stock_quantity)
VALUES (2, "Patron", "Alcohol", 40.00, 90);
INSERT INTO products (sku, product_name, department_name, price, stock_quantity)
VALUES (3, "iPhone Case", "Phone Accessories", 20.00, 250);
INSERT INTO products (sku, product_name, department_name, price, stock_quantity)
VALUES (4, "Dingo Dental Sticks", "Dog Treats", 5.25, 100);
INSERT INTO products (sku, product_name, department_name, price, stock_quantity)
VALUES (5, "Coffee Table", "Furniture", 250.00, 50);
INSERT INTO products (sku, product_name, department_name, price, stock_quantity)
VALUES (6, "18K Gold Earrings", "Jewelry", 150.00, 25);
INSERT INTO products (sku, product_name, department_name, price, stock_quantity)
VALUES (7, "Bling Bling Bracelet", "Jewelry", 25.00, 95);
INSERT INTO products (sku, product_name, department_name, price, stock_quantity)
VALUES (8, "Red Oak Bedroom Set", "Furniture", 2500.00, 30);
INSERT INTO products (sku, product_name, department_name, price, stock_quantity)
VALUES (9, "Lazyboy Recliner", "Furniture", 900.00, 40);
INSERT INTO products (sku, product_name, department_name, price, stock_quantity)
VALUES (10, "Samsung 60 Smart TV", "Electronic", 850.00, 35);

SELECT * FROM products;