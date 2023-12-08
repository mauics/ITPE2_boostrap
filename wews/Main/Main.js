// Sample product data (you can replace it with actual data from a database)
const products = [
    { name: 'Original Flavor', price: 130.00 },
    { name: 'Sour Cream', price: 140.00 },
    { name: 'Cheese', price: 150.00 },
    // Add other products here
];

// Initialize the shopping cart
let cart = [];

// Event listener for adding items to the cart
document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners to all "Add to Cart" buttons
    var addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const productName = this.getAttribute('data-product');
            const product = products.find(p => p.name === productName);

            if (product) {
                // Check if the product is already in the cart
                const existingItem = cart.find(item => item.product.name === productName);

                if (existingItem) {
                    // Increment the quantity if the product is already in the cart
                    existingItem.quantity++;
                } else {
                    // Add the product with quantity 1 if it's not in the cart
                    cart.push({ product, quantity: 1 });
                }

                updateCart();
            }
        });
    });

    // Event listener for checking out (moved outside the modal)
    var checkoutButton = document.querySelector('.checkout');
    checkoutButton.addEventListener('click', function () {
        // In a real-world scenario, you'd implement the checkout logic here
        alert('Thank you for your purchase!');
        cart.length = 0; // Clear the cart after checkout
        updateCart();
    });

    // Check if a user is logged in
   // Check if a user is logged in
   const user = JSON.parse(localStorage.getItem('user'));

   if (user) {
       const userButton = document.getElementById('userDropdown');
       userButton.innerHTML = `<i class="fas fa-user"></i> ${user.name}`;
   }
   

    // Event listener for logging out
    var logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', function () {
        // In a real-world scenario, you'd implement the logout logic here
        if (user) {
            alert(`Goodbye, ${user.name}!`);
        }
        // Clear user data from local storage
        localStorage.removeItem('userFullName');
        // Redirect to the welcome page (replace 'welcome.html' with the actual page URL)
        window.location.href = '../Welcome/Welcome.html';
    });

    // Event delegation for updating quantities and removing items from the cart
    var cartItems = document.getElementById('cart-items');
    cartItems.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-from-cart')) {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
        } else if (event.target.classList.contains('increase-quantity')) {
            const index = event.target.dataset.index;
            cart[index].quantity++;
        } else if (event.target.classList.contains('decrease-quantity')) {
            const index = event.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
        }

        updateCart();
    });

    // ... (existing logic)
});

// Function to update the cart UI and counter
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCounter = document.getElementById('cart-counter');

    // Update the cart counter
    cartCounter.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Clear previous items
    cartItems.innerHTML = '';

    // Add current items
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
    
        listItem.innerHTML += `${item.product.name} - ₱&nbsp;${(item.product.price * item.quantity).toFixed(2)} each - Quantity: ${item.quantity}`;
        listItem.innerHTML += ` <button class="btn btn-success btn-sm increase-quantity" data-index="${index}">+</button>`;
        listItem.innerHTML += ` <button class="btn btn-warning btn-sm decrease-quantity" data-index="${index}">-</button>`;
        listItem.innerHTML += ` <button class="btn btn-danger btn-sm remove-from-cart" data-index="${index}">X</button>`;
    
        cartItems.appendChild(listItem);
    });
    // Calculate and display total
    const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);
}
