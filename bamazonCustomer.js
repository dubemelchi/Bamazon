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

connection.connect(function (err) {
 if (err) throw err;
 console.log("connected as id " + connection.threadId + "\n");

 promptUser();
 
});

function promptUser() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "make a purchase.",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "make a purchase.":
        showInventory();
          break;

      case "exit":
        connection.end();
        break;
      }
    });
}


function showInventory () {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    console.log("Bamazon")
    console.log("--------")

    for (var i = 0; i < res.length; i++) {
      console.log("Item Id: " + res[i].item_id);
      console.log("Item: " + res[i].product_name);
      console.log("Department: " + res[i].department_name);
      console.log("Price: $" + res[i].price);
    }

    askUser();
    
  });

}

function askUser() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    inquirer.prompt([
      {
        name: "askId",
        type: "input",
        message: "Please enter ID of Item you'd like to buy.",
    },

  {
    name: "quantity",
    type: "input",
    message: "Please enter how many.",
  },


])
  .then (function (answers) {
    var query = "SELECT * FROM products WHERE ?";
    connection.query(query, {item_id: answers.askId}, function (err, res) {

      var itemQuantity = res[0].stock_quantity;
      var userQuantity = answers.quantity;

      if (itemQuantity >= userQuantity) {

        var updatedStock = itemQuantity - userQuantity;
        var totalPrice = res[0].price * userQuantity;
        var itemPurchased = res[0].product_name;

        console.log("Total price: " + totalPrice);

        connection.query("UPDATE products SET ? WHERE ?", [
          {
            stock_quantity: updatedStock
          },
          {
            item_id: answers.askId
          }
        ],
          function (error) {

            if (error) throw err;

            console.log("summary:");
            console.log("Items purchased: " + itemPurchased);
            console.log("Quantity: " + userQuantity);
            console.log("Total: $" + totalPrice);

            promptUser();
          }
        
        );
      } else {

        console.log("------------");
        console.log("Out of stock");
        
        promptUser();
      }
    });
  });
  });
}