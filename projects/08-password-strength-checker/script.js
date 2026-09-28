// Selecting Elements (Querying)
let input = document.querySelector("input");
let state = document.querySelector(".state");


// passwrod strength function code
input.addEventListener("input", function (event) {

    let password = event.target.value.replaceAll(" ", "");

    let length = password.length;

    if (length <= 5) {
        state.textContent = "Weak";
        state.style.color = "red";
    } else if (length <= 10) {
        state.textContent = "Medium";
        state.style.color = "orange";
    } else {
        state.textContent = "Strong";
        state.style.color = "green";
    }

});