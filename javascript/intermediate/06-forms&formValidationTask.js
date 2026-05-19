// email/password validator

let email = document.querySelector("#email");
let password = document.querySelector("#password");
let form = document.querySelector("form");

form.addEventListener("submit", function (dets) {
    dets.preventDefault();

    document.querySelector("#emailError").textContent = "";
    document.querySelector("#passwordError").textContent = "";

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let emailans = emailRegex.test(email.value);
    let passwordans = passwordRegex.test(password.value);

    let isvalid = true;

    if(!emailans) {
        document.querySelector("#emailError").textContent = "email is incorrect";
        document.querySelector("#emailError").style.display = "initial";
        isvalid = false;
    }

    if (!passwordans) {
        document.querySelector("#passwordError").textContent = "passwrod is incorrect";
        document.querySelector("#passwordError").style.display = "initial";
        isvalid = false;
    }

    if (isvalid) {
        document.querySelector("#resultmsg").textContent = "everything is correct"
    }
});