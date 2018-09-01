// Variables
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("terminal-table");

//Create a connection with mysql
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected as ID " + connection.threadId);
  managerOptions();
});

//Allows User to end connection 
function endUserConnection() {
  inquirer
    .prompt({
      name: "finished",
      type: "list",
      message: "Are you ready to end your connection?",
      choices: ["YES", "NO"]
    })
    .then(function(answer) {
      if (answer.finished === "YES") {
        console.log("Ending Connection ID " + connection.threadId);
        console.log ("Connection Successfully Terminated");
        console.log("Have a great day!");
        connection.end();}
       else if (answer.finished === "NO") {
        managerOptions();
      }
    });
}

//Starts Options
function managerOptions() {
  inquirer
    .prompt({
      name: "options",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add a New Product"
      ]
    })
    .then(function(answer) {
      if (answer.options === "View Products for Sale") {
        productSale();
      } else if (answer.options === "View Low Inventory") {
        lowInventory();
      } else if (answer.options === "Add to Inventory") {
        addInventory();
      } else if (answer.options === "Add a New Product") {
        newProduct();
      }
    });
}
//Shows all products for sale
function productSale() {
  var displayTable = "SELECT * FROM products";
  connection.query(displayTable, function(err, res) {
    if (err) throw err;
    var t = new Table({
      borderStyle: 3,
      horizontalLine: true,
      width: [3],
      rightPadding: 5,
      leftPadding: 7,
      border: {
        sep: "U2551",
        topLeft: "U2554",
        topmid: "U2566",
        top: "U2550",
        topRight: "U2557",
        midLeft: "U2560",
        midMid: "U256C",
        mid: "U2550",
        midRight: "U2563",
        botLeft: "U255A",
        botMid: "U2569",
        bot: "U2550",
        botRight: "U255D"
      }
    });
    t.push(["Id", "Product", "Price", "Number in Stock"]),
      res.forEach(function(inventory) {
        t.push([
          inventory.ID,
          inventory.PRODUCT_NAME,
          "$" + inventory.PRICE,
          inventory.STOCK_QUANTITY
        ]);
      });
    console.log("" + t);
    endUserConnection();
  });
}
//Shows inventory with less then 5 in stock
function lowInventory() {
  var displayTable = "SELECT * FROM products WHERE STOCK_QUANTITY < 5";
  connection.query(displayTable, function(err, res) {
    if (err) throw err;
    var t = new Table({
      borderStyle: 3,
      horizontalLine: true,
      width: [3],
      rightPadding: 5,
      leftPadding: 7,
      border: {
        sep: "U2551",
        topLeft: "U2554",
        topmid: "U2566",
        top: "U2550",
        topRight: "U2557",
        midLeft: "U2560",
        midMid: "U256C",
        mid: "U2550",
        midRight: "U2563",
        botLeft: "U255A",
        botMid: "U2569",
        bot: "U2550",
        botRight: "U255D"
      }
    });
    t.push(["Id", "Product", "Price", "Number in Stock"]),
      res.forEach(function(inventory) {
        t.push([
          inventory.ID,
          inventory.PRODUCT_NAME,
          "$" + inventory.PRICE,
          inventory.STOCK_QUANTITY
        ]);
      });
    console.log("" + t);
    endUserConnection();
  });
}
//Adds inventory to table
function addInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    var itemsArray = [];
    for (var i = 0; i < res.length; i++) {
      itemsArray.push(res[i].PRODUCT_NAME);
    }
    inquirer
      .prompt([
        {
          name: "quantity",
          type: "input",
          message: "How much would you like to add?"
        },
        {
          name: "item",
          type: "input",
          message: "What item would you like to add quantities to?"
        }
      ])
      .then(function(answer) {
        var quantity;
        for (var i = 0; i < res.length; i++) {
          if (res[i].PRODUCT_NAME === answer.item) {
            quantity = res[i].STOCK_QUANTITY;
          }
        }
        connection.query(
          "UPDATE products SET? WHERE ?",
          [
            {
              STOCK_QUANTITY: quantity + parseInt(answer.quantity)
            },
            {
              PRODUCT_NAME: answer.item
            }
          ],
          function(err, res) {
            if (err) throw err;
            console.log(answer.quantity + " was added to " + answer.item);
            endUserConnection();
          }
        );
      });
  });
}
//Adds a new product to the table
function newProduct() {
  inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "Please enter the name of the product"
      },
      {
        name: "department",
        type: "input",
        message: "Please enter the department name of the product"
      },
      {
        name: "price",
        type: "input",
        message: "Please enter a price for the product"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to add?"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO products SET ?",
        {
          PRODUCT_NAME: answer.product,
          DEPARTMENT_NAME: answer.department,
          PRICE: answer.price,
          STOCK_QUANTITY: answer.quantity
        },
        function(err) {
          console.log("You have successfully added " + answer.product);
          endUserConnection();
        }
      );
    });
}