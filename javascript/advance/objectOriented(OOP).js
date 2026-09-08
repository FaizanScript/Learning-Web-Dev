// OBJECT-ORIENTED JAVASCRIPT (OOP)

// object oriented javascript (OOP): Object-Oriented Programming (OOP) in JavaScript is a paradigm centered around objects that contain data (properties) and actions (methods).
// (humein seekhna hai factories banana,
//  matlab ki app ek baar blueprint bana do ki har object kaisa dikhega
//  and hum log naye naye objects with different values bana paayenge, yahi upar upar se poora kaam hai OPS mein)



// CONSTRUCTOR FUNCTION

// constructor function: A constructor function in JavaScript is a regular function used as a blueprint to create and initialize multiple objects with the same structure (properties and methods)


// Core Principles of Constructor Functions

//  1. Naming Convention: By standard convention, constructor functions always start with a capital letter (e.g., User, Car, Person).
//      This tells other developers that the function is meant to be called with the new keyword.

// 2. The this Keyword: Inside the constructor, the this keyword does not have a value yet.
//      It acts as a placeholder that will point directly to the newly created object instance once the function is executed.

// 3. No return Statement: You do not explicitly write a return statement. JavaScript will automatically return the new object for you behind the scenes.


// What happens when you use the new keyword?
// When you call a function with new (e.g., new User("Alice", 28)),
//  JavaScript executes four steps automatically:

// 1. it creates a brand-new, empty object {}.
// 2. it binds the this keyword inside the constructor to point to that new empty object.
// 3. It runs the code inside the constructor function, adding properties and values to this.
// 4. It automatically returns the freshly populated object.


// Example:-
function CreatePencil(name, price, color) {
    this.name = name;
    this.price = price;
    this.color = color;
    // this.company = company;
    this.write = function (text) {
        let h1 = document.createElement("h1");
        h1.textContent = text;
        h1.style.color = color;
        document.body.append(h1);
    };
}

let pencil = new CreatePencil("natraj", 10, "black");
let pencil2 = new CreatePencil("doms", 10, "red");


// PROTOTYPES:A special property found only on constructor functions and class declarations. It serves as the blueprint for what future instances will inherit.
//  (agar tumhara constructor function koi field apne prototype par attach karle to us constructor se banne waale sabhi new isntance yaani ki objects, ke pass wo field automatically chali jaati hai)

CreatePencil.prototype.company = "sheriayns"



// ES6 classes: constructor, methods, extends, super

// CLASSES

// classes:  JavaScript classes act as blueprints for creating objects.
//   While they look similar to classes in languages like Java or C++,
//  they are actually "syntactic sugar" over JavaScript's existing prototype-based inheritance system—meaning
//  they make your code cleaner and easier to read without changing how JavaScript works under the hood.


// HERE, is a comprehensive breakdown of how to use classes in JavaScript.

// 1. Basic Class Syntax & Instantiation:
//      To create a class, use the class keyword followed by the class name (traditionally using PascalCase).

// The Constructor: The constructor() is a special, mandatory method that runs automatically when a new object is created.
//       It sets up the object's initial properties.

// Methods: Functions defined inside the class (without the function keyword) become methods available to all instances.

// The new Keyword: Used to instantiate (create) a new object from the blueprint.


// Example:-
class User {
    // 1. Properties are initialized inside the constructor
    constructor(name, role) {
        this.name = name; // 'this' refers to the object being created
        this.role = role;
    }

    // 2. Class Method
    sayHello() {
        return `Hello, my name is ${this.name} and I am a ${this.role}.`;
    }
}

// 3. Creating instances of the class
const admin = new User("Alice", "Admin");
const guest = new User("Bob", "Guest");

console.log(admin.sayHello()); // Output: Hello, my name is Alice and I am a Admin.
console.log(guest.sayHello()); // Output: Hello, my name is Bob and I am a Guest.


// 2.Class Expressions vs. Declarations
//      Just like functions, classes can be defined in two ways:

// class declaration:
class Rectangle { }

// Class Expression (Anonymous or Named):
const Rectangle = class { }; // Anonymous
const Square = class Square2 { }; // Named



// INHERITANCE

// inheritance(EXTENDS AND SUPER): Inheritance allows a child class to inherit all properties and methods from a parent class.
//       Use the extends keyword to link the child class to the parent.
//       You must call super() inside the child's constructor before using the this keyword. This runs the parent class's constructor.

// Example:-
// Parent Class
class Animal {
    constructor(name) {
        this.name = name;
    }

    makeSound() {
        return `${this.name} makes a noise.`;
    }
}

// Child Class inherits from Animal
class Dog extends Animal {
    constructor(name, breed) {
        super(name); // Calls the parent constructor and passes 'name'
        this.breed = breed;
    }

    // Overriding the parent's method
    makeSound() {
        return `${this.name} barks!`;
    }
}

const myDog = new Dog("Max", "Labrador");
console.log(myDog.makeSound()); // Output: Max barks!



// PROTOTYPE INHERITANCE

// Prototypal inheritance: It is a core JavaScript feature where objects directly inherit properties and methods from other objects.
//       Unlike class-based languages like Java or C++, where classes act as blueprints for creating instances,
//  JavaScript objects link directly to a parent object to reuse code.
// (ek object hai app chaho to uski saari props/methosd ko inherit kara dete ho doosre object mein)



// 3 Ways to Implement Prototypal Inheritance:

// 1. Modern Standard: Object.create()
//      This is the cleanest, recommended way to create a new object while specifying its parent prototype.

// Base prototype object
const animal = {
    eat() {
        console.log("This animal is eating.");
    }
};

// Create a new object that inherits from animal
const dog = Object.create(animal);
dog.bark = function () {
    console.log("Woof!");
};

dog.bark(); // Output: "Woof!" (Found directly on dog)
dog.eat();  // Output: "This animal is eating." (Inherited from animal)


// 2. Classic Approach: Constructor Functions
//      Before modern ES6 classes, developers used constructor functions combined with the .prototype property to share methods efficiently across instances.

function User(username) {
    this.username = username;
}

// Add a method to the constructor's prototype
User.prototype.sayHi = function () {
    console.log(`Hi, I'm ${this.username}`);
};

const alex = new User("Alex");
alex.sayHi(); // Output: "Hi, I'm Alex"


// 3. Syntactic Sugar: ES6 Classes
//      Modern JavaScript uses class and extends syntax. Although it looks like traditional object-oriented programming,
//  it converts directly into prototypal links behind the scenes.

class Vehicle {
    constructor(wheels) {
        this.wheels = wheels;
    }
    move() {
        console.log("Moving forward...");
    }
}

class Car extends Vehicle {
    constructor() {
        super(4); // Calls the Vehicle constructor
    }
}

const myCar = new Car();
myCar.move(); // Output: "Moving forward..." (Inherited from Vehicle prototype)



// Q - difference between protottype and classical inheritance javascript?
//   -> The core difference is that classical inheritance uses classes as a blueprint to create object instances,
//  while prototypal inheritance links objects directly to other objects.



// ENCAPSULATION (private fields using #)
//      By default, all class fields and methods are public (accessible outside the class).
//  To make properties or methods private—meaning they can only be read or modified inside the class itself—prefix them with a hash (#) symbol.

// Example:-
class BankAccount {
    #balance; // Declaring a private field

    constructor(owner, balance) {
        this.owner = owner;
        this.#balance = balance;
    }

    checkBalance() {
        return `Account owner: ${this.owner}. Balance: $${this.#balance}`;
    }
}

const account = new BankAccount("Charlie", 1000);
console.log(account.checkBalance()); // Output: Account owner: Charlie. Balance: $1000
// console.log(account.#balance);   // ❌ SyntaxError: Private field '#balance' must be declared in an enclosing class



// GETTER AND SETTERS (get and set)
//      Getters and setters allow you to define methods that behave like properties.
//  They are useful for validating data before saving it or formatting a property when reading it.

// Example:-
class Product {
    constructor(price) {
        this._price = price; // Conventional underscore implies internal/protected property
    }

    // Getter
    get price() {
        return `$${this._price.toFixed(2)}`;
    }

    // Setter
    set price(value) {
        if (value < 0) {
            console.log("Price cannot be negative!");
            return;
        }
        this._price = value;
    }
}

const item = new Product(19.99);
console.log(item.price); // Output: $19.99 (Invokes the getter)

item.price = -5;         // Output: Price cannot be negative! (Invokes the setter)
item.price = 25;         // Updates the price successfully
console.log(item.price); // Output: $25.00



// STATIC

// Static Methods and Properties
//      The static keyword defines methods or properties that belong to the class itself, rather than to instances of the class.
//  You call them directly on the class name.

// Example:-
class Calculator {
    // Static property
    static pi = 3.14159;

    // Static method
    static add(a, b) {
        return a + b;
    }
}

// You do NOT use 'new Calculator()' to access these
console.log(Calculator.pi);       // Output: 3.14159
console.log(Calculator.add(5, 7)); // Output: 12