// Pure vs impure functions

// PURE FUNCTION

// Pure Function: A pure function in JavaScript is a function that behaves like a predictable math formula.
//       To be considered pure, a function must strictly satisfy two core requirements: it must always return the same output for the same input,
//     and it must produce zero side effects. Pure functions form the foundation of functional programming and make your code significantly easier to test, debug, and maintain.


// The Two Golden Rules of Pure Functions:-

// 1. Identical Input = Identical Output
//      If you pass the exact same arguments into a pure function 100 times, it will return the exact same result every single time.
//   It cannot rely on any external, changing variables or hidden states.

// ❌ Impure Example: The output changes depending on an external variable.
let tax = 0.05;
const calculateTotal = (price) => price + (price * tax);
// If 'tax' changes elsewhere in the code, the same input yields a different output.


// ✅ Pure Example: The output relies strictly on its parameters.
const calculateTotal = (price, taxRate) => price + (price * taxRate);
// calculateTotal(100, 0.05) will ALWAYS return 105.


// 2. No Side Effects
//      A pure function must not modify anything outside of its own block of code. It lives in absolute isolation.

//  Common side effects that make a function impure include:
//      1. Mutating (modifying) input arguments or global variables.
//      2. Making HTTP / API network calls.
//      3. Manipulating the DOM.
//      4. Writing to a database or local storage.
//      5. Even console.log() statements (because they modify the external state of the screen/console).
//      6. ❌ Impure Example (Mutating Data): Modifies the original object passed into it.
const createUser = (user) => {
    user.role = 'admin'; // Modifies the original object outside the function!
    return user;
};
//      7. ✅ Pure Example (Immutability): Creates a brand new object instead of changing the original.
const createUser = (user) => {
    return { ...user, role: 'admin' }; // Returns a new object using the spread operator
};


// Pure Methods: map(), filter(), reduce(), concat(), slice(). These all return a new value or array without altering the original data.



// IMPURE FUNCTION

// Impure Function: An impure function in JavaScript is a function that either produces different outputs when given the same inputs, or causes side effects by interacting with or modifying the world outside its local scope.
//      While functional programming paradigms favor pure functions for predictability, impure functions are entirely necessary in JavaScript to interact with databases, update user interfaces, and handle asynchronous events.


// Core Characteristics of Impure Functions
//      Core Characteristics of Impure Functions:

// 1. Non-Deterministic (Unpredictable Output): Calling the function with the exact same arguments can result in different return values.
//       This happens when a function relies on changing external data, current time, or random number generators.

// 2. Side Effects: The function modifies variables outside its local scope, changes an object's internal state, writes to a file, logs to a console, or performs network requests.


// Common Examples of Impure Functions:

// 1. Modifying a Variable Outside Its Scope
//      This function modifies a variable defined outside of its own block, introducing side effects.
let totalScore = 0;

function addToScore(points) {
    totalScore += points; // Side effect: mutates external state
    return totalScore;
}

console.log(addToScore(5)); // Output: 5
console.log(addToScore(5)); // Output: 10 (Same input, different output!)

// 2. Mutating the Input Arguments
//       Modifying arrays or objects passed as arguments alters the data globally for other parts of the application.
function addNewUser(userList, newUser) {
    userList.push(newUser); // Side effect: mutates the original array
    return userList;
}

const team = ["Alice", "Bob"];
addNewUser(team, "Charlie");
console.log(team); // Output: ["Alice", "Bob", "Charlie"] -> The original array was changed!


// 3. Relying on Inherent JavaScript Impurities 
//      Any function that uses built-in JavaScript tools like Math.random(), Date.now(), or fetch() is automatically impure because their environments or states change constantly.
// Non-deterministic: output changes every millisecond
function getCurrentTimestamp() {
    return Date.now();
}

// Non-deterministic: relies on global random state
function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}


// Built-in Impure JavaScript Methods
//      Many native JavaScript prototype methods are inherently impure because they mutate data in place:

// 1. Array Mutators: push(), pop(), splice(), shift(), unshift(), sort(), and reverse().
// 2. Global Utilities: Math.random(), Date.now().
// 3. I/O Operations: console.log() and alert() (they alter the state of the console/window).
// 4. Network / Async: fetch(), axios.get(), and Promise resolutions.



// Functional programming basics(map/filter/reduce as pipeline)

// FUNCTIONAL PROGRAMMING

// Functional Programming: Functional programming (FP) is a coding paradigm that treats computation as the evaluation of mathematical functions, avoiding changing state and mutable data.
//       While JavaScript was not born as a purely functional language, it supports functional programming "out of the box"
//   because its functions are first-class citizens—meaning they can be stored in variables, passed as arguments, and returned from other functions.



// SEPARATION OF CONCERNS (SoC)

// Serparation of Concerns (SoC): Separation of Concerns (SoC) is a fundamental software design principle where a computer program is divided into distinct sections, with each section addressing a separate "concern" or responsibility.
//       In JavaScript development, this means organizing your code so that different features, logic types, and presentation layers do not overlap or tangle together.
//  (DOM ka code and logic ka code alag rehna chahiye) 

// The Architecture of JavaScript SoC
//      Whether you are working on the frontend (browser) or backend (Node.js), applying SoC generally involves dividing your code into three primary layers:

// 1. Presentation Layer (The UI)
//      What it does: Displays data to the user and captures user events (like clicks or typing).
//      Rule: It should contain zero complex calculations or direct database queries. It only receives processed data and renders it.

// 2. Business Logic Layer (The Brains)
//      What it does: Dictates the rules of your application. For example, validating user inputs, formatting dates, filtering lists, or calculating totals.
//       Rule: This logic should be environment-agnostic. It shouldn't care where the data goes, only how it should behave.

//  3. Data/Infrastructure Layer (The Storage)
//      What it does: Manages how data is fetched or stored (e.g., API calls via fetch or Axios, database queries, LocalStorage interactions).
//      Rule: It only knows how to move data around and returns raw or structured data back to the business layer.


// Practical Code Example:
//      Consider a feature that fetches a user profile from an API and displays it on a webpage.

// ❌ The Bad Way: Mixed Concerns (Tightly Coupled)
//      In this example, API fetching, business logic (formatting the name), and DOM manipulation are all smashed into a single function.
//   This is fragile and difficult to test.
// Everything mixed together in one file/function
async function displayUserProfile(userId) {
    // 1. Data Fetching Concern
    const response = await fetch(`https://example.com{userId}`);
    const user = await response.json();

    // 2. Business Logic Concern
    const fullName = `${user.firstName} ${user.lastName}`.toUpperCase();

    // 3. Presentation Concern
    const profileDiv = document.getElementById('user-profile');
    profileDiv.innerHTML = `<h1>${fullName}</h1><p>Email: ${user.email}</p>`;
}

// The Good Way: Separated Concerns (Modular)
//      By breaking the function into distinct parts, each file or function now owns a single responsibility.
// 1. Data Layer (userService.js)
export async function fetchUserData(userId) {
    const response = await fetch(`https://example.com{userId}`);
    return response.json();
}

// 2. Business Logic Layer (userFormatter.js)
export function formatUserName(user) {
    return `${user.firstName} ${user.lastName}`.toUpperCase();
}

// 3. Presentation Layer (userUI.js)
import { fetchUserData } from './userService.js';
import { formatUserName } from './userFormatter.js';

export async function renderProfile(userId) {
    try {
        const user = await fetchUserData(userId);
        const formattedName = formatUserName(user);

        document.getElementById('user-profile').innerHTML = `
      <h1>${formattedName}</h1>
      <p>Email: ${user.email}</p>
    `;
    } catch (error) {
        document.getElementById('user-profile').innerHTML = `<p>Error loading profile.</p>`;
    }
}



// Custom utilities (e.g. own implementation of map, deep clone) -> learn deep clonefrom the seperate video of deep clone & shallow copu from sheriyans channel.



// How JS works in browser (event loop, web APIs, call stack, microtask Queue)

// -> JavaScript runs inside the browser as a single-threaded language, meaning it can only execute one piece of code at a time using a single Call Stack.
//       To handle long-running operations—like network requests or timers—without freezing the user interface,
//   the browser provides an ecosystem consisting of Web APIs, the Callback (Task) Queue, the Microtask Queue, and the Event Loop.
// (JS single-threaded language hai, matlab ek time par ek hi kaam karta hai. Jab tum function call karte ho to wo stack ke top pe chala jata hai and wo function complete hone ke baad stack se nikal jata hai (pop ho jata hai))


// The Core Components:

// 1. The Call Stack (LIFO):
//      The engine uses a Last-In, First-Out stack to keep track of function execution. When you call a function, it is pushed onto the stack. When the function finishes executing, it is popped off the stack.

// 2. Web APIs:
//      These are background features provided by the browser environment (not the JavaScript engine itself).
//   They handle asynchronous tasks like setTimeout, fetch() network requests, and DOM event listeners. Because the browser handles these in the background on separate threads, they do not block the main JavaScript Call Stack.

// 3. Callback Queue (or Macrotask Queue / FIFO):
//      A First-In, First-Out queue where traditional asynchronous callbacks sit after their Web API background task completes.
//   For example, when a setTimeout timer finishes counting down, its callback function is moved here to await execution.

// 4. Microtask Queue:
//       A separate, higher-priority queue reserved specifically for Promise callbacks (.then, .catch, .finally), async/await continuations, and APIs like MutationObserver.

// 5. The Event Loop:
//      The orchestrator. Its single job is to continuously monitor both the Call Stack and the queues. If the Call Stack is completely empty, the Event Loop coordinates moving waiting tasks from the queues into the Call Stack to be executed.


// Step-by-Step Execution Workflow:

// 1. Synchronous Code: JavaScript executes code line-by-line in the Call Stack.

// 2. Offloading Asynchronous Work: When an async function (like setTimeout(callback, 1000)) is invoked, it is pushed to the Call Stack, hands the timer task over to the Web APIs, and immediately pops off the stack. The stack remains unblocked and continues running other code.

// 3. Queue Placement: Once the Web API finishes its background task (e.g., 1000ms passes), it pushes the callback function into the Callback Queue. (If it were a resolved Promise, the callback would go to the Microtask Queue instead).

// 4. The Event Loop Check: The Event Loop waits until the Call Stack is completely empty.

// 5. Priority Resolution:
//      1. First, the Event Loop checks the Microtask Queue and executes all pending microtasks until that queue is entirely empty.
//      2. Only after the Microtask Queue is completely drained, the Event Loop takes one task from the Callback Queue and pushes it onto the Call Stack to execute.

// 6. Repeat: The cycle loops continuously for the lifetime of the browser tab.