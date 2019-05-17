Bamazon is a MySQL & Node Application that acts as an Amazon-like storefront that uses npm inquirer and npm mysql package as well as mysql database.

The Bamazon application allows the user to view the current inventory of store items: SKU#, product name, price, and stock quantity. The user is then able to purchase one of the existing items by entering the SKU# and the desired quantity. If the item is currently in stock, the user's order is fulfilled and display the total price and update the database stock quantity. If the desired quantity is not available, the user will receive an "Insufficient Quantity" notice and not be able to place the order.

The Bamazon application takes in 2 node applications: Customer and Manager 

Customer:

To view available products for sale and to place an order, simply open up the terminal and type in "node bamazonCustomer.js":
![customerjs example](Screenshots/PurchaseItem.png)

Manager:

To view, replenish, or add products, simple open up the terminal and type in "node bamazonManager.js".

The manager application offers 4 options:
>View Products for Sale
>View Low Inventory
>Add to Inventory
>Add New Product
>>Insert Manager SS here<<

Utilizing the arrow keys, you can select one of the 4 options. 

Selecting "View Products for Sale" displays the database of all products.
>>Insert ViewProducts<<

Selecting "View Low Inventory" would show products that have less than 5 in stock.
>>Insert ViewLow<<

Selecting "Add to Inventory" would allow user to replenish stock by inputting the SKU# and the quantity to be added.
>>Insert addInventory<<

Selecting "Add New Product" would allow user to add a new product inputting specific parameters (product name, price, department, quantity) The SKU# is populated automatically.
>>Insert AddNew<<
