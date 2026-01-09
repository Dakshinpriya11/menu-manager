-- OUTLETS
CREATE TABLE outlets (
  id INT PRIMARY KEY
);

-- MENUS
CREATE TABLE menus (
  id INT AUTO_INCREMENT PRIMARY KEY,
  outlet_id INT,
  name VARCHAR(100),
  active BOOLEAN DEFAULT TRUE,
  start_time TIME,
  end_time TIME,
  FOREIGN KEY (outlet_id) REFERENCES outlets(id)
);

-- CATEGORIES
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  menu_id INT,
  name VARCHAR(100),
  FOREIGN KEY (menu_id) REFERENCES menus(id)
);

-- ITEMS
CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT,
  name VARCHAR(100),
  available BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- ITEM ORDER TYPE PRICING
CREATE TABLE item_prices (
  item_id INT PRIMARY KEY,
  dinein_price DECIMAL(10,2),
  takeaway_price DECIMAL(10,2),
  FOREIGN KEY (item_id) REFERENCES items(id)
);
