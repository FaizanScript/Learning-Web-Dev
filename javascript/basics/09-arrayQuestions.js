// create an array with 3 fruits and print the second fruit.
let fruit = ["apple", "mango", "banana"];
console.log(fruit[1]);

// add "manago" at the end and "pineapple" at the beginning of this array
fruit.push("mango");
fruit.unshift("pineapple");
console.log(fruit);

// replace "banana" with "kiwi" in the array above
fruit.splice(3, 1, "kiwi");
console.log(fruit);

// remove the last item from the array above using a method
fruit.pop();
console.log(fruit);

// insert "red" and "blue" at index 1 in the above array
fruit.splice(1, 0, "green", "yellow");
console.log(fruit);

// extract onlt the middle 3 eleemnt from the above array
let extracted = fruit.slice(1, 3);
console.log(extracted);

// sort the array above, aplhabetically and then  reverse it
fruit.sort().reverse();
console.log(fruit);

// use .map() to square each number
let arr = [1, 2, 3, 14];

let newarr = arr.map(function (val) {
    return val * val;
});
console.log(newarr);

// use .filter to keep the numbers greater than 10
let filterarr = arr.filter((val) => {
    return val > 10;
});
console.log(filterarr);

//use .reduce() to find the sum of this array
let reducearr = arr.reduce(function (acc, val) {
    return acc + val;
}, 0);
console.log(reducearr);

// use .find() to get the first number less than 10
let findarr = arr.find(function (val) {
    return val < 10;
});
console.log(findarr);

// use .some() to check if any student has scored below 35
let arr2 = [40, 60, 20, 80];
let somearr = arr.some((val) => val < 35);
console.log(somearr);

// use .every() to check if all numbers are even
let everyarr2 = arr2.every((val) => val % 2 == 0);
console.log(everyarr2);

// destructure this array to get firstname and lastname
let arr3 = ["faizan", "ansari"];
let [first, last] = arr3;
console.log(first);
console.log(last);

// merge two array using spread operator...
let a = [1, 2];
let b = [3, 4];  

let c = [...a, ...b];
console.log(c);

// add "india" to the start of this array using spread
let contries = ["USA", "UK"];
contries = ["India", ...contries];
console.log(contries);

// clone this array properly(not by refernce)
let arr4 = [1, 2, 3];
let arr5 = [...arr4];
console.log(arr5);