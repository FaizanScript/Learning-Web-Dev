// Timers and Intervals

// timer -  timer is a function that allows you to execute code at a specific time, rather than immediately when the script reaches that line. These are often called "timing events" and are essential for handling asynchronous tasks like animations, periodic data updates, or delayed UI changes.

// setTimeout - setTimeout is a built-in JavaScript function used to execute a specific piece of code or function once after a designated delay. It is a foundational tool for handling asynchronous tasks, such as showing notifications, delaying logic execution, or debouncing user input.

setTimeout(function () {
    console.log("hey");
}, 5000) // 1 second me 1000 millisecond hote hai

// clearTimeout - clearTimeout() is a built-in method used to cancel a timer that was previously scheduled with setTimeout().
// How it Works
// When you call setTimeout(), it returns a unique numeric ID (often called a "timeout ID"). If you pass this ID to clearTimeout(), the browser stops the scheduled function from ever running, provided it hasn't already executed.

let tm = setTimeout(function () {
    console.log("i not not gonna print");
}, 3000);

clearTimeout(tm);



// Intervals - an interval is a timing event used to execute a function repeatedly at fixed time delays. It is primarily managed using the setInterval() method.

// setInterval - setInterval is a built-in JavaScript function used to repeatedly execute a specific block of code or function at fixed time intervals. It is commonly used for tasks that need constant updates, such as digital clocks, countdown timers, animations, or periodic data fetching.

setInterval(function () {
    console.log("hello");
}, 2000)

// clearInterval - clearInterval() is a built-in method used to stop a repeating action that was previously set up using setInterval().
// When you call setInterval(), it returns a unique Interval ID (a positive integer). Passing this ID to clearInterval() tells the browser or environment to stop executing that specific recurring timer.

let int = setInterval(function () {
    console.log("i am also not gonna print");
}, 2000);

clearInterval(int);



// questions

// 01 - whats the difference between timers(setTimeout) and intervals(setInterval)
// ans - The primary difference between timers (setTimeout) and intervals (setInterval) in JavaScript is the frequency of execution: a timer runs a function once after a delay, while an interval runs it repeatedly at fixed time gaps.

// 02 - whats the difference between clearTimeout and clearInterval
// ans - The primary difference between clearTimeout and clearInterval is the type of timer they are designed to cancel.

// clearTimeout(): Stops a timer that was scheduled to run once using setTimeout(). Use this if you want to prevent a delayed action from ever happening.

// clearInterval(): Stops a timer that was scheduled to run repeatedly at fixed intervals using setInterval(). Use this to end a recurring task, such as an animation or a clock update.



// Tasks

// 01 - counting 10 to 1 with 1 sec delay

let count = 10;

let inti = setInterval(function () {
    if (count >= 0) {
        console.log(count);
        count--;
    } else {
        clearInterval(inti);
    }
}, 1000);


// 02 - downloading bar completion

let percentage = document.querySelector("#percent");
let progress = document.querySelector(".progress-bar");

let interval = setInterval(function () {
    if (count <= 99) {
        count++;
        progress.style.width = `${count}%`;
        percentage.textContent = `${count}%`;
    } else {
        document.querySelector(".file-name").textContent = "Downloaded.";
        document.querySelector(".status").textContent = "your file is Downloaded.";
        clearInterval(interval);
    }
}, 30);