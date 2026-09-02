// SCOPE

// scope: scope refers to the current context of execution where variables, functions, and objects are visible or can be accessed.
//      If a variable is not within the current scope, JavaScript will not allow you to use it and will typically throw a ReferenceError.
//  (scope ho hai ke, app apne created variable and functions kaha tak use kar sakte hai)

// Types of Scope: 1. Global Scope, 2. Function Scope(local Scope), 3. Block Scope

// 1. global Scope - Any variable declared outside of any function or block belongs to the global scope.
//          These variables can be accessed and modified from absolutely anywhere in your JavaScript file.

// Example:-
const globalVar = "I am everywhere!";

function test() {
    console.log(globalVar); // Accessible inside functions
}


// 2. function scope(local Scope) - When you declare a variable inside a function, it is local to that function.
//       It can only be seen and used within that specific function's boundaries.

// Exmaple:-
function sayHello() {
    var secret = "Invisible outside!";
    console.log(secret); // Works perfectly
}

console.log(secret); // Throws ReferenceError


// 3. Block Scope - block scope applies to any code written inside curly braces {}, such as if statements, for loops, or while loops.

// Example:-
if (true) {
    let blockScoped = "Hidden";
    var leaked = "I escaped!";
}

console.log(leaked);       // Logs: "I escaped!"
console.log(blockScoped);  // Throws ReferenceError



// ADVANCED SCOPE CONCEPTS

// 1. LEXICAL SCOPING: JavaScript uses a "static" or "lexical" scope mechanism. 
//      This means the scope of a variable is determined by where it is written in the source code, not where the function is ultimately called.
//  Inner functions always have access to the variables of their outer functions.


// 2. THE SCOPE CHAIN:  When JavaScript tries to resolve a variable name, it starts looking in the immediate local scope. 
//      If it can't find it, it moves one step outward to the parent scope. It keeps searching up the "family tree" until it reaches the global scope.
//  If it still can't find it there, it throws an error.



// EXECUTION SCOPE

// Execution Context: An Execution Context is an abstract(existing only as an idea) environment created by the JavaScript engine to evaluate and execute code.
//      Think of it as an isolated container or box that holds all the variables, functions, and scopes necessary for a specific piece of code to run.
//  Everything that happens in JavaScript occurs inside an execution context.
// (js sabse pehle jaise hi apka function dekhta hai sabse pehle js banata hai execution context, ye ek process hai jo ki do different phases mein chalta hai,
//  memory phase and doosra ka naam hai execution phase) 


// The Anatomy of an Execution Context:
//          Every execution context is split into two distinct components:

// 1. Memory Component (Variable Environment): This is where variables and functions are stored as key-value pairs before the code even runs.

// 2. Code Component (Thread of Execution): This is the place where your code is executed line by line, sequentially.


// How Code Runs: The Two Phases
//      Whenever JavaScript processes code, the execution context moves through two continuous phases:

// 1. Creation Phase (Memory Allocation)
//      The engine scans the code to set up memory space for your declarations.

// - var variables are allocated memory and given a default placeholder value of undefined.
// - let and const variables are allocated memory but remain uninitialized in a "Temporal Dead Zone" (TDZ).
// - Function declarations are stored entirely in memory as a direct reference to the function body. 
// This phase is what gives rise to the behavior known as Hoisting.


// 2. Execution Phase
//      The JavaScript engine runs the code line-by-line. It assigns actual values to your variables and executes any functions it encounters.



// CLOSURE DEFINATION AND HOW VARIABLES ARE PRESERVED

// closure: a closure is a feature where an inner function retains access to the variables of its outer (enclosing) function, even after the outer function has finished executing.
//      (closure hote hai functions jo ki kisi parent function ke andar ho aur andar wala function return ho raha ho, and returing function use kare parent function ka koi variable)

// You can think of a closure as a function carrying around a "backpack" that contains all the variables that were in its environment when it was created.
// (ye sach hai ki function ke khatam hone par aapka function and uske variables khtm hojaate hai,
//  par jab bhi closure banta hai to aapka function aur uske variables ka ek backlink(copy) banaya jaata hai, aur uska naam hota hai [[environment]])

// Example:-
function outerFunction() {
    const outerVariable = "I am from the outer scope!";

    function innerFunction() {
        // innerFunction forms a closure over outerVariable
        console.log(outerVariable);
    }

    return innerFunction;
}

// Execute outerFunction and assign the returned innerFunction to a variable
const myClosure = outerFunction();

// outerFunction has completely finished executing here, 
// yet myClosure still remembers 'outerVariable'!
myClosure(); // Output: "I am from the outer scope!"


// USE CASES

// PRIVATE COUNTER
function countForMe() {
    let c = 0;
    return function () {
        c++;
        console.log(c);
    };
}

let fnc = countForMe();
fnc(); // output: 1
fnc(); // output: 2
fnc(); // output: 3


//  ENCAPSULATION
function cliclLimiter() {
    let click = 0;
    return function () {
        if (click <= 5) {
            click++;
            console.log(`clicked : ${click} times`);
        } else {
            console.error("LIMIT EXCEEDED, try after sometimes")
        }
    };
}

let fnc2 = cliclLimiter();
fnc2(); // output: clicked : 1 times
fnc2(); // output: clicked : 2 times
fnc2(); // output: clicked : 3 times
fnc2(); // output: clicked : 4 times
fnc2(); // output: clicked : 5 times