// THE "This" KEYWORD

// the "this" keyword

// this: the "this" keyword is a special reference that points to an object.
//      Unlike other variables, the value of this is not fixed;
//  it is determined dynamically at runtime based entirely on how a function is called, rather than where it is written.
// (think of "this" as a pronoun (like "he", "she", or "it") that changes its meaning depending on the context of the sentence.)
//  ("this" keyword special keyword hai, kyuki jaise ki baki saare keyword ki value ya unka nature same rehta hai,
//  this ki value ya nature badal jaata hai is baat se ki app ussey kaha use kar rahe ho.)


// How "this" Behaves in Different Contexts:

// 1. Inside an Object Method (Implicit Binding)
//  -> When a function is called as a method of an object (e.g., obj.method()), this refers to the object that holds the method.

// Example:-
const user = {
    name: "Alice",
    greet() {
        console.log(`Hello, my name is ${this.name}`); // "this" is the user object
    }
};

user.greet(); // Output: Hello, my name is Alice

// 2. Inside a Regular Standalone Function (Default Binding)
//   -> If you call a standard function on its own without attaching it to an object, this falls back to the environment's global context.
//  Normal Mode: this refers to the global object (window in browsers, global in Node.js).
//  Strict Mode ("use strict";): this will be undefined to prevent accidental bugs.

// Example:-
function showContext() {
    console.log(this);
}
showContext(); // Logs the Window object (or undefined if in strict mode)

// 3. Inside Arrow Functions (Lexical Binding)
//  -> Arrow functions do not have their own this keyword. Instead, they inherit this from the surrounding code (the scope where the arrow function was defined).

// Example:-
const counter = {
    count: 0,
    start() {
        // Regular function sets 'this' to the counter object
        setTimeout(() => {
            // Arrow function inherits 'this' from start()
            this.count++;
            console.log(this.count);
        }, 1000);
    }
};
counter.start(); // Works perfectly and logs: 1

// 4. With Constructor Functions or Classes
//  -> When a function is invoked using the new keyword to create an instance, this points to the brand new object being created.

// Example:-
function Car(model) {
    this.model = model; // "this" is the blank new object
}

const myCar = new Car("Tesla");
console.log(myCar.model); // Output: Tesla

// 5. with addEventListener Handlers
//  -> When you use standard functions inside element.addEventListener or old-school handlers like element.onclick, this points directly to the element that received the event 
// (the element the listener is attached to). DOM Element: this equals e.currentTarget (the element handling the event).

// Example:-
const button = document.querySelector('button');
button.addEventListener('click', function (event) {
    console.log(this); // Logs the <button> element
    this.style.backgroundColor = 'blue'; // Changes button color
});



// "this" ki value:
//      global - window
//      function - window
//      method with function - object
//      method with arrow function - window
//      function inside a method - window
//      arrow function inside a method - object
//      class - blank object




// MANUAL BINDING: bind, call, apply
//  ->  call, apply, and bind are built-in methods used to explicitly set the this context of a function.
//  They allow you to dictate exactly which object the this keyword should point to when a function is executed.
// (function ko call karte waqt ap set kar sakte ho ki uski "this" value Kya hogi) 


// 1. call()
//  -> The call() method invokes a function immediately.
//      The first argument passes the object you want to use as this, and any subsequent arguments are passed individually.

// Example:-
const person = { name: "Alice" };

function greet(greeting, punctuation) {
    console.log(`${greeting}, my name is ${this.name}${punctuation}`);
}

// Executes immediately
greet.call(person, "Hello", "!");
// Output: "Hello, my name is Alice!"


// 2. apply()
//  -> The apply() method is nearly identical to call(), and it also executes the function immediately.
//      The only difference is that instead of accepting arguments one by one, it takes them as a single array.

// Example:-
const person = { name: "Bob" };

function greet(greeting, punctuation) {
    console.log(`${greeting}, my name is ${this.name}${punctuation}`);
}

// Arguments are passed inside an array
greet.apply(person, ["Hey", "."]);
// Output: "Hey, my name is Bob."

//  Tip: apply is particularly useful when you already have an array of data that you want to pass into a function dynamically.


// 3. bind()
//  -> Unlike call and apply, bind() does not execute the function right away. Instead,
//      it creates and returns a brand-new copy of the original function with the this context permanently locked to the object you provided.
//  You can invoke this new function whenever you need it in the future.

// Example:-
const person = { name: "Charlie" };

function greet(greeting, punctuation) {
    console.log(`${greeting}, my name is ${this.name}${punctuation}`);
}

// Returns a new function; does NOT execute yet
const boundGreet = greet.bind(person);

// Run it later
boundGreet("Hi", "...");
// Output: "Hi, my name is Charlie..." 
