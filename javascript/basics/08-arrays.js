//Arrays -> a special type of object used to store multiple valaues in a single variable (a box in row which you can store multiple types of vallues)

let marks = [10, 20, 30, 40, 50];

marks[1]; // an array can be accessed by its index no(index no starts from 0) (you can access, update, or overwrite values by its index)

marks[2] = 31; // modifing the array using its index
console.log(marks);


//  arrays methods -> array methods are built-in functions that allow you to perform common operations on arrays, such as adding or removing elements, searching for items, or transforming the data.

marks.push(99); // .push() method is used to add one or more elements to the end of an array
console.log(marks);

marks.pop(); // you call it on an array to remove the very last element
console.log(marks);

marks.shift(); // .shift() is a built-in method used to remove the first element from an array
console.log(marks);

marks.unshift(0); // you call it on an array to add one or more elements to the beginning of an array
console.log(marks);


 // The splice() method is a powerful, "Swiss Army knife" tool for arrays in JavaScript. It allows you to remove, add, or replace elements all at once

 //marks.splice(start, deletecount, item1, item2, ...)
 //start: the index where you want to begin the change
 //deletecount: (optional) how many items to remove starting from the start index
 //item1, ...: (optional) the new element you want to add to the array

let fruits = ["Apple", "Banana", "Cherry", "Date"];
fruits.splice(1, 2); // At index 1, remove 2 items ("Banana", "Cherry")
console.log(fruits); // Result: ["Apple", "Date"]

// adding element without deleting - (set deletecount to 0 to insert items at aspecific spot)
fruits.splice(1, 0, "adrak", "lahsun"); // at index 1, remove 0, add 2 itmes(adrak, lahsun)
console.log(fruits); // Result: ["Apple", "adrak", "lahsun", "date"]

// replacing elements - removing existing items and add new ones in their place
fruits.splice(3, 1, "piyaz"); // at index 3, remove 1 item(date) and add piyaz
console.log(fruits); // // Result: [ "apple", "adrak", "lahusn", "piyaz"]


// .slice() method is used to extract a portion of an array or a string and return it as a new entity. A key feature is that it does not modify the original data.

const Fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple'];

// Extract from index 1 to 3 (exclusive)
const citrus = Fruits.slice(1, 3); 
console.log(citrus); // Output: ['Banana', 'Orange']

// Extract from index 2 to the end
const tropical = Fruits.slice(2); 
console.log(tropical);
// Output: ['Orange', 'Mango', 'Pineapple']


// .reverse()  It is used to flip the order of elements so the first becomes the last and the last becomes the first (This method is destructive; it modifies (mutates) the original array in place)

let no = [1, 2, 3, 4, 5];
no.reverse();
console.log(no); // output: [5, 4, 3, 2, 1]



// .sort() method in JavaScript reorders elements in an array in place, meaning it changes the original array. By default, it treats every element as a string and sorts them alphabetically (lexicographical order)

// baisc string sorting
const fruit = ['banana', 'apple', 'cherry'];
fruit.sort(); 
console.log(fruit); // ['apple', 'banana', 'cherry']

// sorting number(important) - Because .sort() defaults to string sorting, numbers can get messy. For example, "100" comes before "25" because "1" is smaller than "2". To fix this, you must use a compare function
//Ascending: (a, b) => a - b
const numbers = [100, 25, 5, 42];
numbers.sort((a, b) => a - b); 
console.log(numbers); // [5, 25, 42, 100]

// Descending: (a, b) => b - a
const number = [100, 25, 5, 42];
number.sort((a, b) => b - a); 
console.log(number); // [100, 42, 25, 5]

// Sorting Arrays of Objects - To sort objects, pass a function that compares the specific property you care about
const users = [
  { name: 'Bob', age: 30 },
  { name: 'Alice', age: 25 }
];

// Sort by age (ascending)
users.sort((a, b) => a.age - b.age);
console.log(users);


// forEach() method is a handy way to run a function on every item in an array without setting up a traditional for loop.

let arr = [11, 62, 3, 4, 25];

arr.forEach(function (val) {
    console.log(val + 5);
});


// map -> The .map() method in JavaScript is a powerful way to transform data. It creates a new array by applying a function to every element in an original array, without changing the original.
// map sirf tab use karne hai jab aapko ek naya array banana hai pichle array ke data ke basis par (map dikhte hi maan mein ek blank array bana liye karo)
// jab bhi apko aisa koi case dikh jaye jaha par ek array se naya array banega and wo naya array kuch values ko rakhega tab map lagega

let ar = [10, 20, 30, 9, 8];

let newar = ar.map(function (val) {
    if (val > 10) return val;
});
console.log(ar);
console.log(newar);

//  Transforming Numbers - You can use it to perform math on every number in a list.

const numb = [1, 2, 3, 4];
const doubled = numb.map((num) => num * 2);

console.log(doubled); // [2, 4, 6, 8]
console.log(numb); // [1, 2, 3, 4] (Original is unchanged)

// Extracting Data from Objects - It is extremely common for pulling specific properties out of an array of objects

const user = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

const names = user.map((user) => user.name);
console.log(names); // ["Alice", "Bob"]


// filter - .filter() method is used to create a new array containing only the elements that pass a specific test (a condition)

let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

let newa = a.filter(function (val) {
    if (val > 4) return true;
});
console.log(newa);

//  Filtering Numbers - If you want to keep only numbers greater than 10:

const n = [5, 12, 8, 130, 44];
const filtered = n.filter((num) => num > 10);

console.log(filtered); // [12, 130, 44]

// Filtering an Array of Objects - Filtering is extremely common when dealing with data lists, such as finding "active" users:

const useR = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true }
];

const activeUsers = useR.filter((user) => user.active === true);
console.log(activeUsers); // Result: [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]


// reduce - reduce() method is used to iterate through an array and condense its elements into a single output value. It executes a "reducer" callback function on each element, passing the result of one calculation to the next

// const result = array.reduce((accumulator, currentValue, index, array) => {
  // logic to update and return the accumulator
//}, initialValue);

// accumulator: Stores the "running total" or the result returned from the previous iteration.
// currentValue: The specific item in the array currently being processed.
// initialValue (Optional): The value the accumulator starts with. If omitted, the first element of the array becomes the initial accumulator, and iteration starts from the second element.


let array = [1, 2, 3, 4, 5];

let ans = array.reduce(function (accumulator, val) {
    return accumulator + val;
}, 0);
console.log(ans);

// common use cases - summing numbers
let numbe = [10, 20, 30];
let sum = numbe.reduce(function (acc, val) {
    return acc + val;
}, 0);
console.log(sum);


// find() - method in JavaScript is used to retrieve the first element in an array that matches a specific condition. It iterates through the array from left to right and stops as soon as it finds a match

let find = [
    {id: 1, key: 2},
    {id: 2, key: 1},
    {id: 3, key: 1},
];

let va = find.find(function (val) {
    return val.key === 1;
});
console.log(va);

// finding a number
const numberss = [5, 12, 8, 130, 44];
const found = numberss.find(num => num > 10); 
console.log(found); // Output: 12 (the first number greater than 10)

// The .some() method in JavaScript is used to check if at least one element in an array passes a specific test. It returns a simple boolean: true if it finds a match, or false if it doesn't

// Checking for a specific value
const numbersss = [1, 5, 8, 12,];
const hasLargeNumber = numbersss.some(num => num > 10);
console.log(hasLargeNumber); // true (because of 12)

// Checking availability in a list:
const frUits = ["apple", "banana", "mango"];
const isAvailable = frUits.some(fruit => fruit === "banana");
console.log(isAvailable); // true

// Checking object properties
const uSers = [
  { id: 1, active: false },
  { id: 2, active: true },
  { id: 3, active: false }
];
const anyActive = uSers.some(user => user.active);
console.log(anyActive); // true


// The .every() method is used to check if all elements in an array pass a specific test. It returns a simple true or false value

// How it Works - The method runs a "callback function" on every item in your array.
// Returns true: If the function returns a "truthy" value for every single element.Returns false: If it finds even one element that fails the test.Short-circuiting: For efficiency, it stops checking and immediately returns false as soon as it hits the first failure

// checking if all numbers are positive
const numberrs = [10, 20, 30];
const allPositive = numberrs.every(num => num > 0); 
console.log(allPositive); // true

// Validating if all inputs are filled
const formFields = ["John", "Doe", ""];
const isFormComplete = formFields.every(field => field.length > 0);
console.log(isFormComplete); // false (because of that one empty string int the last)

// verifiying data types
const mixed = ["apple", "banana", 42];
const allStrings = mixed.every(item => typeof item === "string");
console.log(allStrings); // false



// Destructuring - it is a concise JavaScript syntax, that allows you to "unpack" values from arrays or properties from objects directly into distinct variables. Instead of writing multiple lines of code to access data, you can extract exactly what you need in a single statement. (Crucially, destructuring does not change the original array or object; it simply copies the data into new variable)

const colors = ["red", "green", "blue"];
const [first, second] = colors; 
// first = "red", second = "green"

// Skipping Elements: Use commas to skip over specific items
const [first, , third] = colors; // first = "red", third = "blue"



// spread (...) - it provides an elegant way to copy, merge, and manipulate data structures without mutating the original data

let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let arr2 = [...arr1]; // arr1 got copied here, in normal we can do because array is refernce type, but with this we can change the 2nd array and that wont affact on the 1st array(arr1)
