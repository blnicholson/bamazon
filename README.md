# Bamazon
## **Overview** 
This is a simple CLI application that utilizes two interfaces:**customer interface** and **manager interface**.  The customer interface will allow the user to "buy" an item from an Amazon like storefront.  The manager interface allows the user to view inventory, view low inventory, add inventory, add a new product, and delete a product. 

## **Setup MySQL Database**
Before you can run this application, you will need to setup a database using MySQL.  If you need to install MySQL on your machine, visit: [MySQL Installation.](https://dev.mysql.com/downloads/windows/installer/8.0.html)  Once MySQL is installed, you will be able to create the Bamazon database with the code found in bamazon.sql. You will need to access the Bamazon.sql file and import it in MySql.  This will allow you access to the database. 

## **Instructions to Run App**
You will need to clone the github repo by using this link: [Bamazon Repo](https://github.com/blnicholson/bamazon.git).  Once the repo is cloned, you will need to open your terminal and run npm install.  This will install all of the npm packages used in the app. There are two options to start the application: The Customer Interface and the Manager Interface.

## **Customer Interface**
The following steps are used to access the Customer Interface:

*Open terminal
*CD into bamazon directory
*Type node bamazonCustomer.js

From here a table will populate that shows all of the items that are currently for sale.  You will be given an option to enter the id of the item you would like to buy.  Then you will be given an option to enter the quantity of that item.  If there is enough of the item in stock, the transaction will be successful and a price will be given.  If there is not enough of the item in stock, then you will be prompted to try your transaction again. After that you will be prompted to either continue shopping or leave the program. 

![Table](/images/customerOptions.png)
