// PERFORMACE OPTIMIZATION

// Debouncing and ThrottLing

// DEBOUNCING

// Debouncing: Debouncing is a performance optimization technique in JavaScript used to limit how often a function executes.
//      It ensures that a heavy or costly function is only triggered after a specific amount of time has passed since the last time it was called.

// Think of it like an elevator door. The door waits for 10 seconds of silence before closing.
//  If someone else walks in (a new event), the 10-second timer resets. The door only closes when there has been a complete pause in activity.

//  (app koi action kar rahe ho and aap ye nahi chaahte har action pe kuch ho, jab bhi mere actions ke beech mein koi specific gap aajaye to fir reaction perform ho)
//  (ek delay bataoge tum, utna delay jab bhi aayega to action ka reaction milega)

// Code Implementation:-
function debounce(func, delay = 300) {
    let timer;

    return function (...args) {
        // 1. Clear any existing timer currently running
        clearTimeout(timer);

        // 2. Set a new timer to run the function after the delay
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}


// How It Works Under the Hood:

// 1. Closures: The debounce function is a higher-order function that returns a new wrapper function.
//      It uses a JavaScript closure to remember the timer variable across multiple event triggers.

// 2. Clearing the Timer: Every time the user interacts (e.g., presses a key), clearTimeout(timer) cancels the previous pending execution.

// 3. Resetting the Timer: setTimeout schedules the function to run after your specified delay.
//      If the user triggers the event again before that time is up, the countdown starts all over again.

// 4. Preserving Context: Using .apply(this, args) ensures that the original function keeps its intended this context and receives any arguments passed by the event (like the event object).

// Example:-
// The expensive function you want to limit
function fetchSearchResults(event) {
    console.log(`Searching API for: ${event.target.value}`);
}

// Wrap it in our debounce function with a 500ms delay
const processSearch = debounce((e) => fetchSearchResults(e), 500);

// Attach it to an input field
const inputElement = document.getElementById("search-box");
inputElement.addEventListener("input", processSearch);



// THROTTLING

// Throttle: Throttling in JavaScript is a performance optimization technique that limits how often a specific function can execute within a defined time interval.
//     No matter how many times an event is triggered, a throttled function will run at most once per interval.
// (it says, interval par chalunga, action agar hota raha and aapne ek interval bataya to utna interval me aapka event chalega)

// How to Implement a Throttle Function:
// Because throttling is a design pattern rather than a built-in language feature, you can implement it yourself using standard web APIs like setTimeout.

function throttle(func, delay) {
    let isLocked = false;

    return function (...args) {
        // If the lock is active, ignore the function call
        if (isLocked) return;

        // Execute the main function immediately
        func.apply(this, args);
        isLocked = true;

        // Release the lock only after the delay has passed
        setTimeout(() => {
            isLocked = false;
        }, delay);
    };
}

// Example usage with a scroll event
const handleScroll = throttle(() => {
    console.log("Scroll event handler executed!");
}, 1000);

// This will fire at most once every 1000 milliseconds (1 second)
window.addEventListener("scroll", handleScroll);



// DEBOUNCING vs THROTTLING
// -> Debouncing and throttling are both optimization techniques used in JavaScript to control how many times a function executes over time.
//  While both improve application performance by limiting high-frequency events (like scrolling, resizing, or typing),
//  the core difference lies in when the function gets executed:

// Debouncing waits until the user stops triggering the event for a specific amount of time before running the function.
// Throttling executes the function at a controlled, regular interval while the event is continuously happening.

//  The Analogy:
//    Debouncing: Imagine an elevator. The doors stay open as long as people keep walking in. The elevator only moves (executes) after the last person enters and there is a pause of 5 seconds.
//    Throttling: Imagine a traffic light. No matter how many cars queue up at the intersection, the light only lets a batch through once every 2 minutes (fixed interval).



// lazy loading (with intersectionObserver)

// LAZY LOADING

// Lazy loading: Lazy loading is a powerful web performance optimization technique that defers the loading of non-critical resources (like images, videos, or code chunks) until the moment they are actually needed.
//    By only fetching resources when they enter the user's viewport or upon specific interactions, you drastically reduce initial page load times, save user bandwidth, and boost Core Web Vitals like Largest Contentful Paint (LCP).


// 1. Native HTML Lazy Loading (The Simplest Way):
//      Modern browsers natively support lazy loading for <img> and <iframe> tags using the loading="lazy" attribute. No JavaScript is required for this approach.

//                   HTML
// <!-- The browser handles the timing automatically -->
// <img src="large-image.jpg" loading="lazy" alt="Beautiful Landscape" />
// <iframe src="https://example.com" loading="lazy"></iframe>


// 2. Custom Lazy Loading via the Intersection Observer API
//      If you need more control, need to support custom placeholder effects (like a smooth fade-in), or want to lazy-load elements that aren't native images, the Intersection Observer API is the modern JavaScript standard.
// Instead of putting the real asset path in the src attribute, you place it in a custom data-src attribute alongside a tiny placeholder image.

//                    HTML
// <img class="lazy-thumb" src="tiny-placeholder.jpg" data-src="high-res-image.jpg" alt="Dynamic Image" />


// INTERSECTIONOBSERVER

// Intersection Observer: The Intersection Observer API allows you to asynchronously monitor when a specific HTML element enters or exits the user's viewport 
//    (or a designated parent container). It is highly optimized, running off the main thread to ensure smooth performance during scrolling.

// Basic Setup:
//    To implement the observer, instantiate IntersectionObserver with a callback function and an optional options configuration object.

// 1. Define configuration options
const options = {
    root: null,         // Use the browser viewport as the container
    rootMargin: '0px',  // No extra margin around the root
    threshold: 0.1      // Trigger when 10% of the element is visible
};

// 2. Define the callback executed on visibility changes
const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('Element is visible!', entry.target);

            // Optional: Stop observing after the first intersection
            observer.unobserve(entry.target);
        }
    });
};

// 3. Initialize the observer
const observer = new IntersectionObserver(callback, options);

// 4. Target the DOM element to watch
const targetElement = document.querySelector('.animate-me');
observer.observe(targetElement);


// Configuration Options Explained:-
//    You can pass three specific parameters inside the options object to fine-tune when the observer triggers:

// 1. root: The ancestor element acting as the bounding box. Setting this to null defaults to the browser viewport.
// 2. rootMargin: A set of margins (e.g., "10px 0px 20px 0px") that grows or shrinks the root bounding box boundaries before checking for an intersection.
// 3. threshold: A single number or an array of numbers between 0 and 1. A value of 0 triggers the callback the moment the first pixel enters the viewport.
//      A value of 1 means the callback fires only when 100% of the element is entirely inside the viewport.


// Key properties of intersectionObserver
//    Inside your callback loop, each entry exposes helpful data points about the intersection status:

// 1. entry.isIntersecting: A boolean value that returns true if the target element has crossed the specified threshold into the root container.
// 2. entry.target: The actual DOM element currently being evaluated.
// 3. entry.intersectionRatio: A precise decimal between 0 and 1 representing exactly how much of the element is currently visible.


// Primary Methods
//    The API includes three native management methods:
// 1. observer.observe(element): Starts tracking a target DOM element.
// 2. observer.unobserve(element): Stops tracking a specific target element once it is no longer needed.
// 3. observer.disconnect(): Immediately stops tracking all currently observed elements for that instance.



// CODE SPLITTING (intro level)

// Code Splitting: Code splitting is a performance optimization technique that breaks down a massive JavaScript bundle into smaller, bite-sized "chunks."
//     Instead of making users download your entire codebase on the initial page load, the browser only fetches the specific code required for the current screen or action.

// The primary mechanism to achieve this in modern JavaScript is the dynamic import() syntax.

// How Dynamic Imports Work:
//    Unlike traditional static imports (e.g., import { format } from './utils') which are synchronous and evaluated at startup,
//  dynamic imports are asynchronous and function like a function call. They return a JavaScript Promise that resolves to the requested module.

// When modern bundlers like Webpack, Vite, or Rollup encounter a dynamic import(), they automatically split that module and its unique dependencies into a standalone .js file.

// Example:-

//  Conditional / On-Demand Loading (Vanilla JS)
//    You can load a module only when a specific user action takes place, such as clicking a button.

//  Using .then() syntax:
const button = document.querySelector('#load-chart-btn');

button.addEventListener('click', () => {
    // The browser only fetches chart.js after the user clicks
    import('./utils/chart.js')
        .then((module) => {
            const drawChart = module.default; // Extract default export
            drawChart();
        })
        .catch((error) => {
            console.error('Failed to load the chart module:', error);
        });
});


// Using async/await syntax:
button.addEventListener('click', async () => {
    try {
        // Destructure named exports directly from the dynamic import
        const { renderHeavyGraph } = await import('./utils/graph.js');
        renderHeavyGraph();
    } catch (error) {
        console.error('Error loading module:', error);
    }
});



// avoiding unnecessary reflows and repaints

// -> To avoid unnecessary reflows and repaints in JavaScript, you must batch DOM reads and writes, minimize direct layout updates, and use CSS transforms instead of changing geometric properties.

// Avoid layout thrashing:

// 1. Separate reads and writes: Do not alternate reading layout properties (like offsetHeight or clientWidth) and writing styles inside a loop.
//     This forces the browser to recalculate the layout repeatedly, causing layout thrashing. 

// 2. Batch operations: Read all required geometry values first into an array or variable, and then perform your style updates.


// Optimize DOM Manipulations:

// 1. Use CSS classes: Instead of setting multiple individual inline styles via element attributes (which triggers a reflow for each change),
//     toggle a single CSS class containing all the new property rules.

// 2. Use Document Fragments: When inserting many new elements, append them to an off-screen DocumentFragment first, then add the fragment to the live DOM in a single operation.

// 3. Detach elements temporarily: For massive updates, hide an element using display: none, make your modifications, and then restore the display property to trigger only two total reflows.



// memory leaks: timers, event listner
//    A memory leak in JavaScript occurs when an application retains references to objects that are no longer needed.
//  Because these objects remain reachable, the JavaScript engine's automatic garbage collector cannot free up their memory. 
// Over time, this causes the application's memory usage to steadily grow, leading to performance slowdowns, UI lag, and eventual browser crashes.


// Common Causes & How to Fix Them:

// 1. Forgotten Timers and Callbacks
//      When you use setInterval or setTimeout, the callback function maintains a reference to any variables or objects captured in its scope. If the timer runs indefinitely, those objects can never be cleaned up.

// THE LEAK:-
setInterval(() => {
    const element = document.getElementById('status');
    if (element) { element.innerHTML = 'Updating...'; }
}, 1000); // Keeps running even if the 'status' element is removed from the DOM

// THE FIX: Always clear your timers when they are no longer required.
const intervalId = setInterval(() => { /* ... */ }, 1000);
// Later, when cleaning up:
clearInterval(intervalId);


// 2. Unremoved Event Listeners
//      If you attach an event listener to a DOM element (or the global window object) and later remove that DOM element without removing the listener, the listener function remains in memory, keeping everything in its scope alive.

// THE LEAK:-
window.addEventListener('resize', () => {
    this.doSomething();
}); // If the component unmounts, this listener still hangs onto 'this'

// THE FIX:  Explicitly remove listeners using named function references, or utilize modern options like the once: true flag or an AbortController.
const handleResize = () => { /* ... */ };
window.addEventListener('resize', handleResize);

// Clean up
window.removeEventListener('resize', handleResize);


// 3. Detached DOM Elements
//       This happens when you store a reference to a DOM node inside a JavaScript variable, array, or object.
//    Even if you remove the node from the actual web page DOM tree, it cannot be garbage collected because your JavaScript code is still pointing to it.

// THE LEAK:-
const cache = {
    button: document.getElementById('submit-btn')
};
document.body.removeChild(document.getElementById('submit-btn'));
// The button is gone from the UI, but still alive in `cache.button`

// THE FIX:  Nullify or delete the reference once the element is removed.
cache.button = null;


// 4. Accidental Global Variables
//      Variables that are initialized without let, const, or var automatically attach themselves to the root global object (window in browsers).
//    The garbage collector considers the root object always active, meaning global variables are never collected.

// THE LEAK:-
function processData() {
    leakedData = new Array(1000000); // Missing 'let' or 'const' makes it global
}

// THE FIX: Always write code in Strict Mode ("use strict";) or use modern ES6 modules, which prevent accidental global variables by throwing errors.


// 5. Closures Holding Onto Heavy Data
//      Closures allow a nested function to access variables from its outer scope.
//   If a long-lived nested function retains an outer variable containing large amounts of data, that data will stay in memory unnecessarily.

// THE FIX: Only expose the exact data the inner function requires, or clear out the heavy reference when the task finishes. For mapping structures, leverage WeakMap or WeakSet, which allow keys to be garbage collected if no other references exist.



//  How to Detect a Memory Leak

//    You can use the built-in developer tools in browsers like Google Chrome to hunt down leaks:

// 1. Performance Panel: Open Chrome DevTools, navigate to the Performance tab, check the "Memory" box, and hit record.
//      Interact with your application. If the blue line (representing the JS Heap) shows a "sawtooth" pattern (rising and dropping), memory is clearing well.
//    If it continuously climbs without dropping, you have a leak.

// 2. Heap Snapshots: Go to the Memory tab and take a heap snapshot. Perform a suspicious action in your app (like opening and closing a modal), then take a second snapshot.
//      Use the "Comparison" view to see exactly which objects were allocated but not released.