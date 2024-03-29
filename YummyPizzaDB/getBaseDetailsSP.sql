USE [PizzaShop]
GO
/****** Object:  StoredProcedure [dbo].[getBaseDetails]    Script Date: 2020/01/19 11:19:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[getBaseDetails]
AS
BEGIN
	SET NOCOUNT ON;
	SELECT 
		Base.Base_ID, Base.Base_Type, Price.Price_ID, Price.Price
	FROM
		Base, Base_Price, Price
	WHERE
		Base.Base_ID = Base_Price.Base_ID AND Price.Price_ID = Base_Price.Price_ID
		AND Base_Price_Date = (SELECT MAX(Base_Price.Base_Price_Date)
								FROM Base_Price)
END
