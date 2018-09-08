var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("terminal-table");

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
  showTable();
});

function endUserConnection() {
  inquirer
    .prompt({
      name: "finished",
      type: "list",
      message: "Would you like to continue shopping?",
      choices: ["Yes, Continue Shopping", "No Thanks, I'm done."]
    })
    .then(function(answer) {
      if (answer.finished === "No Thanks, I'm done.") {
        console.log("Thank you for shopping at Bamazon!");
        console.log("Your order will ship in 1 day.");
        console.log("Have a great day!");
        connection.end();
      } 
      else if (answer.finished === "Yes, Continue Shopping") {
        showTable();
      }
    });
}

function userQuestions() {
  inquirer
    .prompt([
      {
        name: "number",
        type: "input",
        message: "Please enter the Item_Id of the product you would like to buy"
      },
      {
        name: "units",
        type: "input",
        message: "How many would you like to buy?"
      }
    ])
    .then(function(answer) {
      var userChoice = answer.number;
      var userUnits = answer.units;
      var sql = "SELECT * FROM products WHERE ?";

      //Checking Sufficient Stock
      connection.query(sql, { Item_Id: userChoice }, function(err, res) {
        if (res[0].Stock_Quantity < userUnits) {
          console.log("Insufficient Quantity, Please re-enter a quantity");
          showTable();
        } 
        else {
          department = res[0].Department_Name;
          console.log("Your order is being processed....");
          console.log("Order successful!");
          //Update Inventory once purchased
          var updateInventory = "UPDATE products SET ? WHERE ?";
          //var total = res[0].Price * userUnits;
          connection.query(updateInventory, [
            { Stock_Quantity: res[0].Stock_Quantity - userUnits },
            { Item_Id: userChoice }
          ]);
           console.log("Your total is $" + res[0].Price);
           endUserConnection();
          
          }
      });
          
        
    });
}


function showTable() {
  var displayTable = "SELECT * FROM products";
  connection.query(displayTable, function(err, res) {
    if (err) throw err;
    var t = new Table({
      borderStyle: 3,
      horizontalLine: true,
      rightPadding: 3,
      leftPadding: 3,
      width: [25]
    });
    t.attrRange(
      { row: [0, 1] },
      {
        align: "center",
        color: "yellow"
      }
    );
    t.attrRange(
      { row: [1], column: [0, 3] },
      {
        align: "center",
        color: "green"
      }
    );
    t.push(["Id", "Product", "Price"]),
      res.forEach(function(inventory) {
        t.push([inventory.Item_Id, inventory.Product_Name, "$" + inventory.Price]);
      });
    console.log("" + t);
    userQuestions();
  });
}
