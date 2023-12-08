console.log("Hello World");

let name = "Maui";
let age = 18;
let isSingle = true;
let hobbies = ["Dotes", "Reading"]; 

let myobject = {
myName: name,
age,
isSingle,
hobbies,
};

//console.log(myobject);

function register () {
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



alert(`Welcome ${user.name}. You have been succesfully registerd.`);

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

//console.log(JSON.parse(localStorage.getItem("user")));