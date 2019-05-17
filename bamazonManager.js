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
    connection.query('SELECT sku,product_name,price,stock_quantity FROM products', function (err, res) {
        if (err) throw err
        console.table(res)
        // for (var i = 0; i < res.length; i++) {
        //     console.log(
        //         'SKU: ' +
        //         res[i].sku +
        //         ' || Product: ' +
        //         res[i].product_name +
        //         ' || Price: ' +
        //         res[i].price +
        //         ' || Quantity: ' +
        //         res[i].stock_quantity
        //     )
        // }
        connection.end()
    })
    
}

function viewLow() {
    var query = 'SELECT sku,product_name,stock_quantity FROM products WHERE stock_quantity <= 50'
    connection.query(query, function (err, res) {
        if (err) throw err
        console.table(res)
        //   for (var i = 0; i < res.length; i++) {
        //     console.log(res[i])
        //   }
        connection.end()

    })
}

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
            var replenish = parseInt(results[0].stock_quantity) + parseInt(answers.quantity);
            var pName = results[0].product_name;
            
            connection.query('UPDATE products SET stock_quantity=? WHERE sku=?', [replenish, answers.needSku],
                function (err, results) {
                    if (err) { console.log(err) };
                    console.log(answers.quantity + " items added to " + pName)
                    connection.end();   
                })
        })
        return
    })
}


function addNew() {
	// console.log('___ENTER createNewProduct___');

	// Prompt the user to enter information about the new product
	inquirer.prompt([
		{
			type: 'input',
			name: 'product_name',
			message: 'Please enter the new product name.',
		},
		{
			type: 'input',
			name: 'department_name',
			message: 'Which department does the new product belong to?',
		},
		{
			type: 'input',
			name: 'price',
			message: 'What is the price per unit?',
		
		},
		{
			type: 'input',
			name: 'stock_quantity',
			message: 'How many items are in stock?',
		
		}
	]).then(function(input) {
		// console.log('input: ' + JSON.stringify(input));

		console.log('Adding New Item: \n    product_name = ' + input.product_name + '\n' +  
									   '    department_name = ' + input.department_name + '\n' +  
									   '    price = ' + input.price + '\n' +  
									   '    stock_quantity = ' + input.stock_quantity);

		// Create the insertion query string
		var queryStr = 'INSERT INTO products SET ?';

		// Add new product to the db
		connection.query(queryStr, input, function (error, results, fields) {
			if (error) throw error;

			console.log('New product has been added to the inventory under Item ID ' + results.insertId + '.');
			console.log("\n---------------------------------------------------------------------\n");

			// End the database connection
			connection.end();
		});
  })
}