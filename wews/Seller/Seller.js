const users = JSON.parse(localStorage.getItem('users')) || [];
   
   const loggedInUser = users.find(user => user.email === loggedInUserEmail);
   
   if (loggedInUser) {
       const userButton = document.getElementById('userDropdown');
       userButton.innerHTML = `<i class="fas fa-user"></i> ${loggedInUser.fullName}`;

       updateLoggedInUserName(users.fullName);

       document.getElementById('userEmailDisplay').innerText = loggedInUser.fullName;
   }

    // Event listener for logging out
    var logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', function () {
        // In a real-world scenario, you'd implement the logout logic here
        const loggedInUserName = localStorage.getItem('userFullName');
        if (loggedInUserName) {
            alert(`Goodbye, ${loggedInUserName}!`);
        }
        // Clear user data from local storage
        localStorage.removeItem('userFullName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPassword');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userAddress');
        localStorage.removeItem('userBirthday');
        localStorage.removeItem('userRole');

        // Redirect to the welcome page (replace 'welcome.html' with the actual page URL)
        window.location.href = '../Welcome/Welcome.html';
        
        location.reload();
    });


    // Add product function 
    document.addEventListener('DOMContentLoaded', function () {
        const addProductForm = document.getElementById('addProductForm');
        const productListRow = document.getElementById('productList');
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];

        // Display existing products on page load
        storedProducts.forEach(product => {
            displayProduct(product);
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
            displayProduct(newProduct);

            // Clear the form fields
            addProductForm.reset();

        });

        // Function to display a product
        function displayProduct(product) {
            const col = document.createElement('div');
            col.classList.add('col-md-4', 'mb-4');

            const card = document.createElement('div');
            card.classList.add('card');
            
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.textContent = 'Delete';

            const editButton = document.createElement('button');
            editButton.classList.add('btn', 'btn-primary', 'mr-2');
            editButton.textContent = 'Edit';
        
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
    });

    

  