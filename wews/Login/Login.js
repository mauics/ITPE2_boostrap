function register() {
    const fullName = document.getElementById('Modalname').value;
    const email = document.getElementById('Modalemail').value;
    const password = document.getElementById('Modalpassword').value;
    const confirmPassword = document.getElementById('ModalconfirmPassword').value;
    const address = document.getElementById('ModalAddress').value;
    const genderInputs = document.getElementsByName('gender');
    const birthday = document.getElementById('birthday').value;
    const role = document.getElementById('Modalrole').value;

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const user = {
        fullName,
        email,
        password,
        confirmPassword,
        address,
        gender: getSelectedRadioValue(genderInputs),
        birthday,
        role
    };

    if (!user.email || !user.fullName || !user.password || !user.confirmPassword || !user.address || !user.gender || !user.birthday || user.password !== user.confirmPassword) {
        return alert('Please fill in all the required fields correctly.');
    }

    existingUsers.push(user);

    localStorage.setItem('users', JSON.stringify(existingUsers));

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

    alert(`Welcome ${user.fullName}. You have been successfully registered.`);

    localStorage.setItem('isRegistered', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('userFullName', fullName);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('userConfirmPassword', confirmPassword);
    localStorage.setItem('userAddress', address);
    localStorage.setItem('userGender', user.gender);
    localStorage.setItem('userBirthday', birthday);
}

function getSelectedRadioValue(radioInputs) {
    for (let i = 0; i < radioInputs.length; i++) {
        if (radioInputs[i].checked) {
            return radioInputs[i].value;
        }
    }
    return null;
}

let btnModalRegister = document.querySelector('#btnModalRegister');

btnModalRegister.onclick = () => {
    register();
};
 // Function to handle user registration.
 document.getElementById('btnModalRegister').addEventListener('click', function () {
    registerUser();
});

// Function to handle login form submission.
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    loginUser();
});


// Function login form submission.
function loginUser() {
    const emailInput = document.querySelector('#loginForm input[type="email"]');
    const passwordInput = document.querySelector('#loginForm input[type="password"]');

    // Retrieve the array of users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

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