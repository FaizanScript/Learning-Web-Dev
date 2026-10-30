
// ================================
// LOGIN
// ================================

const loginForm =
    document.querySelector(".login-form");

const loginSuccess =
    document.querySelector(".login-success");

const loginSuccessName =
    document.querySelector(".login-success-name");



const loggedPirate =
    JSON.parse(
        sessionStorage.getItem(
            "currentPirate"
        )
    );

if (loggedPirate) {

    loginSuccessName.textContent =
        loggedPirate.pirateName;

    loginForm.style.display =
        "none";

    loginSuccess.classList.add(
        "active"
    );

}

// ================================
// LOGIN FORM
// ================================

if (loginForm) {

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const email =
            document.querySelector("#login-email");

        const password =
            document.querySelector("#login-password");

        const emailError =
            document.querySelector("#login-email-error");

        const passwordError =
            document.querySelector("#login-password-error");

        const loginError =
            document.querySelector("#login-error");


        // Clear previous errors

        emailError.textContent = "";

        passwordError.textContent = "";

        loginError.textContent = "";


        email.classList.remove("invalid");

        password.classList.remove("invalid");


        let isValid = true;


        // ================================
        // EMAIL VALIDATION
        // ================================

        if (email.value.trim() === "") {

            emailError.textContent =
                "Email is required.";

            email.classList.add("invalid");

            isValid = false;

        }


        // ================================
        // PASSWORD VALIDATION
        // ================================

        if (password.value === "") {

            passwordError.textContent =
                "Password is required.";

            password.classList.add("invalid");

            isValid = false;

        }


        if (!isValid) {
            return;
        }


        // ================================
        // FIND CREW MEMBER
        // ================================

        const crew = getCrew();

        const member = crew.find((crewMember) => {

            return (
                crewMember.email.toLowerCase() ===
                email.value.trim().toLowerCase()
            );

        });


        // ================================
        // MEMBER NOT FOUND
        // ================================

        if (!member) {

            loginError.textContent =
                "Invalid email or password";

            return;
        }


        // ================================
        // PASSWORD CHECK
        // ================================

        if (member.password !== password.value) {

            loginError.textContent =
                "Incorrect password. Check your credentials.";

            return;
        }


        // ================================
        // LOGIN SUCCESS
        // ================================

        // Save logged in pirate

        sessionStorage.setItem(
            "currentPirate",
            JSON.stringify(member)
        );


        loginSuccessName.textContent =
            member.pirateName;


        loginForm.style.display =
            "none";

        loginSuccess.classList.add(
            "active"
        );

    });

}


// ================================
// LOG OUT
// ================================

const logoutButton =
    document.querySelector(".logout-btn");


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        () => {

            sessionStorage.removeItem(
                "currentPirate"
            );

            location.reload();

        }
    );

}