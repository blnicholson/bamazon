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
                console.log ("Insufficient Quantity, Please re-enter a quantity")
                showTable();   
            }
            else{
                console.log("You order was successful!")
                var updateInventory = "UPDATE products SET ? WHERE ?";
                connection.query(updateInventory, [
                    {STOCK_QUANTITY: res[0].STOCK_QUANTITY-userUnits},
                    {id: userChoice}
                ])
                console.log("Your total is: $" + res[0].PRICE * userUnits);
                connection.end();
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
            rightPadding:5,
            leftPadding:7,
            border:{
                sep:"U2551",
                topLeft:"U2554", topmid: "U2566", top:"U2550", topRight:"U2557",
                midLeft:"U2560", midMid:"U256C", mid:"U2550", midRight:"U2563",
                botLeft:"U255A", botMid:"U2569", bot:"U2550", botRight:'U255D'
            }
            
        });
        t.push(["Id", "Product", "Price"]),
            res.forEach(function(inventory){
            t.push([inventory.ID, inventory.PRODUCT_NAME, "$"+ inventory.PRICE])
            });
    console.log("" + t);
    userQuestions();
    
});
}

  
