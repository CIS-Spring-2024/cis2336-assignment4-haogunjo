// server.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files like HTML, CSS, and images

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/order_form.html');
});

app.post('/process_order', (req, res) => {
    // Process form data
    const { name, email, breakfast, breakfastQuantity, lunch, lunchQuantity, dinner, dinnerQuantity } = req.body;

    // Validate form data
    if (!name || !email || !breakfast || !breakfastQuantity || !lunch || !lunchQuantity || !dinner || !dinnerQuantity) {
        return res.status(400).send('Please fill out all fields.');
    }

    // Convert quantity strings to numbers
    const breakfastQty = parseInt(breakfastQuantity);
    const lunchQty = parseInt(lunchQuantity);
    const dinnerQty = parseInt(dinnerQuantity);

    // Validate quantities
    if (isNaN(breakfastQty) || isNaN(lunchQty) || isNaN(dinnerQty) ||
        breakfastQty < 1 || lunchQty < 1 || dinnerQty < 1 ||
        breakfastQty > 10 || lunchQty > 10 || dinnerQty > 10) {
        return res.status(400).send('Invalid quantity values.');
    }

    // Calculate total amount
    const totalPrice = (breakfastQty * getItemPrice(breakfast)) +
                       (lunchQty * getItemPrice(lunch)) +
                       (dinnerQty * getItemPrice(dinner));

    // Render order confirmation page with total amount
    res.send(`Order confirmed! Total amount: $${totalPrice.toFixed(2)}`);
});

// Helper function to get item price
function getItemPrice(item) {
    const priceRegex = /\$([\d.]+)/;
    const matches = item.match(priceRegex);
    if (matches && matches.length > 1) {
        return parseFloat(matches[1]);
    }
    return 0;
}

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
