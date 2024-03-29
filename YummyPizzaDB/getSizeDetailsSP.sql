USE [PizzaShop]
GO
/****** Object:  StoredProcedure [dbo].[getSizeDetails]    Script Date: 2020/01/19 11:21:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[getSizeDetails]
AS
BEGIN
	SET NOCOUNT ON;
	SELECT 
		Size.Size_ID, Size.Size_Desc, Price.Price_ID,Price.Price
	FROM
		Size, Size_Price, Price
	WHERE
		Size.Size_ID = Size_Price.Size_ID AND Price.Price_ID = Size_Price.Price_ID
		AND Size_Price_Date = (SELECT MAX(Size_Price.Size_Price_Date)
								FROM Size_Price)
END
