// 01- what is the DOM? how does it represent the HTML structure?

// ans - The Document Object Model (DOM) is a programming interface that represents a web document as a logical, hierarchical tree of objects. When a browser loads an HTML page, it creates this model in memory to allow scripts like JavaScript to dynamically access, modify, and update the page's content, structure, and style.

// The DOM translates the static text of an HTML file into a live, interactive tree structure.
// Tree of Nodes: Everything in the HTML document is represented as a node in the DOM tree.
// Document Node: The root of the entire tree, representing the whole page.
// Element Nodes: Every HTML tag (e.g., <body>, <div>, <h1>) becomes an element node.
// Text Nodes: The actual text inside tags is its own node.Attribute Nodes: Attributes like class or id are also represented as nodes.
// Parent-Child Relationships: The hierarchy directly reflects how HTML elements are nested.
// If a <ul> tag contains <li> tags, the <ul> is the parent node, and the <li> tags are its child nodes
// .Elements at the same nesting level are considered siblings.


// 02 - Whats the difference between an element node and a text node?

// ans - The main difference is that an element node represents an HTML tag (like <div> or <p>), while a text node represents the actual text content inside those tag.


// 03 - what is the difference between getElementById and querySelector?

// ans - The main difference is that getElementById is a specialized tool only for selecting an element by its ID, whereas querySelector is a Swiss-army-knife tool that can find elements using any valid CSS selector (classes, IDs, tags, or complex combinations)


// 04 - what does getElementByClassName returns? Is it an array?

// ans - The getElementsByClassName() method returns an HTMLCollection. While it looks like an array, it is actually an "array-like" object, meaning it does not have built-in array methods like .map(), .filter(), or .forEach().


// 05 - use querySelectorAll to select all buttons with class. buy-now.

let buynowButton = document.querySelectorAll(".buy-now");
console.log(buynowButton);


// 06 - select the heading of a page by ID and change its text to "welcome to learning DOM"

let heading = document.querySelector("#heading");
heading.textContent = "welcome to learning DOM";


// 07 - select all <li> elements and print their text using a loop.

let li = document.querySelectorAll("li");

// this
li.forEach(function (val) {
    console.log(val.textContent);
});

// or this
for (let i = 0; i < li.length; i++) {
    console.log(li[i].textContent);
}


// 08 - whats the difference between innerText, textContent, and innerHTML?

// ans - The primary differences between innerText, textContent, and innerHTML involve how they handle CSS styling, hidden elements, HTML tags, and performanc

// innerHTML: Gets or sets the HTML markup within an element. It parses strings as HTML.

// textContent: Gets or sets the raw text content of an element and its descendants, including <script> and <style> elements, ignoring styling.

// innerText: Returns only the "human-readable" visible text, respecting CSS styling (like display: none).


// 09 - when should you use textcontent instead of innerText?

// ans - You should use textContent instead of innerText in almost every situation where you want to retrieve or set plain text because it is more performant, standard-compliant, and predictable.


// 10 - select a paragraph and replace its content with "<b>Updated</b> by javascript"

let p = document.querySelector("p");

p.innerHTML = "<b>Updated</b> by javascript";


// 11 - how do you get the src of an image using javaScript?

let img = document.querySelector("img");

// this
console.log(img.src);

// or this
console.log(img.getAttribute("src"));


// 12 - what does setAttribute() do?

// ans - setAttribute() is a DOM method used to add a new attribute or update the value of an existing attribute on a specific HTML element.


// 13 - select a link and update its href to point to https://www.google.com

let a = document.querySelector("a");

a.href = "https://www.google.com";


// 14 - add a little attribute to a div dynamically

let div = document.querySelector("div");

div.setAttribute("title", "some info");


// 15 - remove the disabled attribute from a button

let btn = document.querySelector("button");

btn.removeAttribute("disabled");


// 16 - what does createElement() do? whats returned? 

// ans - The createElement() method creates a new HTML element in memory, specified by its tag name (e.g., 'div', 'p', or 'button')


// 17 - whats the difference between appendchild() and prepend()

// ans - The main difference between appendChild() and prepend() is where they insert new content relative to a parent element's existing children: appendChild() adds it at the end, while prepend() adds it at the beginning.


// 18 - can you remove an element using removeChild()?

// ans - yes you can, 
// document.querySelector("div").removeChild(elementnode);


// 19 - create a new list item <li>new task</li> and add it to the end of a <ul>

let ul = document.querySelector("ul");

let li = document.createElement("li");

li.textContent = "new task";

ul.appendChild(li);


// 20 - create a new image element with a placeholder source and add it at the top if a div

let image = document.createElement("img");

img.setAttribute("src", "download (6).jpg");

document.querySelector("div").prepend(image);


// 21 - select the first item in a list and delete it from the DOM

let ul = document.querySelector("ul");
let li = document.querySelector("li");

ul.removeChild(li);


// 22 - how do you change the background color of an element?

// ans - To change an element's background color with JavaScript, the most direct method is using the style.backgroundColor property

// document.querySelector("").style.backgroundColor = "black";


// whats the difference between .classList.add() and .classList.toggle()?

// ans - The main difference is how they handle the state of a class: .add() is a one-way command that only adds a class, while .toggle() acts like a light switch, adding the class if it's missing and removing it if it's already there


// 23 - add a highlight class to every even item in a list.

let li = document.querySelectorAll("ul li:nth-child(2n)");

li.forEach(function (elem) {
    elem.classList.add("highlight");
});


// 24 - set the font size of all <p> elements to 18px using .style

let p = document.querySelectorAll("p");

p.forEach(function (elem) {
    elem.style.fontSize = "180px";
});