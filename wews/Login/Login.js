
function register() {
    let Modalname = document.querySelector("#Modalname");
    let Modalemail = document.querySelector("#Modalemail");
    let Modalpassword = document.querySelector("#Modalpassword");
    let ModalconfirmPassword = document.querySelector("#ModalconfirmPassword");
    let ModalAdrress = document.querySelector("#ModalAddress");
    let genderInputs = document.getElementsByName("gender");
    let birthdayInput = document.querySelector("#birthday");

    let user = {
        email: Modalemail.value,
        name: Modalname.value,
        password: Modalpassword.value,
        confirmPassword: ModalconfirmPassword.value,
        address: ModalAdrress.value,
        gender: getSelectedRadioValue(genderInputs),
        birthday: birthdayInput.value,
    };

    if (!user.email) {
        return alert('Please enter your Email');
    } else if (!user.name) {
        return alert('Please enter your Name');
    } else if (!user.password || !user.confirmPassword) {
        return alert('Password is required');
    } else if (!user.address) {
        return alert('Please enter your address');
    } else if (!user.gender) {
        return alert('Gender is required. Please select your gender.');
    } else if (!user.birthday) {
        return alert('Birthday is required. Please enter your birthday.');
    } else if (user.password !== user.confirmPassword) {
        return alert('Password does not match');
    }

    alert(`Welcome ${user.name}. You have been successfully registered.`);

    localStorage.setItem("user", JSON.stringify(user));
    //console.log("Button register is clicked", user);
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

// Function to handle user registration.
function registerUser() {
    const fullName = document.getElementById('Modalname').value;
    const email = document.getElementById('Modalemail').value;
    const password = document.getElementById('Modalpassword').value;
    const confirmPassword = document.getElementById('ModalconfirmPassword').value;
    const address = document.getElementById('ModalAddress').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const birthday = document.getElementById('birthday').value;
    const role = document.getElementById('Modalrole').value;


    // Save user registration status, role, and other details to local storage.
    localStorage.setItem('isRegistered', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('userFullName', fullName);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('userConfirmPassword', confirmPassword);
    localStorage.setItem('userAddress', address);
    localStorage.setItem('userGender', gender);
    localStorage.setItem('userBirthday', birthday);
    


    // Refresh the page to show the appropriate content.
    location.reload();
}

// Function to handle login form submission.
function loginUser() {
    const emailInput = document.querySelector('#loginForm input[type="email"]');
    const passwordInput = document.querySelector('#loginForm input[type="password"]');

    // Check if the user is registered
    const isRegistered = localStorage.getItem('isRegistered') === 'true';

    if (isRegistered) {
        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');

        // Check if the provided credentials match the stored credentials
        if (emailInput.value === storedEmail && passwordInput.value === storedPassword) {
            const userRole = localStorage.getItem('userRole');
            const userFullName = localStorage.getItem('userFullName');

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
            console.log('Invalid email or password.');
        }
    } else {
        console.log('User is not registered. Please register first.');
    }
}