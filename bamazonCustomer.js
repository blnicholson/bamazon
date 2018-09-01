var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("terminal-table");

var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"password",
    database:"bamazon"
});
connection.connect(function(err){
    if(err) throw err;
    console.log("Connected as ID " + connection.threadId);
    showTable();  
})

function endUserConnection() {
    inquirer
      .prompt({
        name: "finished",
        type: "list",
        message: "Would you like to continue shopping?",
        choices: ["Continue Shopping", "No Thanks, I am done."]
      })
      .then(function(answer) {
        if (answer.finished === "No Thanks, I am done.") {
          console.log("Thank you for shopping at Bamazon!");
          console.log ("Your order will ship in 1 day.");
          console.log("Have a great day!");
          connection.end();}
         else if (answer.finished === "Continue Shopping") {
         showTable();
        }
      });
  }

function userQuestions(){
    inquirer.prompt([{
        name:"number",
        type:"input",
        message:"Please enter the ID of the product you would like to buy",
    },
    {
        name:"units",
        type:"input",
        message:"How many would you like to buy?",
    }
    ])
    .then(function(answer){
        var userChoice = answer.number;
        var userUnits = answer.units;
        var sql = "SELECT * FROM products WHERE ?";
        connection.query(sql, {id: userChoice}, function(err,res){
            if (res[0].STOCK_QUANTITY < userUnits){
                console.log ("Insufficient Quantity, Please re-enter a quantity");
                showTable();   
            }
            else{
                console.log("Your order is being processed....")
                console.log("Order successful!")
                var updateInventory = "UPDATE products SET ? WHERE ?";
                connection.query(updateInventory, [
                    {STOCK_QUANTITY: res[0].STOCK_QUANTITY-userUnits},
                    {id: userChoice}
                ])
                console.log("Your total is: $" + res[0].PRICE * userUnits);
                endUserConnection();
            }  

        });
    });   
}
function showTable() {
    var displayTable = "SELECT * FROM products";
    connection.query(displayTable,function(err, res) {
        if (err) throw err;
        var t = new Table({
            borderStyle:3,
            horizontalLine:true,
            width:[3],
            border:{
                sep:"U2551",
                topLeft:"U2554", topmid: "U2566", top:"U2550", topRight:"U2557",
                midLeft:"U2560", midMid:"U256C", mid:"U2550", midRight:"U2563",
                botLeft:"U255A", botMid:"U2569", bot:"U2550", botRight:'U255D'
            }
            
            
        });
        t.attrRange({row:[0,1]},
            {
              align:"center",
              color:"yellow"
        })
        t.attrRange({row:[1], column:[0,3]},
            {
              align:"center",
              color:"green"
        })
        t.push(["Id", "Product", "Price"]),
            res.forEach(function(inventory){
            t.push([inventory.ID, inventory.PRODUCT_NAME, "$"+ inventory.PRICE])
            });
    console.log("" + t);
    userQuestions();
    
});
}

  
