USE shopping_db;
ALTER TABLE product 
ADD COLUMN IF NOT EXISTS image_url VARCHAR(500) AFTER stock;

UPDATE product SET image_url = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400' WHERE name = 'Cake';
UPDATE product SET image_url = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' WHERE name = 'Phone';
UPDATE product SET image_url = 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400' WHERE name = 'Laptop';
UPDATE product SET image_url = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400' WHERE name = 'Book';

INSERT INTO product (name, category_id, price, stock, image_url) VALUES
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

-- Verify the data
SELECT id, name, price, stock, image_url FROM product;
