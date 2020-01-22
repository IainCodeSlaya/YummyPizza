CREATE PROCEDURE [dbo].[getCombo]
AS
BEGIN
	SET NOCOUNT ON;
	SELECT 
		Combo.Combo_ID, Combo.Combo_Name, Combo.Combo_Price, Pizza.Pizza_ID, Pizza.Pizza_Name, Size.*, Base.*, Extra.*
	FROM
		Combo, Pizza, Size, Base, Extra, ComboProduct
	WHERE
		ComboProduct.Pizza_ID = Pizza.Pizza_ID AND ComboProduct.Size_ID = Size.Size_ID
		AND ComboProduct.Base_ID = Base.Base_ID AND ComboProduct.Extra_ID = Extra.Extra_ID
		AND ComboProduct.Combo_ID = Combo.Combo_ID
		AND GETDATE() BETWEEN Combo.Combo_Start_Date AND Combo.Combo_End_Date
END
GO
