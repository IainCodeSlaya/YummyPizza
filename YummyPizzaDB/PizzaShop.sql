GO

IF EXISTS (SELECT name FROM sys.databases WHERE name = N'PizzaDB')
 DROP DATABASE PizzaDB
GO

CREATE DATABASE PizzaDB
GO

USE PizzaDB
GO

CREATE TABLE [Price] (
 [Price_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Price] decimal(18, 2)
);

INSERT INTO [dbo].[Price] VALUES (10.00)
INSERT INTO [dbo].[Price] VALUES (20.00)
INSERT INTO [dbo].[Price] VALUES (30.00)
INSERT INTO [dbo].[Price] VALUES (40.00)
INSERT INTO [dbo].[Price] VALUES (50.00)
INSERT INTO [dbo].[Price] VALUES (60.00)
INSERT INTO [dbo].[Price] VALUES (70.00)
INSERT INTO [dbo].[Price] VALUES (80.00)
INSERT INTO [dbo].[Price] VALUES (90.00)
INSERT INTO [dbo].[Price] VALUES (100.00)
INSERT INTO [dbo].[Price] VALUES (110.00)
INSERT INTO [dbo].[Price] VALUES (120.00)
INSERT INTO [dbo].[Price] VALUES (130.00)
INSERT INTO [dbo].[Price] VALUES (140.00)
INSERT INTO [dbo].[Price] VALUES (150.00)
INSERT INTO [dbo].[Price] VALUES (200.00)

CREATE TABLE [Base] (
 [Base_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Base_Type] varchar(20)
);

INSERT INTO [dbo].[Base] VALUES ('Thin')
INSERT INTO [dbo].[Base] VALUES ('Thick')

CREATE TABLE [Base_Price] (
 [Base_Price_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Base_ID] int FOREIGN KEY REFERENCES [Base]([Base_ID]),
 [Price_ID] int FOREIGN KEY REFERENCES [Price]([Price_ID]),
 [Base_Price_Date] date
);

INSERT INTO [dbo].[Base_Price] VALUES (1,1,'2019-09-03')
INSERT INTO [dbo].[Base_Price] VALUES (2,2,'2019-09-03')
--INSERT INTO [dbo].[Base_Price] VALUES (1,2,'2019-12-03')
--INSERT INTO [dbo].[Base_Price] VALUES (2,3,'2019-12-03')

CREATE TABLE [Size] (
 [Size_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Size_Desc] varchar(20)
);

INSERT INTO [dbo].[Size] VALUES ('Small')
INSERT INTO [dbo].[Size] VALUES ('Medium')
INSERT INTO [dbo].[Size] VALUES ('Large')

CREATE TABLE [Size_Price] (
 [Size_Price_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Size_ID] int FOREIGN KEY REFERENCES [Size]([Size_ID]),
 [Price_ID] int FOREIGN KEY REFERENCES [Price]([Price_ID]),
 [Size_Price_Date] date
);

INSERT INTO [dbo].[Size_Price] VALUES (1,2,'2019-09-03')
INSERT INTO [dbo].[Size_Price] VALUES (2,3,'2019-09-03')
INSERT INTO [dbo].[Size_Price] VALUES (3,4,'2019-09-03')
INSERT INTO [dbo].[Size_Price] VALUES (1,3,'2019-12-03')
INSERT INTO [dbo].[Size_Price] VALUES (2,4,'2019-12-03')
INSERT INTO [dbo].[Size_Price] VALUES (3,5,'2019-12-03')

CREATE TABLE [Topping] (
 [Topping_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Topping_Name] varchar(20)
);

INSERT INTO [dbo].[Topping] VALUES ('Bacon')
INSERT INTO [dbo].[Topping] VALUES ('Pineapple')
INSERT INTO [dbo].[Topping] VALUES ('Mozerella')
INSERT INTO [dbo].[Topping] VALUES ('Olives')
INSERT INTO [dbo].[Topping] VALUES ('Pepperoni')
INSERT INTO [dbo].[Topping] VALUES ('Chicken')
INSERT INTO [dbo].[Topping] VALUES ('Bacon')
INSERT INTO [dbo].[Topping] VALUES ('Mushrooms')
INSERT INTO [dbo].[Topping] VALUES ('Onions')
INSERT INTO [dbo].[Topping] VALUES ('Sausage')
INSERT INTO [dbo].[Topping] VALUES ('Green peppers')

CREATE TABLE [Topping_Price] (
 [Topping_Price_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Topping_ID] int FOREIGN KEY REFERENCES [Topping]([Topping_ID]),
 [Price_ID] int FOREIGN KEY REFERENCES [Price]([Price_ID]),
 [Topping_Price_Date] date
);

INSERT INTO [dbo].[Topping_Price] VALUES (1,1,'2019-12-03')
INSERT INTO [dbo].[Topping_Price] VALUES (2,1,'2019-12-03')
INSERT INTO [dbo].[Topping_Price] VALUES (3,1,'2019-12-03')
INSERT INTO [dbo].[Topping_Price] VALUES (4,1,'2019-12-03')
INSERT INTO [dbo].[Topping_Price] VALUES (5,1,'2019-12-03')
INSERT INTO [dbo].[Topping_Price] VALUES (6,1,'2019-12-03')
INSERT INTO [dbo].[Topping_Price] VALUES (7,1,'2019-12-03')
INSERT INTO [dbo].[Topping_Price] VALUES (8,1,'2019-12-03')
INSERT INTO [dbo].[Topping_Price] VALUES (9,1,'2019-12-03')
INSERT INTO [dbo].[Topping_Price] VALUES (10,1,'2019-12-03')
INSERT INTO [dbo].[Topping_Price] VALUES (11,1,'2019-12-03')

CREATE TABLE [Pizza] (
 [Pizza_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Pizza_Name] varchar(20),
 [Pizza_Desc] varchar(140)
);

INSERT INTO [dbo].[Pizza] VALUES ('Hawaiian','pineapple')
INSERT INTO [dbo].[Pizza] VALUES ('Pepperoni','pepperoni')
INSERT INTO [dbo].[Pizza] VALUES ('Greek','Posiedon')
INSERT INTO [dbo].[Pizza] VALUES ('Vegetarian','no meat')
INSERT INTO [dbo].[Pizza] VALUES ('Margherita','nothing')
INSERT INTO [dbo].[Pizza] VALUES ('Meat Lovers','meat')
INSERT INTO [dbo].[Pizza] VALUES ('Mexican','mince')
INSERT INTO [dbo].[Pizza] VALUES ('BBQ Chicken','bbq')
INSERT INTO [dbo].[Pizza] VALUES ('Triple Cheese','cheese')

CREATE TABLE [Pizza_Price] (
 [Pizza_Price_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Pizza_ID] int FOREIGN KEY REFERENCES [Pizza]([Pizza_ID]),
 [Price_ID] int FOREIGN KEY REFERENCES [Price]([Price_ID]),
 [Pizza_Price_Date] date
);

INSERT INTO [dbo].[Pizza_Price] VALUES (1,2,'2019-09-03')
INSERT INTO [dbo].[Pizza_Price] VALUES (2,3,'2019-09-03')
INSERT INTO [dbo].[Pizza_Price] VALUES (3,2,'2019-09-03')
INSERT INTO [dbo].[Pizza_Price] VALUES (4,2,'2019-09-03')
INSERT INTO [dbo].[Pizza_Price] VALUES (5,2,'2019-09-03')
INSERT INTO [dbo].[Pizza_Price] VALUES (6,2,'2019-09-03')
INSERT INTO [dbo].[Pizza_Price] VALUES (7,2,'2019-09-03')
INSERT INTO [dbo].[Pizza_Price] VALUES (8,2,'2019-09-03')
INSERT INTO [dbo].[Pizza_Price] VALUES (9,2,'2019-09-03')
INSERT INTO [dbo].[Pizza_Price] VALUES (1,3,'2019-12-03')
INSERT INTO [dbo].[Pizza_Price] VALUES (2,4,'2019-12-03')
INSERT INTO [dbo].[Pizza_Price] VALUES (3,3,'2019-12-03')
INSERT INTO [dbo].[Pizza_Price] VALUES (4,3,'2019-12-03')
INSERT INTO [dbo].[Pizza_Price] VALUES (5,3,'2019-12-03')
INSERT INTO [dbo].[Pizza_Price] VALUES (6,3,'2019-12-03')
INSERT INTO [dbo].[Pizza_Price] VALUES (7,3,'2019-12-03')
INSERT INTO [dbo].[Pizza_Price] VALUES (8,3,'2019-12-03')
INSERT INTO [dbo].[Pizza_Price] VALUES (9,3,'2019-12-03')

CREATE TABLE [Extra] (
 [Extra_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Extra_Name] varchar(20)
);

INSERT INTO [dbo].[Extra] VALUES ('Chicken wings')
INSERT INTO [dbo].[Extra] VALUES ('Chicken lasagna')
INSERT INTO [dbo].[Extra] VALUES ('Beef lasagna')
INSERT INTO [dbo].[Extra] VALUES ('Coke')
INSERT INTO [dbo].[Extra] VALUES ('fanta-orange')
INSERT INTO [dbo].[Extra] VALUES ('sprite')
INSERT INTO [dbo].[Extra] VALUES ('iced-tea')

CREATE TABLE [Extra_Price] (
 [Extra_Price_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Extra_ID] int FOREIGN KEY REFERENCES [Extra]([Extra_ID]),
 [Price_ID] int FOREIGN KEY REFERENCES [Price]([Price_ID]),
 [Extra_Price_Date] date
);

INSERT INTO [dbo].[Extra_Price] VALUES (1,6,'2019-09-03')
INSERT INTO [dbo].[Extra_Price] VALUES (2,8,'2019-09-03')
INSERT INTO [dbo].[Extra_Price] VALUES (3,9,'2019-09-03')
INSERT INTO [dbo].[Extra_Price] VALUES (4,2,'2019-09-03')
INSERT INTO [dbo].[Extra_Price] VALUES (5,2,'2019-09-03')
INSERT INTO [dbo].[Extra_Price] VALUES (6,2,'2019-09-03')
INSERT INTO [dbo].[Extra_Price] VALUES (7,2,'2019-09-03')

CREATE TABLE [Combo] (
 [Combo_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Combo_Name] varchar(50),
 [Combo_Price] decimal(18, 2),
 [Combo_Start_Date] date,
 [Combo_End_Date] date
);

INSERT INTO [dbo].[Combo] VALUES ('Student Special',100.00,'2019-09-03','2020-12-03')
INSERT INTO [dbo].[Combo] VALUES ('Chicken and Wings',120.00,'2019-09-03','2019-12-03')
INSERT INTO [dbo].[Combo] VALUES ('PayDay',185.00,'2019-09-03','2019-12-03')
INSERT INTO [dbo].[Combo] VALUES ('Go Big or Go Home',280.00,'2019-09-03','2019-12-03')
INSERT INTO [dbo].[Combo] VALUES ('Workers Special',100.00,'2019-09-03','2020-06-23')
INSERT INTO [dbo].[Combo] VALUES ('Dem Wingz',120.00,'2019-09-03','2020-03-07')
INSERT INTO [dbo].[Combo] VALUES ('The Islander',185.00,'2019-09-03','2020-01-29')
INSERT INTO [dbo].[Combo] VALUES ('Meaty Special',220.00,'2019-09-03','2020-02-05')

CREATE TABLE [ComboProduct] (
 [ComboProduct_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Combo_ID] int FOREIGN KEY REFERENCES [Combo]([Combo_ID]),
 [Pizza_ID] int FOREIGN KEY REFERENCES [Pizza]([Pizza_ID]),
 [Size_ID] int FOREIGN KEY REFERENCES [Size]([Size_ID]),
 [Base_ID] int FOREIGN KEY REFERENCES [Base]([Base_ID]),
 [Extra_ID] int FOREIGN KEY REFERENCES [Extra]([Extra_ID])
);

INSERT INTO [dbo].[ComboProduct] VALUES (1,1,1,1,1)
INSERT INTO [dbo].[ComboProduct] VALUES (2,2,2,1,1)
INSERT INTO [dbo].[ComboProduct] VALUES (3,3,3,2,1)
INSERT INTO [dbo].[ComboProduct] VALUES (4,2,3,2,1)
INSERT INTO [dbo].[ComboProduct] VALUES (5,9,3,2,4)
INSERT INTO [dbo].[ComboProduct] VALUES (6,2,3,1,1)
INSERT INTO [dbo].[ComboProduct] VALUES (7,1,3,1,7)
INSERT INTO [dbo].[ComboProduct] VALUES (8,6,3,2,3)