USE [master]
GO

IF EXISTS (SELECT name FROM sys.databases WHERE name = N'PizzaShop')
 DROP DATABASE PizzaShop
GO

CREATE DATABASE PizzaShop
GO

USE PizzaShop
GO

CREATE TABLE [Company]  (
  [Company_ID] int IDENTITY(1,1) PRIMARY KEY not null,
  [Company_Name] varchar(50) not null,
  [Company_Address] varchar(50) not null,
  [Company_Contact] varchar(20) not null,
  [Account_Name] varchar(50) not null,
  [Acount_Number] varchar(50) not null,
  [Account_Type] varchar(50) not null,
  [Account_Branch] varchar(50) not null,
  [Account_Bramch_Code] varchar(50) not null,
  [Owner_Email] varchar(50) not null
);

INSERT INTO [dbo].[Company] VALUES ('Just-Around-the-corner','10 Dolweni Avenue Randburg','0791060843', 'swiss','15151515','business account','Hatfield Branch','15749','Ageleptic@yummyPizza.com')

CREATE TABLE [User] (
 [User_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Last_Login] numeric,
 [Email] varchar(50),
 [User_Password] varchar(20)
);

INSERT INTO [dbo].[User] VALUES (02052019,'MalokaD@AnalysisD.com','doreenisthebest')
INSERT INTO [dbo].[User] VALUES (02052019,'MalokaD@icloud.com','iainisaclosesecond')
INSERT INTO [dbo].[User] VALUES (02052019,'MalokaD@icloud.com','iainisaclosesecond')
INSERT INTO [dbo].[User] VALUES (02052019,'MalokaD@icloud.com','iainisaclosesecond')
INSERT INTO [dbo].[User] VALUES (02052019,'MalokaD@icloud.com','iainisaclosesecond')
INSERT INTO [dbo].[User] VALUES (02052019,'MalokaD@icloud.com','iainisaclosesecond')

CREATE TABLE [Gender] (
 [Gender_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Gender_Descr] varchar(50)
);

INSERT INTO [dbo].[Gender] VALUES ('Male')
INSERT INTO [dbo].[Gender] VALUES ('Female')


CREATE TABLE [Employee_Type] (
 [Emp_Type_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Emp_Type_Name] varchar(20)
);

INSERT INTO [dbo].[Employee_Type] VALUES ('Manager')
INSERT INTO [dbo].[Employee_Type] VALUES ('Cashier')
INSERT INTO [dbo].[Employee_Type] VALUES ('Kitchen Staff')

CREATE TABLE [Employee] (
 [Employee_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Emp_Name] varchar(50),
 [Emp_Surname] varchar(50),
 [Emp_Email] varchar(50),
 [Emp_Address] varchar(50),
 [Emp_Contact] varchar(50),
 [Emp_ID_Number] numeric(13),
 [User_ID] int FOREIGN KEY REFERENCES [User]([User_ID]),
 [Gender_ID] int FOREIGN KEY REFERENCES [Gender]([Gender_ID]),
 [Emp_Type_ID] int FOREIGN KEY REFERENCES [Employee_Type]([Emp_Type_ID])
);

INSERT INTO [dbo].[Employee] VALUES ('Doreen',' Maloka','dmaloka@gmail.com','1260 Prospect street Hatfield','0721756659','9103160378082',1,2,1)
INSERT INTO [dbo].[Employee] VALUES ('Isaack',' Buti','Isaack@gmail.com','1550 Prospect street Hatfield','0735656998','9503160378082',2,1,2)
INSERT INTO [dbo].[Employee] VALUES ('Brilliant',' Marintjie','Brilliant@gmail.com','1325 Prospect street Hatfield','0789965447','9803160378082',3,2,2)
INSERT INTO [dbo].[Employee] VALUES ('Pontsho',' Kekae','Pontsho@gmail.com','1260 Prospect street Hatfield','0792420731','9203160378082',4,2,2)
INSERT INTO [dbo].[Employee] VALUES ('Joshua',' Moleko','Moleko@gmail.com','1260 Prospect street Hatfield','0793363515','9703160378082',5,1,2)
INSERT INTO [dbo].[Employee] VALUES ('Waka',' Wagage','waka@gmail.com','1260 Prospect street Hatfield','0731725902','9303160378082',6,1,3)

CREATE TABLE [Shift] (
 [Shift_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Shift_Descr] varchar(50),
 [Shift_Date] varchar(50),
 [Shift_start_Time] varchar(50),
 [Shift_End_Time] varchar(50),
 [Shift_Duration] numeric
 --[Employee_ID] int FOREIGN KEY REFERENCES [Employee]([Employee_ID])
);

INSERT INTO [dbo].[Shift] VALUES ('Monday early','02-12-2020','07:00','12:00',5)
INSERT INTO [dbo].[Shift] VALUES ('Monday lunch','02-12-2020','12:00','17:00',5)
INSERT INTO [dbo].[Shift] VALUES ('Monday late','02-12-2020','17:00','23:00',5)
INSERT INTO [dbo].[Shift] VALUES ('Tuesday early','03-12-2020','07:00','12:00',5)

CREATE TABLE [Employee_Shift] (
 [Emp_Shift_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Shift_ID] int FOREIGN KEY REFERENCES [Shift]([Shift_ID]),
 [Employee_ID] int FOREIGN KEY REFERENCES [Employee]([Employee_ID]),
 [Emp_Total_hours] numeric
);

INSERT INTO [dbo].[Employee_Shift] VALUES (1,1,5)

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
INSERT INTO [dbo].[Base_Price] VALUES (1,2,'2019-12-03')
INSERT INTO [dbo].[Base_Price] VALUES (2,3,'2019-12-03')

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
INSERT INTO [dbo].[Extra] VALUES ('beef lasagna')
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


CREATE TABLE [PMethod] (
 [PMethod_ID] int IDENTITY(1,1) PRIMARY KEY,
 [PMethod_Descr] varchar (50)
);

INSERT INTO [dbo].[PMethod] VALUES ('Credit Card')
INSERT INTO [dbo].[PMethod] VALUES ('Cash')
INSERT INTO [dbo].[PMethod] VALUES ('Debit Card')

CREATE TABLE [VAT] (
 [Vat_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Vat_Percent] numeric
);

INSERT INTO [dbo].[VAT] VALUES (15)

CREATE TABLE [Order_Type] (
 [Order_Type_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Order_Type] varchar(20)
);

INSERT INTO [dbo].[Order_Type] VALUES ('Counter')
INSERT INTO [dbo].[Order_Type] VALUES ('Take Away')

CREATE TABLE [Order_Status] (
 [Order_Status_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Status] varchar(20)
);

INSERT INTO [dbo].[Order_Status] VALUES ('Preparing')
INSERT INTO [dbo].[Order_Status] VALUES ('Ready')
INSERT INTO [dbo].[Order_Status] VALUES ('collected')
INSERT INTO [dbo].[Order_Status] VALUES ('Started')

CREATE TABLE [Order] (
 [Order_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Order_No] numeric,
 [Order_Status_ID] int FOREIGN KEY REFERENCES [Order_Status]([Order_Status_ID]),
 [Order_Type_ID] int FOREIGN KEY REFERENCES [Order_Type]([Order_Type_ID]),
 [Order_Date] Varchar(32),
 [OTotal] decimal(18, 2) NULL,
 [Emp_Shift_ID] int FOREIGN KEY REFERENCES [Employee_Shift]([Emp_Shift_ID]),
 [User_ID] int FOREIGN KEY REFERENCES [User]([User_ID])
);


INSERT INTO [dbo].[Order] VALUES (1,1,1,'2020-01-22',45.5,1,1)
INSERT INTO [dbo].[Order] VALUES (2,1,2,'2020-01-22',550,1,1)
INSERT INTO [dbo].[Order] VALUES (3,3,1,'2020-01-22',5.5,1,1)
INSERT INTO [dbo].[Order] VALUES (4,1,2,'2020-01-22',580,1,1)
INSERT INTO [dbo].[Order] VALUES (5,3,1,'2020-01-22',42.5,1,1)
INSERT INTO [dbo].[Order] VALUES (6,3,2,'2020-01-22',120,1,1)
INSERT INTO [dbo].[Order] VALUES (7,2,1,'2020-01-22',32.5,1,1)
INSERT INTO [dbo].[Order] VALUES (8,2,2,'2020-01-22',5,1,1)
INSERT INTO [dbo].[Order] VALUES (9,1,1,'2020-01-22',1000,1,1)
INSERT INTO [dbo].[Order] VALUES (10,3,2,'2020-01-22',890,1,1)


CREATE TABLE [OrderItem] (
 [OrderItem_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Order_ID] int FOREIGN KEY REFERENCES [Order]([Order_ID]),
 [Topping_ID] int FOREIGN KEY REFERENCES [Topping]([Topping_ID]),
 [Pizza_ID] int FOREIGN KEY REFERENCES [Pizza]([Pizza_ID]),
 [Size_ID] int FOREIGN KEY REFERENCES [Size]([Size_ID]),
 [Base_ID] int FOREIGN KEY REFERENCES [Base]([Base_ID]),
 [Extra_ID] int FOREIGN KEY REFERENCES [Extra]([Extra_ID]),
 [Combo_ID] int FOREIGN KEY REFERENCES [Combo]([Combo_ID]),
 [Order_Quantity] numeric
);

INSERT INTO [dbo].[OrderItem] VALUES (1,null,null,null,null,null,3,4)
INSERT INTO [dbo].[OrderItem] VALUES (1,null,null,null,null,null,2,1)
INSERT INTO [dbo].[OrderItem] VALUES (1,null,null,null,null,null,3,3)
INSERT INTO [dbo].[OrderItem] VALUES (1,null,null,null,null,null,2,2)

CREATE TABLE [Invoice] (
 [Invoice_ID] int IDENTITY(1,1) PRIMARY KEY,
 [Subtotal] numeric,
 [Invoice_Total] numeric,
 [Amount_Tendered] numeric,
 [Change] numeric,
 [VAT_ID] int FOREIGN KEY REFERENCES [VAT]([VAT_ID]),
 [Order_ID] int FOREIGN KEY REFERENCES [Order]([Order_ID]),
 [PMethod_ID] int FOREIGN KEY REFERENCES [PMethod]([PMethod_ID])
);

INSERT INTO [dbo].[Invoice] VALUES (100,1000,1200,200,1,1,1)

