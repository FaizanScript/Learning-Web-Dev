// operators

//arithmetic operators (+, -, *, /, %, **)
1 + 2 = 3 //add
"ha" + "rsh" = "harsh" //concatination
2 - 1 = 1 // subtract
2 * 2 = 4 // multiplication
10 / 2 = 5 // divide
10 % 2 = 0 // remainder
2 ** 3 = 8 //exponentiation



// comparison operators ( ==, ===, !=, !==, >, <, >=, <=)
12 == 13 // false (not strict comparison)
12 == "12" // true (doesnt type check properly)
12 === "12" // false (strict) (use triple equal for proper type check)
12 != 13 //true(12 is not = 13) (not strict comparison)
12 != "12" //false (doesnt type check properly)
12 !== "12" //true (strict) (use this for proper type check)
12>11 //true
12<12 //true
22<=22 //true
12<=10 //false



//assignment operators (=, +=, -=, *=, /=, %=)
let a = 12; //here a is the assignment operator it assign the 12 to a
a+=3; //it means a = a + 3
a-=11; //it means a = a - 11
a*=2; //it means a = a * 2
a/=2; //it means a = a / 2
a%=2; //it means a = a % 2



//logical operator (&&, ||, !)

//&&(AND) -> this check value if both are true then its true, even if one is wrong then its false. so in order to be true both has to be true
true && true //true
false && false //false
true && false //false
false && true //false

//example
let x = 10;
let y = 20;
if (x > 5 && y < 25) {
    console.log("A");
} else{
    console.log("B");
}

// ||(OR) ->  this check value if any of them is true then its true.
true || true //true
false || true //true
true || false //true
false || false //false

//example
let isAdmin = true;
let isLoggedin = false;
if (isAdmin || isLoggedin) {
    console.log("access granted");
} else {
    console.log("access denied");
}

!false //this false become true(this ! changes the value's nature)

//example
let temp = 35;
if (!(temp < 30)) {
    console.log("hot");
} else {
    console.log("pleasant");
}


//unary operator (+, -, !, typeof, ++, --)
typeof 12; //it tells the type of the value
 let a = 2;
 a++; //post increament (it prints the value then increase it by 1)
 //here a++ + a will be 2 + 3 = 5
 let a = 3;
 ++a; //pre increament (it increase the value by one then prints)
// here ++a + a will be 4 + 4 = 6

let a = 4;
a--; //post decrement (it prints the value then increase it by 1)
--a; //pre decrement (it increase the value by one then prints)



//ternary operator
12 > 12     ? console.log("true") : console.log("huihui");
//condition ? expressionIFTrue    : expressionIFFalse    ;
// condition: An expression that evaluates to a truthy or falsy value.
//expressionIfTrue: The value returned if the condition is truthy
//expressionIfFalse: The value returned if the condition is falsy.

//example
let score = 78;
let grade = score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "c" : "fail";
console.log(grade);


let points = 120;
let status = point > 100 ? "gold" : point > 50 ? "silver" : "bronze";
console.log(status);

let loggedin = true;
let hastoken = false;
let access = loggedin && hastoken ? "allow" : "deny";
console.log(access);

//typeof operator-> typeof operator is used to determine the data type of a value or variable

//instanceof operator -> instanceof operator  is  used to check if an object is an instance of a specific class or a subclass that inherits from it.