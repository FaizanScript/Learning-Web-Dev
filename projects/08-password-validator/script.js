// Selecting Elements (Querying)
let input = document.querySelector("input");
let character = document.querySelector(".characters");
let number = document.querySelector(".number");
let uppercase = document.querySelector(".uppercase");


// password validtion function code
input.addEventListener("input", function(event) {

    let password = event.target.value;

// to check the password length 
    if (password.length >= 8) {
        character.textContent = "✔️";
    } else {
        character.textContent = "❌";
    }

// to check wheather the password contians at least one number
    if (/\d/.test(password)) {
        number.textContent = "✔️";
    } else {
        number.textContent = "❌";
    }

// to check wheather the password contains at least one uppercas character
    if (/[A-Z]/.test(password)) {
        uppercase.textContent = "✔️";
    } else {
        uppercase.textContent = "❌";
    }

});