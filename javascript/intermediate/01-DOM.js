// The DOM - The DOM (Document Object Model) is a programming interface for web documents. It acts as a bridge that allows JavaScript to access, change, and style the content of a web page dynamically

// DOM manipulation - it is the process of using JavaScript to interact with and change a web page's content, structure, and style dynamically. It allows developers to update a website in real-time without requiring a full page refresh

// Q - What is the difference between DOM (document object model) and DOM manipulation

// Ans - The Document Object Model (DOM) is a structured, tree-like representation of an HTML document, acting as the programming interface (API) that browser engines create, while DOM Manipulation is the process of using scripts (like JavaScript) to add, remove, or modify those elements, styles, or attributes to create dynamic, interactive web pages



// Selectors - Selecting HTML elements in JavaScript is done using methods provided by the document object

// document.getElementById() is a built-in method used to select a specific HTML element from a webpage based on its unique id attribute

let a = document.getElementById("a");

// document.getElementsByClassName(). It allows you to select all HTML elements that share a specific CSS class

let b = document.getElementsByClassName("be");

// document.querySelector() is a method used to find and return the first element in the document that matches a specific CSS selector or html tag.

let c = document.querySelector("h1"); // it will select the first h1 tag

// document.querySelectorAll() is a built-in method used to find and return all elements in a web page that match a specific CSS selector or html tag. (it collects every single element it finds, into an array-like list.)

let d = document.querySelectorAll("h1"); // it will select every h1 tag in the web page 



// text/content access - text or content access refers to the methods used to retrieve or modify the text and HTML stored inside DOM elements
// The three primary properties for this are textContent, innerText, and innerHTML

let h1 = document.querySelector("h1");
console.dir(h1);

// The textContent property represents the raw text content of a node and its descendants.
// what it does:  Returns the text exactly as it appears in the HTML markup, including text inside hidden elements (e.g., <script>, <style>, or elements with display: none)

h1.textContent = "hello, i am being changed";
console.dir(h1);

// The innerText property focuses on "human-readable" text.
// What it does: It is aware of CSS styling and only returns text that is actually visible on the screen. It ignores text in hidden elements.

h1.innerText = "hui, i am again being changed";
console.dir(h1);

// The innerHTML property allows access to the full HTML structure within an element
// What it does: It returns or sets the HTML markup, including tags (e.g., <div>Hello <b>World</b></div>).

h1.innerHTML = "<span>holla, i am again changed</span>";
console.dir(h1);



// attribute manipulation - Attribute manipulation is the process of dynamically interacting with and changing the attributes of HTML (DOM).

let e = document.querySelector("a");

// getAttribute - it Retrieves the current value of a specific attribute. Returns null if the attribute doesn't exist.

console.log(a.getAttribute("href"));

// setAttribute(name, value): Adds a new attribute or updates the value of an existing one.

a.setAttribute("href", "https://www.youtube.com");

// removeAttribute(name): Completely removes an attribute from the element.

a.removeAttribute("href");



// Dynamic DOM manipulation - Dynamic DOM manipulation is the process of using JavaScript to interact with and modify the Document Object Model (DOM) after a web page has loaded. This allows you to change a site's content, structure, and style in real-time without requiring a full page refresh.

// createElement - The document.createElement() method is a core part of this process. It creates a new HTML element node in memory, which you can then customize and add to the visible webpage.

let h4 = document.createElement("h4");
h4.textContent = "create element";

// append - the process of adding a new or existing node as the last child of a specified parent element

document.querySelector("body").append(h4);

// prepend - the process of adding a new or existing node as the first child of a specified parent element

document.querySelector("body").prepend(e);

// remove - The remove() method is the current standard for deleting an element. It is straightforward because it does not require you to find the parent element first; you simply call it on the element itsel 

h1.remove();



// style updates via .style and classlist (add, remove, toggle)

// The style property in JavaScript is a built-in property of every HTML DOM element used to get or set its inline CSS styles
// When you use element.style, you are interacting with the style attribute directly on the HTML tag, which typically gives these changes the highest priority (specificity) over external CSS file

let h6 = document.querySelector("a");
h6.style.color = "red"; //example
h6.style.fontFamily = "Gilroy"; //example
h6.style.backgroundColor = "black"; //example

// add("className"): Adds one or more classes to the element. It automatically prevents duplicates.

let h62 = document.querySelector(".hulu");

h62.classList.add("hulu");

// classList.remove() is a JavaScript method used to remove one or more CSS classes from an HTML element

h62.classList.remove("hulu");

// The classList.toggle() method  is an on/off switch for CSS classes on an HTML element (agar lagi hui hai to hata dega or nahi laga hui hai to laga dega)

h62.classList.toggle("hulu");