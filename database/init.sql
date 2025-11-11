USE shopping_db;

CREATE TABLE IF NOT EXISTS category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

INSERT INTO category (name, description) VALUES
('Food', 'Food items and groceries'),
('Mobiles', 'Mobile phones and accessories'),
('Electronics', 'Electronic devices'),
('Stationery', 'Books and stationery items');

INSERT INTO product (name, category_id, price, stock, image_url) VALUES
('Cake', 1, 200.00, 10, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'),
('Phone', 2, 20000.00, 100, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'),
('Laptop', 3, 40000.00, 20, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'),
('Book', 4, 50.00, 3, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'),
-- Additional products for better variety
('Pizza', 1, 350.00, 25, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400'),
('Chocolate Box', 1, 150.00, 50, 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400'),
('Coffee Beans', 1, 450.00, 30, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'),
('Wireless Earbuds', 2, 3500.00, 75, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400'),
('Tablet', 2, 25000.00, 40, 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400'),
('Smartwatch', 3, 8000.00, 60, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'),
('Gaming Mouse', 3, 1200.00, 90, 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400'),
('Wireless Keyboard', 3, 2500.00, 45, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'),
('Notebook Set', 4, 120.00, 150, 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400'),
('Fountain Pen', 4, 800.00, 35, 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccc?w=400');

-- Verify data (optional - just for checking)
SELECT 'Categories created:' as Message;
SELECT * FROM category;

SELECT 'Products created:' as Message;
SELECT p.id, p.name, c.name as category, p.price, p.stock 
FROM product p 
JOIN category c ON p.category_id = c.id;
