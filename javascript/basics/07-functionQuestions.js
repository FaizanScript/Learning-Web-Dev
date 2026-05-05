function eod(n) {
    if (n % 2 == 0) {
        return "even";
    } 
    return "odd";
}
console.log(eod(5));

function  doe(n) {
    return n % 2 === 0 ? "even" : "odd";
}
console.log(doe(7));

 
function sumofn(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
            sum+=i;
   }
   return sum;
}
console.log(sumofn(5));

function factorial(n) {
    if (n <= 0) return 0;

    let fact = 1;
    for (let i = n; i >= 1; i--) {
        fact*=i;
    }
    return fact;
}
console.log(factorial(5));

function prime(n) {
    if (n <= 1) return "not prime";
    
    for (let i = 2; i*i <= n; i++) {
        if (n % i == 0) {
            return "not prime";
        }
    }
    return "prime";

}
console.log(prime(49));

function createCounter() {
    let count = 0;

    return function inner() {
        count++;
        return count;
    };
}
let counter = createCounter();
console.log(counter());
console.log(counter());
console.log(counter());



function outer() {
    let count = 0;

    return function() {
        count++;
        return count;
    };
}

let anna = outer();
let bb = outer();

console.log(anna());
console.log(anna());
console.log(bb());


function outer() {
    let x = 10;

    return function() {
        return x;
    };
}

let a = outer();
let b = outer();

console.log(a()); 
console.log(b());

function outer() {
    let x = 0;

    return function() {
        x++;
        return x;
    };
}

let c1 = outer();
let c2 = c1;

console.log(c1());
console.log(c2());
console.log(c1());

function createbankacc(initialbalance) {
    let balance = 100;

    return {
        deposit: function(deposite) {
            deposite += balance;
            return deposite;
         },
        withdraw: function(withdraw) {
            if (withdraw > balance) {
                return "inefficient balance"
            }
            return withraw = balance - withdraw;
        },
        getbalance: function(getbalance) {
            return balance;
        }, 
    };
}
let d = createbankacc();
console.log(d.deposit(50));
console.log(d.withdraw(50));
console.log(d.getbalance(50));

function gret(name, callback) {
  console.log("Hello, " + name);
  callback(); // The HOF executes the passed function
}

function sayGoodbye() {
  console.log("Goodbye!");
}

gret("Alice", sayGoodbye); 

function once(fn) {
    let called = false;
    return function() {
        if (!called) {
            fn();
            called = true;
        }
    };
}

function hof() {
    let x = 10;
    return function() {
        console.log("h");
        return x;
    }
}
hof()();


function outer() {
    let x = 5;

    return function() {
        x = x + 2;
        return x;
    };
}

let an = outer();

console.log(an());
console.log(an());
console.log(an());

function oute() {
    let count = 0;

    return {
        inc: function() {
            count++;
            return count;
        },
        dec: function() {
            count--;
            return count;
        }
    };
}

let obj = oute();

console.log(obj.inc()); 
console.log(obj.inc()); 
console.log(obj.dec()); 

function out() {
    let count = 0;

    return {
        inc: function() {
            count++;
            return count;
        }
    };
}

let obj1 = out();
let obj2 = out();

console.log(obj1.inc()); 
console.log(obj1.inc()); 
console.log(obj2.inc()); 
console.log(obj1.inc());

function multiple(x) {
    return function(y) {
        return x * y;
    };
}
let double = multiple(5);
console.log(double(2));
console.log(double(10));

function createCounter(start = 0) {
    return function() {
        start++;
        return start;
    };
}
let counTer = createCounter(10);
console.log(counTer());
console.log(counTer());
console.log(counTer());

function createcounter() {
    let count = 0;
    return {
        inc: function() {
            count++;
            return count;
        },

        dec: function() {
            count--;
            return count;
        }
    };
}
let Counter = createcounter();
console.log(Counter.inc());
console.log(Counter.dec());

function createlimiter(x) {
    return function() {
        if (x > 0) {
            x--;
            return "allowed";

        }
        return "limit reached";
    };
}
let fn = createlimiter(2);
console.log(fn());
console.log(fn());
console.log(fn());