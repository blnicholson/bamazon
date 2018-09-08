CREATE DATABASE Bamazon;

USE Bamazon;
 
CREATE TABLE products(
 Item_Id INT(10) NOT NULL AUTO_INCREMENT,
 Product_Name VARCHAR(50) NOT NULL,
 Department_Name VARCHAR(50) NOT NULL,
 Price DECIMAL(10,2) NOT NULL,
 Stock_Quantity INT(10) NOT NULL,
 PRIMARY KEY (Item_Id)
 );

INSERT INTO products(Product_Name, Department_Name, Price, Stock_Quantity)
VALUES("Fall Out 4", "Video Games", 59.99, 13),
	  ("Nintendo Switch", "Consoles", 299.99, 10),
      ("Nuka Cola Bottle Lamp", "Collectibles", 29.99, 5),
      ("Destiny 2", "Video Games", 59.99, 25),
      ("Super Nintendo Entertainment System", "Consoles", 399.99, 3),
      ("Half-Life", "Video Games", 29.99, 17),
      ("Sega Genesis", "Consoles", 399.99, 4),
      ("Sonic the Hedgehog", "Video Games", 79.99, 3),
      ("Astro50 Headset", "Accessories", 299.99, 10),
      ("Minecraft PC", "Video Games", 29.99, 19),
      ("Pip-Boy Black Hoodie", "Apparel", 59.99, 7),
      ("Playstation 4 Pro", "Consoles", 499.99, 15),
      ("Fall-Out Nuka Cola Ball Cap", "Apparel", 19.99, 15),
      ("SNES Controller", "Accessories", 19.99, 5),
      ("Destiny New Monarchy Watch", "Apparel", 15.99, 18),
      ("The Legend of Zelda Heart Lamp", "Collectibles", 17.99, 9),
      ("Dead Cells", "Video Games", 29.99, 25),
      ("Blue Pac-Man Ghost Nightlight", "Collectibles", 9.99, 15),
      ("Animal Crossing", "Video Games", 29.99, 19),
      ("Xbox X", "Consoles",399.99, 15),
      ("Nintendo Switch Carrying Case", "Accessories",25.99,2),
      ("Super Mario Question Block Bank", "Collectibles", 21.99, 25),
      ("Super Mario World", "Video Games", 59.99, 6),
      ("Game Boy 3DS", "Consoles", 199.99, 17),
      ("Harry Potter Potion Bottle", "Collectibles", 19.99, 32),
      ("Xbox Scruff Controller", "Accessories", 199.99, 15);
      
      
      