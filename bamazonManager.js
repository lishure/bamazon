// add the mysql dependency
var mysql = require('mysql')
//add inquirer
var inquirer = require('inquirer')
// create the mysql connection configuration for the bamazon database
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
// connect to the bamazon database
connection.connect(function (err) {
    if (err) throw err
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
            // based on their answer, run respective functions
            if (answer.options === 'View Products For Sale') {
                viewProducts();
            } else if (answer.options === 'View Low Inventory') {
                viewLow();
            } else if (answer.options === 'Add To Inventory') {
                addInventory();
            }
            else if (answer.options === 'Add New Product') {
                addNew();
            }
        })
}  
//function to view table of products
function viewProducts() {
    connection.query('SELECT sku,product_name,price,stock_quantity FROM products', function (err, res) {
        if (err) throw err
        console.table(res)
        connection.end()
    })  
}
//function to view stock quantity under than 5 units
function viewLow() {
    var query = 'SELECT sku,product_name,stock_quantity FROM products WHERE stock_quantity < 5'
    connection.query(query, function (err, res) {
        if (err) throw err
        console.table(res)
        connection.end()
    })
}
//function to replenish inventory
function addInventory() {
    inquirer.prompt([
        {
            name: 'needSku',
            message: 'What is the SKU of the product you wish to replenish?'
        }, {
            name: 'quantity',
            message: 'How many units would you like to add?'
        }
    ]).then(function (answers) {

        connection.query('SELECT stock_quantity,product_name FROM products WHERE sku=?', answers.needSku, function (err, results) {
            if (err) { console.log(err) };
  //add user input units to current stock quantity
            var replenish = parseInt(results[0].stock_quantity) + parseInt(answers.quantity);
            var pName = results[0].product_name;
  //updates stock quantity of product matching sku number
            connection.query('UPDATE products SET stock_quantity=? WHERE sku=?', [replenish, answers.needSku],
                function (err, results) {
                    if (err) { console.log(err) };
                    console.log(answers.quantity + " items added to " + pName)
                    viewProducts();
                })
        })
        return
    })
}
//function to add new product
function addNew() {
	// Prompt the user to enter information about the new product
	inquirer.prompt([
		{
			type: 'input',
			name: 'product_name',
			message: 'Please enter the name of the product you wish to add:',
		},
		{
			type: 'input',
			name: 'department_name',
			message: 'Which department does the new product belong to?',
		},
		{
			type: 'input',
			name: 'price',
			message: 'What is the price per item?',
		},
		{
			type: 'input',
			name: 'stock_quantity',
			message: 'How many items are being added?',		
		}
	]).then(function(input) {
		// Add new product to bamazon database
		connection.query('INSERT INTO products SET ?', input, function (error, results, fields) {
      if (error) throw error;
      console.log('New product has been added under SKU # ' + results.insertId + '.');
     //shows updated current items available
      viewProducts();
		});
  })
}