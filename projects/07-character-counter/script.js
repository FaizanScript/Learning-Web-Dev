// Selecting Elements (Querying)
let input = document.querySelector("input");
let count = document.querySelector(".count");


// character count function code
input.addEventListener("input", function(event) {

// getting the user input value 
    let currentText = event.target.value;
    
// updating the UI of the count
    count.textContent = currentText.length;

});