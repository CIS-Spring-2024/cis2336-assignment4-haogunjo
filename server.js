// server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Route to handle GET request for the order form page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'order-form.html'));
});

// Route to handle POST request for processing form data
app.post('/process-order', (req, res) => {
    // Process form data and calculate total amount
    const { itemName, quantity } = req.body;
    const itemPrice = getItemPrice(itemName); // You need to implement this function
    const totalAmount = calculateTotalAmount(itemPrice, quantity); // You need to implement this function
    
    // Check for validation
    if (!itemPrice || !quantity || quantity < 1) {
        res.status(400).send('Invalid form data');
        return;
    }

    // Respond with total amount
    res.send(`Total amount for ${quantity} ${itemName}(s) is $${totalAmount.toFixed(2)}`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Function to get item price 
function getItemPrice(itemName) {
   
    const itemPrices = {
        'Special Oreo Pancakes': 5.99,
        'Turkey Bacon': 7.50,
        'Fresh Fruit': 4.99
        // i need to add more items as needed
    };
    return itemPrices[itemName];
}

// Function to calculate total amount
function calculateTotalAmount(price, quantity) {
    return price * quantity;
}

