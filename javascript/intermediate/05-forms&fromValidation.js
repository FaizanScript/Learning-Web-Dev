// Forms and Form-Validation 

// forms - forms are elements used to collect user input

// forms validation -  form validation is the process of ensuring that this data is accurate, complete, and in the correct format before it is sent to a serve

// reading values from input, textarea, select - To read values from <input>, <textarea>, and <select> elements in JavaScript, you primarily use the .value property of the DOM element.

// Select the element: Use methods like document.getElementById() or document.querySelector().
// Access the value: Use the .value property to retrieve the current content.



// preventDefault() = preventDefault() is a method used on an event object to stop the browser's automatic, "default" action from occurring.(When specifically applied to a form submission, it stops the form from sending its data to a server and prevents the page from refreshing or reloading)

let naam = document.querySelector("#name");
let form = document.querySelector("form");
let hide = document.querySelector("#hide");

form.addEventListener("submit", function (dets) {
    dets.preventDefault();

    if (naam.value.length <= 2) {
        hide.style.display = "initial";
    } else {
        hide.style.display = "none";
    }
});



// inline and js-based validation

// inlilne based validation - Inline-based validation is a technique where user input is checked for errors in real-time as the user interacts with a form, rather than waiting until they click "Submit".

// js-based validation - JavaScript-based validation is a method used to check if user input meets specific criteria before it is sent to a server. It is a type of client-side validation that runs directly in the user's web browser, providing instant feedback and reducing the load on the server

// Why Use It?
// Instant Feedback: Users see errors immediately (e.g., as they type or when they click "Submit") without waiting for a page reload.Customization: Unlike standard HTML5 validation (like required or type="email"), JS allows you to write complex, custom rules.
// Better UX: It prevents the frustration of submitting a long form only to have it rejected by the server for a simple typo.

// How It Works
// Intercepting Submission: JS often uses event.preventDefault() to stop the form from actually submitting until all checks pass.
// Logic Checks: It uses if-else conditions and Regular Expressions (Regex) to verify formats like emails, phone numbers, or password strength.
// Displaying Errors: It dynamically updates the HTML DOM to show error messages (often in red) near the invalid fields.
// Constraint Validation API: Modern browsers provide a built-in JavaScript API (e.g., checkValidity(), setCustomValidity()) that helps JS work seamlessly with HTML5 validation attributes.



// showing an error messages conditionally -  Showing an error message conditionally in JavaScript refers to displaying a message to a user or developer only when specific criteria (like invalid input or a failed API call) are met.



// pattern attribute - The pattern attribute in HTML is used within <input> elements to enforce specific formatting rules. It defines a regular expression (regex) that the user's entry must completely match for a form to be successfully submitted


// custom regex - A custom regex (Regular Expression) is a user-defined string of characters and symbols that acts as a highly specific search pattern. It is used to quickly scan text to find, extract, edit, or validate specific data (like emails, URLs, or custom product codes) that might be impossible to find with a simple keyword search.

form.addEventListener("submit", function (dets) {
    dets.preventDefault();

    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    let ans = regex.test("batmanfrommcu@gmail.com");
    console.log(ans);
});