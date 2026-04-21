//Data Types

//Primitive -> aisi saari value jinko copy karne par ek real copy mil jaye (copied by value)

//Primitive data type -> string, number, boolean, null, undefined, symbol, bigint

//String
const name = "harsh";
const Name = 'harsh';
const namE = `harsh`;

//number
const age = 12;
const Age = 12.3; 

//boolean (true and false)
const a = true;
const b = false;

//null (when you intentinolly doesnt give any value)
const selectStudent = null;

//undefined (when you make a variable and didnt give any value then its default value will be undefined)
const a; // here a value will be undefined

//symbol (unique immutable value)
// future me hum koi libreries use karegnge ab is case me un ilbreries me kai baar kuch fields hoti hai jinse similar hum bhi bana dete hai aur galti se humari banai hui feilds us library ki original feilds ko change(override) kar deta hai

const obj = {
    uid: 1,
    name: "faizan",
    age: 20,
}
let u1 = Symbol("uid");
obj[u1] = "001";

//bigint (very large integer)
const bigint =  987654321n;



// Reference -> inko copy karne par real copy nahi milegi but reference milega parent ka (copied by reference)
// Reference data type -> objects, arrays, functions 

//arrays
const array = [1, 2, 3];
const array2 = array; // if you change any array or array2 value both gonna be affect because array is reference type and it doesnt passes value it passes reference

//objects
const a = {
    name: "faizan"
};
const b = a; //same goes with here



// dynamic typing -> js mein static typing nahi hai and yaha par hai dynamic typing jiska matlab hai app data ko change kar sakte ho kyuki yaha par dynamic data types hai (you can change the type of data of a variable many)
let d = 12;
d = true;
d = "faizan";
d = [];
d = null;
d = undefined;



// typeof quirks (e.g., typeof null == 'object')



// type coercion (== vs ==) -> it is a cencept jismein aapka ek type automatically covert hojaayega

// String Coercion (+ operator): If any operand is a string, JavaScript converts the other operand(s) to strings and performs concatenation.
// Example: "5" + 2 results in "52".

// Numeric Coercion (other math operators): Operators like -, *, and / always attempt to convert operands to numbers.
// Example: "10" - 5 results in 5.

// Boolean Coercion: Values are coerced to booleans in logical contexts like if statements or using logical operators (&&, ||, !).
// Falsy values: false, 0, "" (empty string), null, undefined, and NaN.
// Truthy values: Everything else, including empty objects {} and arrays [].

// Equality Coercion (==): The loose equality operator performs coercion before comparing values.
// Example: 5 == "5" is true, while the strict equality operator 5 === "5" is false because it does not allow coercion



// truthy vs falsy values -> truthy and falsy refer to how non-boolean values (like numbers or strings) are treated when they are evaluated in a boolean context, such as an if statement or a loop.

//falsy values
// 0 false "" null undefined NaN document.all

if(0) {
    // here 0 means that its false cuz its falsy values
}

//truthy values
// anything except falsy value (all - falsy) is truthy values

if(69) {
    //here 69 means that its true cuz its not in falsy values 
}