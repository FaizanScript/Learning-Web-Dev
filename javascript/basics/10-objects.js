// objects - objects are dynamic collections used to store related data and more complex entities. While primitive data types (like numbers or strings) store a single value, objects act as "containers" for multiple values structured as key-value pairs.

let obj = {
    name: "faizan",
    age: 26,
    dish: "biryani",
};
console.log(obj);



// dot and bracket notation

 // accessing the object's key using .(key)
 // Dot Notation (obj.key)
 // Static: It looks for the property named "key" exactly as written.
 // Limited: It only works with valid JavaScript identifiers (no spaces, can't start with a number, no special characters like hyphens).
 // Standard: It is generally preferred because it’s cleaner and easier to read.

console.log(obj.age);

//or can be accessed by brackets
// Bracket Notation (obj['key'])
// Dynamic: It evaluates whatever is inside the brackets first. This means you can use variables to access properties.
// Flexible: It can handle any string, including those with spaces, numbers, or special characters (e.g., obj['first-name']).
// Literal usage: If you put a string in quotes inside brackets (like obj['key']), it acts exactly like obj.key.

console.log(obj["dish"]); 



// nesting and deep access

//nesting - A nested object is an object that is stored as a property value within another object.
const user = {
    name: "faizan",
    address: {
        city: "jharkhand",
        pin: 462001,
        location: {
            lat: 23.5,
            lng: 77.2,
        },
    },
};

// deep access - deep access refers to retrieving a value from a "nested" or "deep" object—where objects are stored inside other objects, creating a multi-layered hierarchy

console.log(user.address.location.lng);



// Object destructuring - it allows you to "unpack" properties from an object and assign them directly to variables. It provides a more concise, readable way to extract data without repeatedly using dot or bracket notation
let {lat, lng} = user.address.location;
console.log(lat, lng);



// looping

// for-in loop - the for...in loop is specifically designed to iterate over the enumerable properties (keys) of an object

let object = {
    name: "faizan",
    age: 20,
    email: "batmanfrommcu@gmail.com",
};

for (let key in object) {
    console.log(key, object[key]);
}


// object.keys - Object.keys() is a built-in static method that takes an object as an argument and returns an array of its property names (keys)

console.log(Object.keys(object));

//object.entreis - Object.entries() as a way to "unpack" a JavaScript object into a list that is easier to loop through

console.log(Object.entries(object));



// copying objects

// spread(...)
let obj2 = {...obj};
console.log(obj2);

// deep clone - deep cloning  creates a complete, independent copy of an object. Unlike a shallow clone, which only copies top-level properties and keeps references to nested objects, a deep clone ensures that every level of the object is duplicated

let clone = JSON.parse(JSON.stringify(user));
console.log(clone);



// optional chaining - Optional chaining is a operator (?.) that lets you safely access nested properties, methods, or array elements without manually checking if each level exists.
// Instead of throwing a TypeError if a reference in the chain is null or undefined, the expression short-circuits and returns undefined.

console.log(user?.address?.city);

// computed properties - it allow you to use a variable or an expression as an object property name (key) at the moment you create the object
// Instead of hardcoding a name like name: "Alice", you can use square brackets [ ] to calculate what the property name should be

let role = "admin";

let objects = {
    name: "faizan",
    age: 20,
    email: "xyzgmail.com",
    [role]: "chotu",
};
console.log(objects);
