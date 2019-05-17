Bamazon is a MySQL & Node Application that acts as an Amazon-like storefront that uses npm inquirer and npm mysql package as well as mysql database.

The Bamazon application allows the user to view the current inventory of store items: SKU#, product name, price, and stock quantity. The user is then able to purchase one of the existing items by entering the SKU# and the desired quantity. If the item is currently in stock, the user's order is fulfilled and display the total price and update the database stock quantity. If the desired quantity is not available, the user will receive an "Insufficient Quantity" notice and not be able to place the order.

The Bamazon application takes in 2 node applications: Customer and Manager 

Customer:

To view available products for sale and to place an order, simply open up the terminal and type in "node bamazonCustomer.js":
![PurchaseItem](https://user-images.githubusercontent.com/46510990/57913397-5ec9c680-7841-11e9-8c2a-d40670da1309.png)

Manager:

To view, replenish, or add products, simple open up the terminal and type in "node bamazonManager.js".

The manager application offers 4 options:
1) View Products for Sale
2) View Low Inventory
3) Add to Inventory
4) Add New Product

![ManagerJSStart](https://user-images.githubusercontent.com/46510990/57913813-3d1d0f00-7842-11e9-886a-82b289fc42f1.png)

Utilizing the arrow keys, you can select one of the 4 options. 

Selecting "View Products for Sale" displays the database of all products.
![ViewProducts](https://user-images.githubusercontent.com/46510990/57913816-3db5a580-7842-11e9-8a36-ebc728569352.png)

Selecting "View Low Inventory" would show products that have less than 5 in stock.
![ViewLow](https://user-images.githubusercontent.com/46510990/57913815-3db5a580-7842-11e9-9846-ba81d0300944.png)

Selecting "Add to Inventory" would allow user to replenish stock by inputting the SKU# and the quantity to be added.
![AddInventory](https://user-images.githubusercontent.com/46510990/57913808-3d1d0f00-7842-11e9-96df-5022e98e9b6b.png)

Selecting "Add New Product" would allow user to add a new product inputting specific parameters (product name, price, department, quantity) The SKU# is populated automatically.
![AddNew](https://user-images.githubusercontent.com/46510990/57913811-3d1d0f00-7842-11e9-8a44-028755849335.png)
