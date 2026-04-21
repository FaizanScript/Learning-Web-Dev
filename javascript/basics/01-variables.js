// var let const

// var(dont use)
var a = 10;
    // window me add hota hai
    // function scoped hota hai
    // firse declare kar sakte hai same name se and error nahi ayega


// let
let a = 10;
    // block scoped hota hai
    // firse reassign kar sakte hai but firse declare nahi kar sakte hai with the same name


// const
const a = 10;
    // block scoped hota hai
    // firse reassign kar sakte hai but firse declare nahi lkar sakte hai with the same name



// declarations and initialization
var a; // declare
var a = 10; // declare and initialize


// scope (global, block and functional)

// global
var a = 10;
    // jo curly braces ke bahar create hota thats global scoped
    // it can be used anywhere is the programm


// block
{
    let a = 10;
    // jo curly braces ke andar use hota hai thats block scoped(let always used in its parent curly bracses)
    // it can only be used inside its block
    // but if you create a var inside a block, that can be used anywhere is the program buz var is a function scoped, it doesnt respect block 
}

function abcd(){
    let a = 10; //Variables accessible only within the function.
}


// reassignment and redeclaration

// reassignment
let b = 123;
b = 321;

// redeclaration
var b = 123;
var b = 321;
    // redeclaration is possible with var (its a problem)


// temporal dead zone

// tdz - utna area jitna mein js kp pata to hai ki variable exist karta hai par wo apko value nahi de sakta

console.log(a);

let a = 69;



// hoisting impact per type

// hoisting -> ek variabl ko jab js mein create karte hai to wo variable do hisso mein toot jata hai and uska declare part upar(line 1) top of the program me chala jata hai and uska intialization part neeche hi reh jata hai
// hoisting teeno var, let and const me hoti hai
var -> hoist -> undefined
let -> hoist -> X error
const -> hoist -> X error