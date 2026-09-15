// 1. DESIGN PATTERNS in JavaScript

// Design Patterns: Design patterns in JavaScript are reusable, time-tested solutions to commonly occurring problems in software design.
//       Instead of being a specific chunk of code that you copy and paste,
//  a design pattern is a conceptual blueprint or template for solving a problem while writing more organized, maintainable, and scalable code.

//  They are traditionally divided into three core categories established by the "Gang of Four" (GoF),
//  alongside modern JavaScript-specific patterns that have emerged with the evolution of the language.



// MODULE PATTERN

// Module Pattern: The Module Pattern is a classic structural design pattern in JavaScript used to emulate classes, enforce encapsulation, and create public and private access levels within a single object.
//      (Module Pattern ek design pattern hai jisme hum apna code ek self executing function (IIFE) ke andar likhte hai, taki variable aur function private rahen) 
//      (iske andar se hum sirf wahi cheezein return karte hai jo bahar use karni hai.)
//      (is pattern ka main fayda hai data hinding (encapsulation) aur clean strucutre, taaki code secure, resuable aaur manageable ban sake.)

//  How It Works (The Core Mechanics):
//      The Module Pattern relies entirely on closures and Immediately Invoked Function Expressions (IIFEs).

//  1. The IIFE creates an isolated, local scope. Everything declared inside it is private by default.
//  2. The Closure ensures that the functions inside the module remember the environment in which they were created, even after the IIFE has finished executing.
//  3. The Return Object explicitly exposes only the specific variables or functions intended for public use.

// Example:-
const ShoppingCartModule = (function () {
    // 1. Private Members (Hidden from the outside world)
    let cart = [];

    function calculateTotal() {
        return cart.reduce((total, item) => total + item.price, 0);
    }

    // 2. Public Members (Exposed to the outside world via the return object)
    return {
        addItem: function (item) {
            cart.push(item);
            console.log(`${item.name} added to the cart.`);
        },

        getTotal: function () {
            return calculateTotal();
        },

        getCartCount: function () {
            return cart.length;
        }
    };
})();

// --- Usage ---
ShoppingCartModule.addItem({ name: "Laptop", price: 1200 }); // "Laptop added to the cart."
ShoppingCartModule.addItem({ name: "Mouse", price: 50 });    // "Mouse added to the cart."

console.log(ShoppingCartModule.getTotal()); // 1250
console.log(ShoppingCartModule.getCartCount()); // 2

// Attempting to access private data directly fails
console.log(ShoppingCartModule.cart); // undefined



// REVEALING MODULE PATTERN

// Revealing Module Pattern: The Revealing Module Pattern is a classic JavaScript design pattern used to organize code, maintain encapsulation, and mimic private and public scope.
//  It is an evolution of the traditional Module Pattern.

// It relies on an Immediately Invoked Function Expression (IIFE) and closures to create a private sandbox. You define all variables and functions locally within the IIFE,
//  and then return an object literal containing pointers to only the specific methods and properties you want to reveal to the outside world.

// Example:-
const BankAccount = (function () {
    // --- PRIVATE MEMBERS ---
    // These cannot be accessed directly from the outside
    let balance = 0;

    function formatCurrency(amount) {
        return `$${amount.toFixed(2)}`;
    }

    // --- INTERNAL FUNCTIONS ---
    function depositMoney(amount) {
        if (amount > 0) {
            balance += amount;
            console.log(`Deposited ${formatCurrency(amount)}`);
        }
    }

    function withdrawMoney(amount) {
        if (amount <= balance) {
            balance -= amount;
            console.log(`Withdrew ${formatCurrency(amount)}`);
        } else {
            console.log("Insufficient funds!");
        }
    }

    function checkBalance() {
        return `Current Balance: ${formatCurrency(balance)}`;
    }

    // --- REVEAL PUBLIC API ---
    // We explicitly map our private functions to public keys
    return {
        deposit: depositMoney,
        withdraw: withdrawMoney,
        getBalance: checkBalance
    };
})();

// --- USAGE ---
BankAccount.deposit(100);      // Output: Deposited $100.00
BankAccount.withdraw(30);      // Output: Withdrew $30.00
console.log(BankAccount.getBalance()); // Output: Current Balance: $70.00

// Trying to access private variables directly will fail
console.log(BankAccount.balance);        // Output: undefined
console.log(BankAccount.formatCurrency); // Output: undefined



// FACTORY FUNCTION PATTERN

//    Factory Function Pattern: a factory function is any regular function (that is not a class or a constructor) that returns a new object.
//  It allows you to manufacture object instances without using the new keyword or dealing with complex class hierarchies.
// (ek function banate ho jo object create karta hai (factory = object banane ki machine))
// (Factory Function Pattern ek aisa design pattern ahi jisme hum ek simple function likhte hain jo naye objects banakar return karta hai, bina class ya new keyword use kiye.)
// (is pattern ka main idea hai -> object creation ko ek function ke through control karna.)
// (har baar job tum factory funciton call karte ho, tumhe ek naya object milta hai jisme apne methods aur (agar chaho to) private data ho sakta hai.)
// (yeh pattern specially useful hai jab tumhe ek hi type ke bohot saare objects chahiye, jaise users, products, tasks, etc.)


// 1. Basic Factory Function
//    The simplest implementation uses ES6 arrow functions and object literal shorthand to implicitly return an object.

const createUser = (firstName, lastName, role) => ({
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    firstName,
    lastName,
    role,
    greet() {
        console.log(`Hello, my name is ${this.firstName} ${this.lastName}!`);
    }
});

// Usage (No 'new' keyword required)
const user1 = createUser("John", "Doe", "Admin");
const user2 = createUser("Sarah", "Smith", "Editor");

user1.greet(); // Output: Hello, my name is John Doe!


// 2. Encapsulation & Private Variables (The Module Pattern)
//    One of the greatest strengths of factory functions in JavaScript is the ability to easily create true private variables using closures.
//  Any variables declared inside the factory function remain inaccessible from the outside, except through the returned object's methods.

function createBankAccount(ownerName, initialBalance) {
    // Private variable (cannot be accessed or changed directly from outside)
    let balance = initialBalance;

    return {
        ownerName,
        getBalance: () => balance,
        deposit(amount) {
            if (amount > 0) balance += amount;
        },
        withdraw(amount) {
            if (amount <= balance) {
                balance -= amount;
                return amount;
            }
            return "Insufficient funds";
        }
    };
}

const account = createBankAccount("Alice", 1000);
account.deposit(500);
console.log(account.getBalance()); // Output: 1500
console.log(account.balance);       // Output: undefined (securely encapsulated)


// 3. The "Factory Design Pattern" (Dynamic Object Creation)
//    In classical software architecture,
//  the Factory Pattern refers to centralizing object creation logic into a single method that decides which object type to return at runtime based on the arguments provided.

const createDeveloper = (name) => ({ name, type: "Developer", rate: 50 });
const createTester = (name) => ({ name, type: "Tester", rate: 40 });

// The Factory Method
function employeeFactory(name, type) {
    switch (type) {
        case "developer":
            return createDeveloper(name);
        case "tester":
            return createTester(name);
        default:
            throw new Error("Employee type not supported.");
    }
}

// Usage
const emp1 = employeeFactory("Alex", "developer");
const emp2 = employeeFactory("Taylor", "tester");



// OBSERVER PATTERN

// Observer Pattern: The Observer Pattern is a behavioral design pattern where an object (known as the Subject or Observable) maintains a list of dependents (called Observers)
//    and automatically notifies them of any state changes.

// It establishes a one-to-many dependency, allowing multiple parts of an application to stay in sync without tightly coupling their code logic together.


// How It Works (The Core Mechanics):
//    A standard implementation relies on three fundamental mechanisms:
// 1. Subscribe: Adds a new observer to the subject's internal tracking list.
// 2. Unsubscribe: Removes an observer from the list.
// 3. Notify / Broadcast: Loops through all registered observers and fires their respective update actions with the fresh data.


// Basic Implementation in modern javascript (ES6+):-

// 1. The Subject (Observable)
class Observable {
    constructor() {
        this.observers = []; // Stores the list of subscriber functions
    }

    // Add a subscriber
    subscribe(func) {
        this.observers.push(func);
    }

    // Remove a subscriber
    unsubscribe(func) {
        this.observers = this.observers.filter(observer => observer !== func);
    }

    // Notify all subscribers with data
    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
}

// 2. Concrete Observer Functions
const loggerObserver = (data) => console.log(`[Log]: Received data -> ${data}`);
const toastObserver = (data) => console.log(`[Toast Notification]: Showing UI alert for "${data}"`);

// 3. Execution Flow
const appState = new Observable();

// Subscribing observers
appState.subscribe(loggerObserver);
appState.subscribe(toastObserver);

// Trigger an event
console.log("--- First Broadcast ---");
appState.notify("User Logged In");

// Unsubscribing one observer
appState.unsubscribe(toastObserver);

console.log("\n--- Second Broadcast ---");
appState.notify("Profile Updated");
