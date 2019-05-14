// add the mysql dependency
var mysql = require('mysql')
//add inquirer
var inquirer = require('inquirer')
// create the mysql connection configuration for the `ice_creamDB` database
var connection = mysql.createConnection({
    host: 'localhost',
    // Your port; if not 3306
    port: 3306,
    // Your sql username
    user: 'lishure',
    // Your password
    password: '',
    database: 'bamazon'
})

// connect to the `ice_creamDB` database
connection.connect(function (err) {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)
    start()
})
// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: 'options',
            type: 'list',
            message: 'Would would you like to do?',
            choices: ['View Products For Sale', 'View Low Inventory', 'Add To Inventory', 'Add New Product']
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.options === 'View Products For Sale') {
                viewProducts()
            } else if (answer.options === 'View Low Inventory') {
                viewLow()
            } else if (answer.options === 'Add To Inventory') {
                addInventory()
            }
            else if (answer.options === 'Add New Product') {
                addNew()
            }
            // else {
            //     connection.end()
            // }
        })
}

function viewProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            console.log(
                'SKU: ' +
                res[i].sku +
                ' || Product: ' +
                res[i].product_name +
                ' || Price: ' +
                res[i].price +
                ' || Quantity: ' +
                res[i].stock_quantity
            )
        }
    })
}

function viewLow () {
    console.log("view low")
    var query = 'SELECT product_name FROM products GROUP BY product_name HAVING count(*) > 1'
    connection.query(query, function (err, res) {
      if (err) throw err
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].product_name)
      }
    
    })
  }