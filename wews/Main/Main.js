// Sample product data (you can replace it with actual data from a database)
const products = [
    { name: 'Original Flavor', price: 5.99 },
    { name: 'Sour Cream', price: 6.99 },
      { name: 'Cheese', price: 7.99 },
    // Add other products here
];

// Initialize the shopping cart
const cart = [];

// Event listener for adding items to the cart
document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners to all "Add to Cart" buttons
    var addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const productName = this.getAttribute('data-product');
            const product = products.find(p => p.name === productName);

            if (product) {
                cart.push(product);
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
});

// Function to update the cart UI and counter
function updateCart() {
    const cartItems = $('#cart-items');
    const cartTotal = $('#cart-total');
    const cartItemsModal = $('#cart-items-modal');
    const cartTotalModal = $('#cart-total-modal');
    const cartCounter = $('#cart-counter');

    // Update the cart counter
    cartCounter.text(cart.length);

    // Clear previous items
    cartItems.empty();
    cartItemsModal.empty();

    // Add current items
    cart.forEach(item => {
        const listItem = `<li class="list-group-item">${item.name} - $${item.price.toFixed(2)}</li>`;
        cartItems.append(listItem);
        cartItemsModal.append(listItem);
    });

    // Calculate and display total
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    cartTotal.text(total.toFixed(2));
    cartTotalModal.text(total.toFixed(2));
}