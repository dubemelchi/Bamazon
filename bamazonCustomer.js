var mysql = require("mysql");

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
 displayProducts();
});

function displayProducts() {
 console.log("selecting all products...\n");
 connection.query("SELECT * FROM products",
 function(err, res) {
  if (err) throw err;

  console.log(res);
  connection.end();
 });
}