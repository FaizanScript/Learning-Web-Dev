//functions -> a function is a reusable block of code designed to perform a specific task, only when the function is called

function dance() { //function statement
    console.log("function statement");
}
dance();
dance();

let fnc = function () { //function expression (cannot be hoisted(you cant call them before they're defined))
    console.log("function expression")
}
fnc();

let func = () => { //fat arrow function
    console.log("fat arrow function");
}


// parameter and arguments

// function xyz(//parameters//) {
//     console.console.log("parameter and srguments");
//     }
// xyz(//arguments//);

//examples

function naach(v1) {
    console.log(`${v1} naach raha hai`);
}
naach("ghoda");
naach("gadha");
naach("bail");

function add (v1, v2) {
    console.log(v1 + v2);
}
add(1, 2);
add(6, 7);
add(6, 9);


function undefined(v1, v2) {
    console.log(v1, v2); //it will print undefined cux we didnt pass any values in the arguments and empty variables value is always undefined
}
undefined();

function nan(v1, v2) {
    console.log(v1 + v2); //it will print NaN cuz we didnt pass any value in the arguments and when we add two non numbers it gives NaN
}
nan();


//default parameters
function adittion(v1 = 0, v2 = 0) {
    console.log(v1 + v2); //here it will print 0 buz we declread 0 as a default value, and if we pass any values in the argumetns the the arguments vlaue will be prioritize
}
adittion();


//rest parameters - jab arguments kai saare ho to humein utne hi parameter banane padegs, issey bachne ke liye, we use rest (...) agar ... function ke parameter mein lage to wo rest operator hai and agar wo arrays and object me lage to wo spread operator hai 
function abcd(...val) {
    console.log(val);
}
abcd(1, 2, 3, 4, 5, 6);

function abc(a, b, c, ...val) {
    console.log(a, b, c, val); //here a b and c will be printed as a normal variable number and the rest(val) will be printed in an array
}
abc(1, 2, 3, 4, 5, 6);


//reutrn -> In JavaScript, the return statement is used to end function execution and specify a value to be sent back to the function caller (matlab jaha se aaye ho wahi daal denge)
// Exiting the function: It immediately stops the execution of the function; any code written after it within the same function block will not be executed.
// Outputting a result: It passes a specific value (e.g., a number, string, object, or another function) back to the line of code that called the function. (to store the returned value you have to declare a variable in the caller, otherwise the value wont be stored)

function abcde() {
    return 12;
}
let a = abcde();
console.log(a);

function abcdef(v) {
    return 15 + v;
}
let b = abcdef(5);
console.log(b);


// Implicit undefined: If a function does not include a return statement or uses return; without an expression, it automatically returns undefined.

function un() {
    return;
}
let u = un();
console.log(u);


// Early Exits: You can use multiple return statements in conditional logic (like if statements) to exit a function early based on certain conditions.

function checkage(age) {
    if (age < 18) {
        return "too young"; // stops the function here if condition is met
    }
    return "old enough"; // only runs if the above condition was false
}


//first-class function -> it means that functions are treated like any other variable or value. In practice, this means functions can be used and moved throughout your code with the same flexibility as a string or a number. (functions ko values ki tarah treat kar sakte hai)

// Assigned to Variables: You can store a function in a variable, which is known as a function expression.
let greet = function() {
    console.log("hello");
}

// Passed as Arguments: You can pass one function into another function as a parameter. These are commonly referred to as callback functions.
function ac(val) {
    val();
}
ac(function () {
    console.log("hey");
});


//higher order function -> wo function hota hai jo ki return kare function ya fir accept kare ek function apne parameter me

function hof() {
    return function() {
        console.log("heyhey");
    }
}
hof()();


function gret(name, callback) {
  console.log("Hello, " + name);
  callback(); // The HOF executes the passed function
}

function sayGoodbye() {
  console.log("Goodbye!");
}

gret("Alice", sayGoodbye); 


// pure vs impure function

//pure function -> a function that consistently returns the same output for the same input and does not produce any "side effects (aisa function jo ki baahar ki value of naa badle wo hai pure function)

function purefnc() {
    console.log("pure function"); //its pure function it doesnt change anything in return 
}
purefnc();

//impure function -> an impure function is a function that contains one or more side effects or produces non-deterministic results (aisa function jo baahar ki value ko badal)

let ipfnc = 10;
function impurefnc() {
    ipfnc++;
}
impurefnc();
console.log(ipfnc);


//closures -> a function that "remembers" and can still access variables from its outer scope, even after the parent function has finished executing (ek function jo return kare ek aur function aur reutrn hone wala function humesha use karega parent function ka koi variable)

function closures() {
    let count = 0; //private variable
    return function() {
        count++; //accesses parent variable
        return count;
    };
}
let mycounter = closures();
console.log(mycounter());


//lexical scoping -> the accessibility of variables is determined by their physical location in the source code

function lexicalscope() {
    let a = 12;
    function innerscope() {
        let b = 13;
        function innerschild() {
            let c = 14;
        }
    }
}


//IIFE -> An IIFE (Immediately Invoked Function Expression) in JavaScript is a function that runs or executes as soon as it is defined

(function () {
    console.log("IIFE");
})();


// function hoisting 
// Function Declarations: These are fully hoisted, meaning both the function's name and its body are available before the line they are written on. You can call these functions before they are declared.

grt(); // Output: "Hello!"
function grt() { // this is function statement so this is valild
    console.log("Hello!");
}

invalid();
let invalid = function() { // this is function expression so this is invalid
    console.log("invalid hoisting");
}


//questions

// 01: whats the difference between function declaration and expression in terms of hoisting?
//-> Function declarations are fully hoisted, allowing them to be called before their definition, while function expressions are not hoisted, meaning they can only be used after their definition.

// 02: what does the ... operator mean in parameters?
//-> The ... operator in parameters is known as the rest parameter, which allows a function to accept an indefinite number of arguments as an array.

// 03: use the rest parameter to accept any number of scores and return the total.
function getscores(...score) {
    let total = 0;
    score.forEach(function (val) {
        total = total + val;
    });
    return total;
}
console.log(getscores(10,20,30,40,50,60,70,80,90,100));

// 04: write a code for early exit
function chckage(aGe) {
    if (aGe < 18) return "too young";
    return "allowed";
}
console.log(chckage(23));

// 05: what does it mean when we say "functions are first calss citizens"?
//-> t means that in a programming language, functions are treated just like any other variable, string, or number. This allows functions to be assigned to variables, passed as arguments to other functions, and returned from functions.

// 06: can you assign a function to a variable and then call it? show how
let assign = function() {
    console.log("hello, i am beign called");
}
assign();

// 07: pass a function into another function and execute it inside
function functon(val) {
    val();
}
functon(function() {
    console.log("hey, i am beign called");
});

// 08: what is a higher-order functon?
//-> a function that either takes one or more functions as arguments (callbacks) or returns a function as its result, or both
//either this 
function eitherthis(val) {
   val();
}
eitherthis(function() {
     console.log("either take a function as an arguments");
});
// or this
function orthis() {
    return functon() {
        console.log("or return a function");
    }
}
//or both

// 09: convert this function into a pure function
let total = 0;

function addtotal(num) {
    let newtotal = total;
    newtotal += num;
}

// 10: what is closure? when is it created?
//-> A closure is a function that remembers and accesses variables from its outer (enclosing) lexical scope, even after the outer function has finished executing. Closures are created every time a function is defined inside another function, allowing the inner function to "close over" the outer variables.
function closure() {
    let val = 0;
    return function () {
        console.log(val);
    };
}

// 11: convert this normal function into an IIFE
function iife() { //normal
    console.log("initialized");
}
(function iife() { //IIFE
    console.log("initialized");
})();

//practice question

//write a BMI calculator
function bmi(weight, height) {
    return weight / (height*height);
}
console.log(bmi(70, 1.83).toFixed(2));

//create a greet function with default name
function greeting(name = "faizan") {
    console.log(name);
}
greeting();

// Write a discount calculator (HOF style)
function discount(dis) {
    return function (price) {
        return price - price * (dis / 100);
    };
}
let discounter = discount(10);
console.log(discounter(200));