// Events and Events Handling - Events are actions or occurrences detected by a computer program—such as user clicks, key presses, or system messages—that signal something has happened. Event handling is the mechanism or code (functions/methods) that listens for these events and executes specific tasks in response, enabling interactive, user-driven applications

// event ka matlab hota hai koi action hua
// event lilstener ka matlab hai apne koi action ka reaction diya



// Event binding - Event binding in JavaScript is the process of connecting a specific event (like a click, keypress, or hover) on a DOM element to a handler function that executes when that event occurs.

// addEventListner - An event listener is a procedure or function in JavaScript that "waits" for a specific event to occur on a target element, such as a user clicking a button or pressing a key. When the specified event is triggered, the listener executes a callback function (often called an event handler) to respond to that action.

// syntax - element.addEventListner("event name", function() {
//  the reaction code of the event
//});

let h1 = document.querySelector("h1"); // select the element first

h1.addEventListener("click", function () {
    h1.style.color = "red"; // make the h1 red when clicked
});


let p = document.querySelector("p"); // select the element 

p.addEventListener("dblclick", function () {
    p.style.color = "yellow"; // make the p yellow when double cllicked
});


// removeEventListner - removeEventListener() is a built-in JavaScript method used to detach an event handler that was previously attached to an element using addEventListener().

let h2 = document.querySelector("h2");

function dbclick() {
    h2.style.color = "orange";
}

h2.addEventListener("dblclick", dbclick); // this dbclick function will change the color to orange when double clicked

h2.removeEventListener("dblclick", dbclick) // this will remove the eventlistener  



// common events (click, input, change, submit, mouseover, keyup, keydown)

// click - an event that triggers when a user interacts with an element, such as by clicking a mouse button or tapping a screen

let h3 = document.querySelector("h4");

h3.addEventListener("click", function () {
    h3.style.color = "pink";
});


// input - The input event in JavaScript fires synchronously every time the value of an <input>, <select>, or <textarea> element is modified
let input = document.querySelector("input");

input.addEventListener("input", function (xyz) {
    if (xyz.data !== null) {
        console.log(xyz.data);
    }
});


// change - change event tab chalta hai jab apka input select ya textarea mein koi change hojaaye

let select = document.querySelector("select");
let device = document.querySelector("#device");

select.addEventListener("change", function (val) {
    device.textContent = `${val.target.value} device selected`;
});


// keydown - keydown event is triggered the moment a user presses a key on their keyboard. It is one of the most common ways to detect and respond to user keyboard input in real-time.

let sech1 = document.querySelector(".h1");

window.addEventListener("keydown", function (val) {
    if (val.key === " ") {
        sech1.textContent = "SPC";
    } else {
        sech1.textContent = val.key;
    }
});


// sumbit - it triggers when the form is submitted, it is usually used to validate the form before sending it to the server or to abort the submission and process it in JavaScript.

let form = document.querySelector("form");
let input2 = document.querySelectorAll("input");
let main = document.querySelector("#main");

form.addEventListener("submit", function (val) {
    val.preventDefault();

    let card = document.createElement("div");
    card.classList.add("card");

    let profile = document.createElement("div");
    profile.classList.add("profile");

    card.appendChild(profile);
    console.log(card);

    let img = document.createElement("img");
    img.setAttribute("src", input2[0].value);

    let H3 = document.createElement("h3");
    H3.textContent = input2[1].value;
    let h5 = document.createElement("h5");
    h5.textContent = input2[2].value;
    let p = document.createElement("p");
    p.textContent = input2[3].value;

    profile.appendChild(img);
    card.appendChild(profile);

    card.appendChild(H3);
    card.appendChild(h5);
    card.appendChild(p);

    main.appendChild(card);

    input2.forEach(function (inp) {
        if (inp.type !== "submit") {
            inp.value = "";
        }

    });
});


// mouseover - triggers when a user moves a pointing device, such as a mouse or trackpad, onto an HTML element

let abcd = document.querySelector("#abcd");

abcd.addEventListener("mouseover", function () {
    abcd.style.backgroundColor = "red";
});


// mouseout - fires when a user moves their mouse cursor so it is no longer contained within an element

abcd.addEventListener("mouseout", function () {
    abcd.style.backgroundColor = "pink";
});


// mousemove - fires repeatedly whenever a user moves the cursor while it is over a specific element

window.addEventListener("mousemove", function (dets) {
    abcd.style.top = dets.clientY + "px";
    abcd.style.left = dets.clientX + "px";
});


// keyup - The keyup event in JavaScript is triggered when a user releases a keyboard key

let sh1 = document.querySelector(".h1");

window.addEventListener("keyup", function (val) {
    console.log("UP");
    if (val.key.toLowerCase === "r") {
        sh1.style.color = "red";
    }
});



// event object - An event object in JavaScript is a built-in object automatically created by the browser whenever an event occurs, such as a user clicking a button, pressing a key, or a page finishing its load. It serves as a messenger, carrying detailed information about the specific event to your event handler function

// addEventListener("event name", function (event object) {
// console.log(event objects);
// });

// target - The specific element that originally triggered the event.

// type - The name of the event (e.g., 'click', 'keydown').

// preventDefault - A method that stops the browser's default action for that event (e.g., preventing a link from following a URL, preventing a from to reset after sumbmit).

// stopPropagation - Stops the event from "bubbling" up to parent elements in the DOM tree.

// timestamp - The time (in milliseconds) when the event was created.



// event propagation - jab bhi app click karte ho ya koi bhi event raise karte ho to apka event flow do phases me chalta hai (humesha phase 1 hi pahle hoti hai par vo by default off rahti hai, agar hum usey on kar dein to pahle phase 1 ka answer milega):

// phase 1: event top level element se neeche ki taraf ayega called (event capturing)

// phase 2: event raised element se parent ki taraf jaayega called (event bubbling)

// aur pahle phase 1 hoti hai.

let a = document.querySelector(".a");
let b = document.querySelector(".b");
let c = document.querySelector(".c");
let bn = document.querySelector(".bn");

btn.addEventListener("click", function () {
    console.log("button clicked");
});

c.addEventListener("click", function () {
    console.log("c clicked");
});

b.addEventListener("click", function () {
    console.log("b clicked");
});

a.addEventListener("click", function () {
    console.log("a clicked");
},
    true
);


// event bubbling and capturing

// Event bubbling - it is a type of event propagation in the Document Object Model (DOM) where an event starts at the most specific element (the one you clicked) and then "bubbles up" through its parent elements until it reaches the root of the document. (jispe event aayega agar uspar listener nahi hua to humaara event uske parent par listner dhundhega aur aisa karte karte upar ki taraf move karega) (andar se bahar ki taraf)

let nav = document.querySelector("#nav");
nav.addEventListener("click", function () {
    alert("clicked");
});

let ul = document.querySelector("ul");

ul.addEventListener("click", function (evt) {
    evt.target.style.textDecoration = "line-through";
});
//or
ul.addEventListener("click", function (evt) {
    evt.target.classList.toggle("lt");
});


// event capturing - Event capturing (also known as "event trickling") is a phase in the JavaScript Event Propagation model where an event travels downward from the root of the Document Object Model (DOM) tree to the target element (opposite of event bubbling) (bahar se andar ki taraf)


// Event delegation - it is a technique in JavaScript where you attach a single event listener to a parent element to manage events for all of its current and future child elements