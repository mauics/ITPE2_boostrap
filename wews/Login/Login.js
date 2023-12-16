// Function to handle user registration.
function registerUser() {
    const fullName = document.getElementById('Modalname').value;
    const email = document.getElementById('Modalemail').value;
    const password = document.getElementById('Modalpassword').value;
    const confirmPassword = document.getElementById('ModalconfirmPassword').value;
    const address = document.getElementById('ModalAddress').value;
    const genderInputs = document.getElementsByName('gender');
    const birthday = document.getElementById('birthday').value;
    const role = document.getElementById('Modalrole').value;

    const existingUsers = JSON.parse(localStorage.getItem('userList')) || [];

    const user = {
        fullName,
        email,
        password,
        address,
        gender: getSelectedRadioValue(genderInputs),
        birthday,
        role
    };

    if (!user.email || !user.fullName || !user.password || !user.address || !user.gender || !user.birthday || user.password !== confirmPassword) {
        return alert('Please fill in all the required fields correctly.');
    }

    existingUsers.push(user);

    localStorage.setItem('userList', JSON.stringify(existingUsers));

    alert(`Welcome ${user.fullName}. You have been successfully registered.`);

    // Clear form fields
    document.getElementById('Modalname').value = '';
    document.getElementById('Modalemail').value = '';
    document.getElementById('Modalpassword').value = '';
    document.getElementById('ModalconfirmPassword').value = '';
    document.getElementById('ModalAddress').value = '';
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById('birthday').value = '';
    document.getElementById('Modalrole').value = '';

    // Reload the page or perform any other necessary actions
    location.reload();
}

// Function to handle login form submission.
function loginUser() {
    const emailInput = document.querySelector('#loginForm input[type="email"]');
    const passwordInput = document.querySelector('#loginForm input[type="password"]');

    // Retrieve the array of users from local storage
    const users = JSON.parse(localStorage.getItem('userList')) || [];

    // Find the user with the provided email
    const user = users.find(u => u.email === emailInput.value);

    if (user) {
        // Check if the provided password matches the stored password
        if (passwordInput.value === user.password) {
            const userRole = user.role;
            const userFullName = user.fullName;

            // Redirect based on user role
            if (userRole === 'buyer') {
                // Redirect to the buyer page
                window.location.href = '../Main/Main.html';
            } else if (userRole === 'seller') {
                // Redirect to the seller page
                window.location.href = '../Seller/Seller.html';
            } else {
                console.log('Invalid user role.');
            }

            console.log(`Welcome back, ${userFullName}! You are a ${userRole}.`);
        } else {
            console.log('Invalid password.');
        }
    } else {
        console.log('User not found. Please check your email or register.');
    }
}

// Helper function to get the value of the selected radio button
function getSelectedRadioValue(radioInputs) {
    for (let i = 0; i < radioInputs.length; i++) {
        if (radioInputs[i].checked) {
            return radioInputs[i].value;
        }
    }
    return null;
}

// Attach event listeners
document.getElementById('btnModalRegister').addEventListener('click', function () {
    registerUser();
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    loginUser();
});
