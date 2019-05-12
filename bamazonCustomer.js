// add the mysql dependency
var mysql = require('mysql')

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
  connection.end();
})