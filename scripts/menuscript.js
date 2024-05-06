//menu data
const menuData = {
    breakfast: [
        { name: "Special Oreo Pancakes", price: 5.99, image: "oreopancake.jpeg" },
        { name: "Turkey Bacon", price: 7.50, image: "turkeybacon.jpeg" },
        { name: "Fresh Fruit", price: 4.99, image: "freshfruit.jpeg" }
    ],
    lunch: [
        { name: "Chicken Burger", price: 8.99, image: "chickenburger.jpg" },
        { name: "Tuna pasta Salad", price: 6.99, image: "Tuna.jpg" },
        { name: "Shepherds Pie", price: 5.99, image: "Shepherdspie.jpg" }
    ],
    dinner: [
        { name: "Chinese Fried rice", price: 10.99, image: "Chinese.jpg" },
        { name: "Chicken Wings", price: 12.99, image: "Wings.jpg" },
        { name: "Vegetable Springroll", price: 9.99, image: "Spring.jpg" }
    ]
};

const cartItems = [];

// Function to display menu items for a given section
function displayMenu(section) {
    const menuSection = document.getElementById(section + "-menu");
    menuSection.innerHTML = "";
    menuData[section].forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.innerHTML = `
            <img src="images/${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-name="${item.name}" data-price="${item.price.toFixed(2)}">Add to Cart</button>
            </div>
        `;
        menuSection.appendChild(menuItem);
    });
}

// Display menu for each section on page load
window.addEventListener("DOMContentLoaded", () => {
    displayMenu("breakfast");
    displayMenu("lunch");
    displayMenu("dinner");
});


const cartItemsElement = document.getElementById("cart-items");
const totalElement = document.getElementById("total");
const checkoutBtn = document.getElementById("checkout-btn");

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("add-to-cart-btn")) {
        const name = event.target.getAttribute("data-name");
        const price = parseFloat(event.target.getAttribute("data-price"));

        let existingItem = null;
        for (const item of cartItems) {
            if (item.name === name) {
                existingItem = item;
                break;
            }
        }

        if (existingItem) {
            existingItem.quantity++;
            existingItem.total = existingItem.quantity * price;
        } else {
            cartItems.push({ name, price, quantity: 1, total: price });
        }

        updateCart();
    }

    if (event.target.id === "checkout-btn") {
        
        console.log("Checkout clicked!");
    }
});

function updateCart() {
    cartItemsElement.innerHTML = "";
    let total = 0;
    for (const item of cartItems) {
        const cartItem = document.createElement("li");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <p>${item.name} - $${item.price.toFixed(2)} x</p>
                <div class="cart-item-quantity">
                    <input type="number" min="1" value="${item.quantity}" data-name="${item.name}" data-price="${item.price.toFixed(2)}">
                </div>
                <p class="cart-item-total">$${item.total.toFixed(2)}</p>
            </div>
        `;
        cartItemsElement.appendChild(cartItem);
        total += item.total;
    }
    totalElement.textContent = `$${total.toFixed(2)}`;
}

cartItemsElement.addEventListener("input", function(event) {
    if (event.target.tagName === "INPUT") {
        const name = event.target.getAttribute("data-name");
        const price = parseFloat(event.target.getAttribute("data-price"));
        const quantity = parseInt(event.target.value);

        const itemIndex = cartItems.findIndex(item => item.name === name);
        if (itemIndex !== -1) {
            cartItems[itemIndex].quantity = quantity;
            cartItems[itemIndex].total = price * quantity;
        }

        updateCart();
    }
});
document.addEventListener("click", function(event) {
    // Other code...

    if (event.target.id === "checkout-btn") {
        
        // Image i want displayed, 
        alert("Order Accepted!");
     
        cartItems.length = 0;
        updateCart();
    }
});


