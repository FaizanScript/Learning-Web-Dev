// Storage - Storage in JavaScript refers to built-in mechanisms that allow web applications to save data locally inside the user's browser. This is known as client-side storage, meaning the data stays on the user's computer and eliminates the need to constantly send data back and forth to a web server.


// The most common ways to store data using JavaScript are divided into different APIs based on how long the data needs to last, how much space it takes, and how complex it is.


// Core storage mechanisms

// Local storage - localStorage is a built-in web browser feature that allows JavaScript applications to store data as key-value pairs directly on the user's device. The defining characteristic of localStorage is its persistence: the data remains intact even if the user refreshes the page, closes the tab, or completely restarts their browser or computer. It will stay in the browser indefinitely until it is explicitly cleared via code or by the user emptying their browser cache.
//  (aapke browser ke andar data store karna jo ki browser band hone par bhi delete nahi hoga(browser ka database)).

// Syntax

// how to store data(set Item)
// setItem(key, value): Adds a key and a value to the storage, or updates the value if the key already exists.

localStorage.setItem("name", "faizan");


// how to fetch data(get Item)
// getItem(key): Retrieves the stored value linked to that specific key. Returns null if the key does not exist.

let val = localStorage.getItem("name");


// how to remove data(remove Item)
// removeItem(key): Deletes a specific key-value pair from the storage.

localStorage.removeItem("name");


// how to update data(set Item)
// setItem(key, value): Adds a key and a value to the storage, or updates the value if the key already exists.

localStorage.setItem("name", "hasnain");


// how to clear all stored data(clear)
// clear(): Wipes out all stored data for that specific website domain.

localStorage.clear();


// Handling Objects and Arrays
// localStorage only stores data as strings. If you try to save an object or an array directly, the browser will force-convert it into the unhelpful string "[object Object]".
// To save complex data types, serialize them into a JSON string using JSON.stringify() when saving, and parse them back using JSON.parse() when retrieving.

localStorage.setItem("family", JSON.stringify(["faizan", "hasanin", "hamza"]));
let val3 = JSON.parse(localStorage.getItem("family"));
console.log(val3);

// Session Storage - sessionStorage in JavaScript is a built-in browser property that allows you to store data as key-value pairs locally within the user's browser. Its primary characteristic is that data is stored temporarily for the duration of a specific browser tab session and is automatically wiped clean the moment that particular tab or browser window is closed.
// (ye apka data temporarily store karta hai matlab ki tab band hote hi data khatam).

// Syntax

// how to store data(set Item)
// setItem(key, value): Adds a key and a value to the storage, or updates the value if the key already exists.

sessionStorage.setItem("name", "hamza");


// how to fetch data(get item)
// getItem(key): Retrieves the stored value linked to that specific key. Returns null if the key does not exist.

let val2 = sessionStorage.getItem("name");


// how to remove data(remove Item)
// removeItem(key): Deletes a specific key-value pair from the storage.

sessionStorage.removeItem("name");


// how to update data(set Item)
// setItem(key, value): Adds a key and a value to the storage, or updates the value if the key already exists.

sessionStorage.setItem("name", "kaniz");


// how to clear all stored data(clear)
// clear(): Wipes out all stored data for that specific website domain.

sessionStorage.clear();



// Cookies -  cookies are small text data files stored in key-value pairs directly inside the user's web browser. They were designed to solve the problem of remembering information about a user across different web page loads, since the standard HTTP protocol is entirely stateless.
//  (ye bhi data store karta hai and apka data browser ke cookies naam ki property mein save hota hai and ye cookies concept kam data ya light data ke liye hota hai.(just like local storage but for light data, can only hold yo to 4KB of data.))

// core characterstics

// Size limit: Cookies are highly restricted and can only hold up to 4KB of data.
// Automatic transfer: Once set, the browser automatically attaches relevant cookies to every single network request made to that domain, allowing servers to instantly recognize users.
// Use cases: They are widely used for managing login sessions, user preference choices (like dark mode), and tracking behavioral metrics

// how to manage cookies in js(syntax) - JavaScript interacts with cookies primarily through the native document.cookie accessor property.