var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
 host: "localhost",

 // my port; 8889 for mac
 port: 8889,

 // username
 user: "root",

 // password son!
 password: "password",
 database: "bamazon"
});

connection.connect(function(err) {
 if (err) throw err;
 console.log("connected as id " + connection.threadId + "\n");

 runAskUser()
 
});

function runAskUser() {

 console.log("selecting all products...\n");
 connection.query("SELECT * FROM products",
 function(err, res) {
  if (err) throw err;

  //console.log("item_id: " + res[0].item_id + " || product_name: " + res[0].product_name + " || price: " + res[0].price);
  console.log(res);
  //connection.end();
 });

 inquirer
  .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "purchase a product?",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "purchase a product?":
        purchaseItem();
        break;
      
        case "exit":
          connection.end();
          break;
      }
    });
}

function purchaseItem() {
  inquirer
    .prompt({
      name:"item_id",
      type: "input",
      message: "what is the item_id of the product you would like to buy?",
    })
  
}

