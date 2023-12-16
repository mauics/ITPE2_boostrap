  // Event listener for logging out
document.getElementById('logoutButton').addEventListener('click', function () {
    // Clear user data from local storage
    localStorage.removeItem('userData');

    // Redirect to the welcome page (replace 'welcome.html' with the actual page URL)
    window.location.href = '../Welcome/Welcome.html';
});


document.addEventListener('DOMContentLoaded', function () {
    const addProductForm = document.getElementById('addProductForm');
    const productListRow = document.getElementById('productList');
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];

    // Display existing products on page load
    storedProducts.forEach((product, index) => {
        displayProduct(product, index);
    });

    addProductForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get values from the form
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productImage = document.getElementById('productImage').files[0];

        // Validate if an image is selected
        if (!productImage) {
            alert('Please select an image.');
            return;
        }

        // Save the product to local storage
        const newProduct = {
            name: productName,
            price: productPrice,
            image: URL.createObjectURL(productImage)
        };

        storedProducts.push(newProduct);
        localStorage.setItem('products', JSON.stringify(storedProducts));

        // Display the new product
        displayProduct(newProduct, storedProducts.length - 1);

        // Clear the form fields
        addProductForm.reset();
    });

    // Event delegation for delete and edit buttons
    productListRow.addEventListener('click', function (event) {
        const target = event.target;

        if (target.classList.contains('btn-delete')) {
            // Delete button clicked
            const productIndex = target.dataset.index;
            storedProducts.splice(productIndex, 1);
            localStorage.setItem('products', JSON.stringify(storedProducts));
            displayProducts();
        } else if (target.classList.contains('btn-edit')) {
            // Edit button clicked
            const productIndex = target.dataset.index;
            const editModal = document.getElementById('editModal');

            // Pre-fill the edit modal with the selected product details
            document.getElementById('editProductName').value = storedProducts[productIndex].name;
            document.getElementById('editProductPrice').value = storedProducts[productIndex].price;

            // Save the current index as a data attribute in the modal
            editModal.dataset.index = productIndex;

            // Open the edit modal
            $(editModal).modal('show');
        }
    });

    // Function to display products
    function displayProducts() {
        productListRow.innerHTML = ''; // Clear existing products

        storedProducts.forEach((product, index) => {
            displayProduct(product, index);
        });
    }

    // Function to display a product
    function displayProduct(product, index) {
        const col = document.createElement('div');
        col.classList.add('col-md-4', 'mb-4');

        const card = document.createElement('div');
        card.classList.add('card');

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-delete');
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.index = index;

        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-primary', 'mr-2', 'btn-edit');
        editButton.textContent = 'Edit';
        editButton.dataset.index = index;

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = 'Product Image';
        img.classList.add('card-img-top');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = product.name;

        const price = document.createElement('p');
        price.classList.add('card-text');
        price.textContent = `₱${product.price}`;

        cardBody.appendChild(title);
        cardBody.appendChild(price);
        cardBody.appendChild(editButton);
        cardBody.appendChild(deleteButton);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);
        productListRow.appendChild(col);
    }

     // Edit modal save changes button click event
     const editModalSaveButton = document.getElementById('editModalSaveButton');
     editModalSaveButton.addEventListener('click', function () {
         const editModal = document.getElementById('editModal');
         const productIndex = editModal.dataset.index;
 
         // Update the product details
         storedProducts[productIndex].name = document.getElementById('editProductName').value;
         storedProducts[productIndex].price = document.getElementById('editProductPrice').value;
 
         localStorage.setItem('products', JSON.stringify(storedProducts));
         displayProducts();

         document.getElementById('editProductName').value = '';
         document.getElementById('editProductPrice').value = '';
 
         // Close the edit modal
         $('#editModal').modal('hide');
     });
 });

    

  