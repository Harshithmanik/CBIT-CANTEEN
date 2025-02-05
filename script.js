// Load menu from localStorage if available, otherwise use default data
let menu = JSON.parse(localStorage.getItem('menu')) || [
    { name: "Burger", price: 50, soldOut: false },
    { name: "Pizza", price: 100, soldOut: false },
    { name: "Pasta", price: 70, soldOut: false }
];

let cart = [];

// Display menu for students
const menuList = document.getElementById('menu-list');
const cartList = document.getElementById('cart-list');

function displayMenu() {
    menuList.innerHTML = '';
    menu.forEach((item, index) => {
        if (!item.soldOut) {
            menuList.innerHTML += `<div>${item.name} - ₹${item.price} <button onclick="addToCart(${index})">Add to Cart</button></div>`;
        } else {
            menuList.innerHTML += `<div>${item.name} - ₹${item.price} (Sold Out)</div>`;
        }
    });
}

function displayCart() {
    cartList.innerHTML = '';
    cart.forEach((item, index) => {
        cartList.innerHTML += `<div>${item.name} - ₹${item.price} <button onclick="removeFromCart(${index})">Remove</button></div>`;
    });
}

// Add to Cart
function addToCart(index) {
    cart.push(menu[index]);
    displayCart();
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

// Checkout (Redirect to Payment Page)
document.getElementById('checkout-button').addEventListener('click', function() {
    if (cart.length > 0) {
        const confirmCheckout = confirm("Proceed to UPI Payment?");
        if (confirmCheckout) {
            // Redirect to payment page
            window.location.href = 'payment.html';
        }
    } else {
        alert("Cart is empty!");
    }
});

// Admin Login Functionality
document.getElementById('login-button').addEventListener('click', function() {
    document.getElementById('login-section').classList.remove('hidden');
});

document.getElementById('login-submit').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check admin credentials
    if (username === "CBIT Canteen" && password === "cbit_canteen_2024") {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('admin-section').classList.remove('hidden');
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
});

// Admin Menu Management
const adminMenu = document.getElementById('admin-menu');

function displayAdminMenu() {
    adminMenu.innerHTML = '';
    menu.forEach((item, index) => {
        adminMenu.innerHTML += `
            <div>
                ${item.name} - ₹${item.price} 
                <button id="soldout-btn-${index}" onclick="markAsSoldOut(${index})" style="background-color: ${item.soldOut ? 'grey' : 'orange'}; color: white;" ${item.soldOut ? 'disabled' : ''}>Mark Sold Out</button>
                <button id="stocked-btn-${index}" onclick="markAsStockedIn(${index})" style="background-color: ${item.soldOut ? 'green' : 'grey'}; color: white;" ${item.soldOut ? '' : 'disabled'}>Stocked In</button>
                <button onclick="deleteFoodItem(${index})" style="background-color: red; color: white;">Delete</button>
            </div>
        `;
    });
}

// Delete food item
function deleteFoodItem(index) {
    if (confirm("Are you sure you want to delete this item?")) {
        menu.splice(index, 1); // Remove item from menu array
        displayAdminMenu(); // Refresh the admin menu display
        localStorage.setItem('menu', JSON.stringify(menu)); // Update local storage
    }
}

// Mark as Sold Out
function markAsSoldOut(index) {
    menu[index].soldOut = true;
    document.getElementById(`soldout-btn-${index}`).style.backgroundColor = 'grey';
    document.getElementById(`soldout-btn-${index}`).disabled = true;
    document.getElementById(`stocked-btn-${index}`).disabled = false;
    document.getElementById(`stocked-btn-${index}`).style.backgroundColor = 'green';
    displayAdminMenu();
}

// Mark as Stocked In
function markAsStockedIn(index) {
    menu[index].soldOut = false;
    document.getElementById(`soldout-btn-${index}`).style.backgroundColor = 'orange';
    document.getElementById(`soldout-btn-${index}`).disabled = false;
    document.getElementById(`stocked-btn-${index}`).style.backgroundColor = 'grey';
    document.getElementById(`stocked-btn-${index}`).disabled = true;
    displayAdminMenu();
}

// Add new food item
document.getElementById('add-food').addEventListener('click', function() {
    const name = document.getElementById('food-name').value;
    const price = parseInt(document.getElementById('food-price').value);
    if (name && price) {
        menu.push({ name: name, price: price, soldOut: false });
        displayAdminMenu();
        document.getElementById('food-name').value = ''; // Clear input
        document.getElementById('food-price').value = ''; // Clear input
    }
});

// Save the updated menu and redirect to index.html when "Update" is clicked
document.getElementById('update-menu').addEventListener('click', function() {
    localStorage.setItem('menu', JSON.stringify(menu));
    window.location.href = 'index.html';
});

// Initialize
displayMenu();
displayAdminMenu();
