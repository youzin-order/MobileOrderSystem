INSERT INTO Customers (Name, PhoneNumber, Email)
VALUES 
('Taro Yamada', '08012345678', 'taro.yamada@example.com'),
('Hanako Suzuki', '07098765432', 'hanako.suzuki@example.com'),
('Kenta Tanaka', '09023456789', 'kenta.tanaka@example.com');


INSERT INTO TableInfo (TableNumber, Capacity, QRCodePath)
VALUES 
('T1', 4, '/qr-codes/table1.png'),
('T2', 2, '/qr-codes/table2.png'),
('T3', 6, '/qr-codes/table3.png');


INSERT INTO MenuItems (Name, Description, Price, Category, ImagePath)
VALUES 
('Margherita Pizza', 'Classic pizza with mozzarella and basil', 1000.00, 'Pizza', '/images/margherita.png'),
('Spaghetti Carbonara', 'Pasta with creamy sauce and bacon', 1200.00, 'Pasta', '/images/carbonara.png'),
('Caesar Salad', 'Fresh lettuce, croutons, and Caesar dressing', 800.00, 'Salad', '/images/caesar_salad.png'),
('Cappuccino', 'Hot coffee with milk foam', 400.00, 'Beverage', '/images/cappuccino.png'),
('Cheesecake', 'Rich and creamy cheesecake', 500.00, 'Dessert', '/images/cheesecake.png');


INSERT INTO Orders (CustomerID, TableID, TotalAmount)
VALUES 
(1, 1, 2400.00),
(2, 2, 1600.00),
(3, 3, 2000.00);


INSERT INTO OrderDetails (OrderID, MenuItemID, Quantity, SubTotal)
VALUES 
(1, 1, 2, 2000.00), -- 2x Margherita Pizza
(1, 4, 1, 400.00),  -- 1x Cappuccino
(2, 3, 2, 1600.00), -- 2x Caesar Salad
(3, 2, 1, 1200.00), -- 1x Spaghetti Carbonara
(3, 5, 1, 800.00);  -- 1x Cheesecake


select @@servername;

npm install express body-parser mssql


CREATE LOGIN YouZin WITH PASSWORD = 'YouZin';
CREATE USER YouZin FOR LOGIN YouZin;

ALTER ROLE db_owner ADD MEMBER YouZin;

INSERT INTO users (id, name, email)
VALUES (1, 'John Doe', 'john.doe@example.com');
SELECT @@SERVERNAME AS 'Server Name';
