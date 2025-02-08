CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    UserName NVARCHAR(100) NOT NULL,
    UserRole NVARCHAR(50) NOT NULL, -- e.g., Admin, Staff
    Password NVARCHAR(255) NOT NULL, -- ハッシュ化されたパスワード
    CreatedAt DATETIME DEFAULT GETDATE()
);
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100),
    PhoneNumber NVARCHAR(15),
    Email NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE()
);
CREATE TABLE MenuItems (
    MenuItemID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(255) NOT NULL,
    Description NVARCHAR(500),
    Price DECIMAL(10,2) NOT NULL,
    Category NVARCHAR(100), -- e.g., Drinks, Appetizers, Main Course
    ImagePath NVARCHAR(255), -- 画像のパス（オプション）
    CreatedAt DATETIME DEFAULT GETDATE()
);
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY(1,1),
    CustomerID INT NOT NULL,
    TableID INT NOT NULL,
    OrderDate DATETIME DEFAULT GETDATE(),
    Status NVARCHAR(50) DEFAULT 'Pending',
    TotalAmount DECIMAL(10,2),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (TableID) REFERENCES TableInfo(TableID)
);

CREATE TABLE OrderDetails (
    OrderDetailID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT NOT NULL,
    MenuItemID INT NOT NULL,
    Quantity INT NOT NULL,
    SubTotal DECIMAL(10,2),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (MenuItemID) REFERENCES MenuItems(MenuItemID)
);

CREATE TABLE TableInfo (
    TableID INT PRIMARY KEY IDENTITY(1,1),
    TableNumber NVARCHAR(10) NOT NULL,
    Capacity INT NOT NULL,
    QRCodePath NVARCHAR(255), -- QRコード画像のパス
    CreatedAt DATETIME DEFAULT GETDATE()
);
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);