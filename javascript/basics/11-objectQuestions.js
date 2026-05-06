// create an object for a student with name, age, and isEnrolled

let obj = {
    name: "faizan",
    age: 20,
    isEnrolled: true,
};
console.log(obj);

// can an object key be a number or boolean? try this

const obj2 = {
    true: "yes",
    42: "answer",
};
console.log(obj2[true]); // ans - yeah a boolean can be a key
console.log(obj2[42]); // ans - yeah a number can be a key

// access the value of "first-name" from this object

let obj3 = {
  "first-name": "faizan",  
};
console.log(obj3["first-name"]);

// given a dynamic key, let jey = "age", hw will you access usere[key]?

let key = "age";
const obj4 = {
    age: 26,
};
let a = obj4[key];
console.log(a);

// from the object below, print the latitude

let obj5 = {
    city: "jharkhand",
    coordinates: {
        lat: 32.1,
        lng: 23.2,
    },
};

console.log(obj5.coordinates.lat);

// what will happen id coordinates is misssing? how can you prevent errors?

console.log(obj5?.coordinates?.lat);

// destructure the city and lat from the location object above

let {city} = obj5;
let {lat} = obj5.coordinates;
console.log(city, lat);

// destrucutre the key "first-name" as a variable called firstname.

let obj6 = {
    "first-name": "faizan",
};

let { "first-name": firstname } = obj6;
console.log(firstname);

// use for-in loop to log all keys in this objects

const obj7 = {
    title: "javascript",
    duration: "10 hrs",
};

for (let key in obj7) {
    console.log(key, obj7[key]);
};

// use object.entries() to print all key-values paris as:
//title: javascript
//duration: 10 hrs

Object.entries(obj7).forEach(function (val) {
    console.log(val[0]+": "+val[1]);
});

// copy this object using spread operator

const org = {
    a: 1,
    b: 2,
};

let duplicate = {...org};
console.log(duplicate);

// deep clone this object safely

const obj8 = {
    info: {
        score: 80,
    },
};

let clone = JSON.parse(JSON.stringify(obj8));
clone.info.score = 100;
console.log(clone);

// rewrite this safely using optional chaning

const person = {};
console.log(person?.profile?.name);

// use a variable to dynamically assugn a property

const key = "role";
let obj9 = {
    name: "faizan",
    [key]: "admin",
};