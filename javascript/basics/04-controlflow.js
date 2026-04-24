//control flow -> Control flow decides which code runs, when it runs, and how many times it runs. It's like decision-making + direction in your JavaScript program. If operators are the verbs, control flow is the traffic signal.

//if else -> An if-else statement is a fundamental control flow structure in programming that allows decisions to be made, executing specific code blocks based on whether a condition is true or false. If the condition is true, the if block runs; otherwise, the else block runs
if (condition) {
    //runs if the condition is true
} else {
    // runs if the if condition is false
}

//example
let gender = "male";
if (gender === "male") {
    console.log("male");
} else {
    console.log("female");
}

//if else if -> An if-else if-else statement is a control flow structure in programming that enables testing multiple conditions in sequence, executing the block of code for the first true condition. It extends the basic if-else by adding intermediate else if clauses to handle multiple, distinct outcomes
if (condition) {
    //runs if the condition is true
} else if (anothercondition) {
    //runs if the first condition is false and second is true
} else {
    //runs if non are true
}

//example
let marks = 78;
if (marks >= 90) {
    console.log("A");
} else if (marks >= 75) {
    console.log("B");
} else {
    console.log("C");
}



//switch-case -> A switch-case statement is a control flow structure in programming used to execute different blocks of code based on the value of a single variable or expression
switch (value) {
    case value1:
        // code
        break;
    case value2:
        // code
        break;
    default:
    // fallback
}

//example
let fruit = "apple";
switch (fruit) {
    case "banana":
        console.log("Yellow");
        break;
    case "apple":
        console.log("Red");
        break;
    default:
        console.log("Unknown");
}

let weather = "rainy";
switch (weather) {
    case "sunny":
        console.log("light-cloths");
        break;
    case "rainy":
        console.log("waterproof-cloths");
        break;
    case "windy":
        console.log("windbreaker-cloths");
        break;
    case "cold":
        console.log("layered-cloths");
        break;
    default:
        console.log("be naked");
}



//early return pattern -> Used in functions to exit early if some condition fails.

//example
function checkAge(age) {
    if (age < 18) return "Denied";
    return "Allowed";
}



//practice questions

//grades
function getgrade(score) {
    if (score >= 90 && score <= 100) return "A";
    if (score >= 80 && score <= 89) return "B";
    if (score >= 70 && score <= 79) return "C";
    if (score >= 60 && score <= 69) return "D";
    if (score >= 33 && score <= 59) return "E";
    if (score >= 0 && score <= 32) return "Fail";
    return "invalid marks";
}
console.log(getgrade(69));

//rock-paper-scissors
function rps(user, computer) {
    if (user === computer) return "draw";

    if (user === "rock" && computer === "scissor") return "user";
    if (user === "scissor" && computer === "paper") return "user";
    if (user === "paper" && computer === "rock") return "user";

    return "computer"
}

//age checker
function agechecker(age) {
    if (age >= 18) return "adult";
    if (age >= 14) return "teen";
    if (age >= 10) return "kid";

    return "senior";
}
