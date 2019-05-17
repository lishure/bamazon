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
    choices();
})
//This function shows table of items available
function choices() {
    connection.query('SELECT sku,product_name,price,stock_quantity FROM products', function (err, res) {
        if (err) throw err
        console.table(res)
        askQuestion();
    })
}
// runs inquirer and asks the user a series of questions whose replies are stored within the variable answers inside of the .then statement
function askQuestion() {
    inquirer.prompt([
        {
            name: 'name',
            message: 'What is the SKU of the product you wish to purchase?'
        }, {
            name: 'quantity',
            message: 'How many units would you like to purchase?'
        }
    ]).then(function (answers) {
        // initializes the variable newProgrammer to be a programmer object which will take in all of the user's answers to the questions above
        connection.query('SELECT * FROM products WHERE sku=?', answers.name, function (err, results) {
            if (err) { console.log(err) };
            if (answers.quantity <= results[0].stock_quantity) {
                var totalCost = results[0].price * answers.quantity;
                console.log(`Your total for ${answers.quantity} ${results[0].product_name} comes up to $${totalCost}.`)
                var difference = results[0].stock_quantity - answers.quantity        
                //Need to update stock quantity
                connection.query('UPDATE products SET stock_quantity=? WHERE sku=?', [difference, answers.name],    
                function (err, results) { 
                        if (err) { console.log(err) };
                        connection.end();
                    })
            }
            else {
                console.log("Order can not be placed; Insufficient Quantity")
            }
        }
        )
        

    })
}



