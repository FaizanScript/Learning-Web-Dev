// (koi bhi code js mein line by line chalega aur ye natural pattern bhi hota hai ki code lilne by line chale,
// but kabhi kabaar aisa cases aate ahi life mein jaha par aapka code wait karta hai and utni der mein agla code chal jaata hai)


// SYNCHRONOUS

//      (sync: aisa code jo line by line chale, wo hota hai sync code)

// Synchronous: synchronous execution means that the code is executed line by line, in a sequential and predictable order.
//       JavaScript is inherently a single-threaded language, which means it has only one call stack and can only do one thing at a time.

// Example:-
console.log("Step 1: Start");

function processData() {
    console.log("Step 2: Processing...");
}
processData();

console.log("Step 3: End");



// ASYNCHRONOUS

//      (async: aisa code jo jab chalne ke liye ready ho jaaye tab chale, wo hai async)

// Asynchronous: Asynchronous JavaScript is a programming approach that allows your code to start a long-running task (like fetching data from a server or loading a file) 
// and continue executing other code at the same time, rather than freezing the application until the task finishes.

// Example:-
console.log("Start");

// This starts a 2-second timer in the background and immediately moves to the next line
setTimeout(() => {
    console.log("Async Task Complete");
}, 2000);

console.log("End");

// Output Order:
// 1. "Start"
// 2. "End"
// 3. "Async Task Complete" (after 2 seconds)


// How Asynchrony Works: The Event Loop
//      JavaScript manages asynchronous behavior using three main native structures:

// Call Stack: Where your synchronous code is tracked and executed line-by-line.
// Web APIs / Node.js APIs: Where asynchronous tasks (like setTimeout, fetch() requests, or event listeners) are sent to run in the background.
// Callback Queue (Task Queue): Once a background task finishes, its completion function (callback) is pushed here to wait.
// Event Loop: The supervisor. It constantly checks the Call Stack. If the stack is completely empty, it takes the first task from the Callback Queue and pushes it onto the stack to be executed.


// How to Write Asynchronous JavaScript
//      Over time, JavaScript has evolved to provide three primary ways to handle asynchronous results:

// Callbacks: Passing a function as an argument to be executed later. (Can lead to "Callback Hell" if deeply nested).

// Promises: Objects representing the eventual completion (or failure) of an asynchronous operation. They use .then() and .catch() blocks.

// Async/Await: Modern syntactic sugar built on top of Promises. It makes asynchronous code look and read like clean, synchronous code.


// Q - Synchronous vs Asynchronous

//  -> The core difference is that synchronous JavaScript is blocking and executes line-by-line,
//      whereas asynchronous JavaScript is non-blocking and allows other tasks to run in the background while waiting for a long-running operation to finish.
//  Because JavaScript is a single-threaded language, it can only do one thing at a time.
//  Asynchronous patterns are essential to keep web applications responsive so they don't freeze up while loading data.



// callback pattern and callback hell

// CALLBACK PATTERN

// CallBack function: the callback pattern is a foundational design pattern where a function is passed as an argument to another function, to be executed ("called back") at a later time.
//      Because JavaScript is single-threaded and relies heavily on non-blocking operations, callbacks are essential for handling tasks that take time—such as API requests, file reading, or user events.
// (ek function ko agar app ek aur function me bhej rahe ho parameter mein, to wo parameter waala function kehlaata hai callback)

// Example:-
// A function that simulates fetching data from a database
function fetchUser(userId, callback) {
    setTimeout(() => {
        const user = { id: userId, username: "Dev_Jay" };
        callback(user); // Executing the callback with the result
    }, 1000);
}

// Using the callback
fetchUser(101, (user) => {
    console.log(`User loaded: ${user.username}`);
});


// CALLBACK HELL

// Callback Hell: Callback Hell (also known as the Pyramid of Doom) is a common anti-pattern in JavaScript where multiple nested callback functions are chained together to handle sequential asynchronous operations.
//  This causes the code to grow horizontally instead of vertically, making it incredibly difficult to read, maintain, and debug.

// Example:-
// The Pyramid of Doom
getUser(userId, (user) => {
    getOrder(user, (order) => {
        processPayment(order, (paymentStatus) => {
            sendEmail(paymentStatus, (receipt) => {
                console.log("Order complete! Receipt sent:", receipt);
            });
        }, (paymentError) => { handlePaymentError(paymentError); });
    }, (orderError) => { handleOrderError(orderError); });
}, (userError) => { handleUserError(userError); });


// Why it (callback hell) is a Problem:
//      Poor Readability: The code drifts far to the right, forcing developers to track complex indentation and matching brackets.
//      Messy Error Handling: You have to manually handle errors at every single level, leading to duplicated, fragmented code blocks.
//      Inversion of Control: When passing a callback to a third-party function, you surrender control over your code. You cannot guarantee if, when, or how many times that external function will actually execute your callback.


// THE SOLUTION OF CALLBACK HELL

//      // promises: resolve, reject, then, catch

// PROMISES

// promises: A Promise in JavaScript is an object that acts as a placeholder for the eventual result of an asynchronous operation.
//   It allows you to write asynchronous code (like API fetches, file reading, or timers) that behaves similarly to synchronous code, preventing your program from freezing while waiting for a task to finish.
// (app ek promise banate ho jo ki do states mein se ek state me jaa sakta hai and wo yaa to resolve hoga ya to reject hoga ab wo kya hoga ye to waqt bataayega par humein dono ke liye code likhna padta hai)

// The 3 States of a Promise
// A promise always exists in one of three mutually exclusive states:

// 1. Pending: The initial state. The asynchronous operation is still running.
// 2. Fulfilled: The operation completed successfully, returning a final value.
// 3. Rejected: The operation failed, returning an error or reason for failure.

// Once a promise is either fulfilled or rejected, it is considered settled and its state can never change again.


//  Creating a Promise
//      You create a promise using the "new" Promise constructor. It takes a callback function called the executor,
//  which automatically receives two function arguments: resolve and reject.

const checkServerStatus = new Promise((resolve, reject) => {
    let isServerUp = true; // Simulating a condition

    setTimeout(() => {
        if (isServerUp) {
            resolve("Server is running smoothly!"); // Moves state to Fulfilled
        } else {
            reject(new Error("Server is down."));   // Moves state to Rejected
        }
    }, 1000);
});

// Consuming a Promise
//      To handle the results of a promise, JavaScript provides instance methods to handle the outcome once it settles.
//  .then(): Runs when the promise is fulfilled.
//  .catch(): Runs when the promise is rejected.
//  .finally(): Runs code regardless of the outcome (often used for cleanup, like turning off loading spinners).

checkServerStatus
    .then((message) => {
        console.log("Success:", message);
    })
    .catch((error) => {
        console.error("Failed:", error.message);
    })
    .finally(() => {
        console.log("Operation complete.");
    });



// async/await syntax, error handling with try-catch

// ASYNC/AWAIT

// async/await: async/await is a special syntax in JavaScript used to handle asynchronous operations (like fetching data from an API or reading a file) in a way that looks and behaves like clean, readable synchronous code.
//   It is built on top of JavaScript Promises and helps you avoid complex .then() and .catch() chains or "callback hell".

// 1. The async Keyword
//      You place the async keyword before any function declaration. This tells JavaScript that the function will handle asynchronous operations and always return a Promise.
//  If you return a direct value (like a string or a number) inside the function, JavaScript automatically wraps it in a resolved Promise.

// Example:-
async function greet() {
    return "Hello World";
}

// Calling it returns a Promise, not a direct string
greet().then(value => console.log(value)); // Logs: "Hello World"


// 2. The await Keyword
//      The await keyword can only be used inside an async function (or at the top level of a JavaScript Module).
//  When placed before a Promise, it pauses the execution of the function until that Promise resolves or rejects.
//  While the function execution is paused, the rest of your main JavaScript thread keeps running without blocking the browser or application.

// Example:-
// A fake API function that takes 2 seconds to resolve
function fetchUserData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ name: "Alex", age: 28 }), 2000);
    });
}

// Using async/await to consume the Promise
async function displayUser() {
    console.log("Fetching user...");

    // Pauses here for 2 seconds until the Promise resolves
    const user = await fetchUserData();

    // This line only runs AFTER the promise resolves
    console.log(`User found: ${user.name}`);
}

displayUser();


// 3. Error Handling with try...catch
//      Instead of using .catch(), async/await allows you to use standard, readable try...catch blocks to handle errors.
//  If an awaited Promise rejects, JavaScript throws the rejection error, which triggers the catch block.

// Example:-
async function getDashboardData() {
    try {
        const response = await fetch("https://example.com");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Oops, something went wrong:", error);
    }
}
