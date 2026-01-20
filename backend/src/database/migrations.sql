CREATE DATABASE IF NOT EXISTS restaurant;
USE restaurant;

CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('OWNER', 'STAFF') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE menus (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE,
  start_time TIME,
  end_time TIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  base_price DECIMAL(10,2),
  menu_id INT UNSIGNED,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (name, menu_id),
  FOREIGN KEY (menu_id) REFERENCES menus(id)
);

CREATE TABLE order_types (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE,
  price_modifier INT
);

-- 1. Drop the existing foreign key constraint
ALTER TABLE items
DROP FOREIGN KEY items_ibfk_1;

-- 2. Add a new constraint with ON DELETE CASCADE
ALTER TABLE items
ADD CONSTRAINT items_ibfk_1
FOREIGN KEY (menu_id)
REFERENCES menus(id)
ON DELETE CASCADE;


-- Insert initial order types
INSERT INTO order_types (name, price_modifier)
VALUES ('DINE_IN', 0), ('DELIVERY', 2);
