CREATE TABLE IF NOT EXISTS seller_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    status_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO seller_details (name, address, email, password, phone, status_id) VALUES
('Best Plastics Pvt Ltd', '123 Industrial Area, Delhi', 'bestplastics@example.com', 'seller123', '+91-9876543210', 1),
('QuickFoods Pvt Ltd', '456 Food Park, Mumbai', 'quickfoods@example.com', 'seller456', '+91-9876543211', 1),
('Indian Electronics Pvt Ltd', '789 Tech Hub, Bangalore', 'indianelectronics@example.com', 'seller789', '+91-9876543212', 1);
