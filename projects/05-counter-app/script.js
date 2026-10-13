// Selecting Elements (Querying)
let count = document.querySelector(".count");
let increment = document.querySelector(".increment");
let decrement = document.querySelector(".decrement");
let reset = document.querySelector(".reset");

// Global Count varaible
let currentcount = 0;

// increment function code 
increment.addEventListener("click", () => {
    
    currentcount = currentcount + 1;

    updateDisplay(); // calling the UI update function
    // count.textContent = currentcount;  (was manually updating the count UI)

});


// decrement function code
decrement.addEventListener("click", () => {

    if (currentcount > 0) {
        currentcount = currentcount - 1;
    } else {
        alert("nice try diddy, but cant go below zero");

    }

    updateDisplay(); // calling the UI update function
    // count.textContent = currentcount; (was manually updating the count UI)
});


// reset function code
reset.addEventListener("click", () => {

    currentcount = 0;

    updateDisplay(); // calling the UI update function
    // count.textContent = currentcount;  (was manually updating the count UI)
});


// count UI update function code
function updateDisplay() {

    count.textContent = currentcount;

}