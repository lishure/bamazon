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
//to add a product 
//connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity)
//VALUES (?, ?, ?, ?)', [c,g,1,4], function (one connection query) ) 