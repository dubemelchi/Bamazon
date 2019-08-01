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

function runAskUser () {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    console.log("Bamazon")
    console.log("--------")

    for (var i = 0; i < res.length; i++) {
      console.log("Item Id: " + res[i].item_id);
      console.log("Item: " + res[i].product_name);
      console.log("Department: " + res[i].department_name);
      console.log("Price: " + res[i].price);
    }
  })
}