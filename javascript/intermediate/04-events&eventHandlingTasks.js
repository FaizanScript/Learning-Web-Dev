// live character counter

let input = document.querySelector("input");
let span = document.querySelector("span");

input.addEventListener("input", function() {
    let left = 20 - input.value.length;
    span.textContent = left;

    if (left < 0) {
        span.style.color = "red";
    } else {
        span.style.color = "black";
    }
});



// delegated event handler on todo list

let ul = document.querySelector("ul");

ul.addEventListener("click", function(evt) {
    evt.target.classList.toggle("lt");
});