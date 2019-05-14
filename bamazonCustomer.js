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
  //console.log('connected as id ' + connection.threadId)
  choices();
})

function choices () {
    connection.query('SELECT * FROM products', function (err, res) {
      if (err) throw err
      for (var i = 0; i < res.length; i++) {
        console.log(
            'SKU: ' +
              res[i].sku +
              ' || Product: ' +
              res[i].product_name +
              ' || Price: ' +
              res[i].price
          )
      }
      askQuestion();
    })
    
  }

  class Question {
    constructor (name, quantity) {
      this.name = name
      this.quantity = quantity
    }
    // creates the printInfo method and applies it to all programmer objects
    printInfo () {
      console.log(` ****
    SKU: ${this.name}
    Quantity: ${this.quantity}
      `)
    };
  }
  // runs inquirer and asks the user a series of questions whose replies are
  // stored within the variable answers inside of the .then statement
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
    // initializes the variable newProgrammer to be a programmer object which will take
    // in all of the user's answers to the questions above
    var newQuestion = new Question(answers.name, answers.quantity)
    var quantityNeeded = answers.quantity;
 	var skuRequested = answers.name;
 	checkInventory(skuRequested, quantityNeeded);
    // printInfo method is run to show that the newProgrammer object was successfully created and filled
    newQuestion.printInfo();
    checkInventory();
  })
}

function checkInventory(skuRequested, quantityNeeded) {
    connection.query('SELECT * FROM products WHERE sku=' + skuRequested, function (err, res) {
        if(err){console.log(err)};
            if (quantityNeeded <= `${this.stock_quantity}`) {
                console.log(`You have purchased ${this.quantity}`)
            }
            else {
                console.log("Order can not be placed; Insufficient Quantity")
            } 

        }
      )
      connection.end();
}