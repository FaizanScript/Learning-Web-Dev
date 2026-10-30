// Array of objects for the Random Quote Generator
const quotes = [
    // quote 1
    {
        quote: "As long as I'm alive, there are infinite chances!",
        author: "~Monkey D Luffy"
    },

    //quote 2 
    {
        quote: "no tree can grow to heaven unless its roots reach down to hell.",
        author: "~Roronoa Zoro"
    },

    // qoute 3
    {
        quote: "Kids who have never seen peace and kids who have never seen war have different values!",
        author: "~Donquixote Doflamingo"
    },

    // quote 4
    {
        quote: "It's not only victory that makes a man, but defeat... joy and sorrow alike. There's no shame in backing down. There's no shame in crying, so long as you overcome it.",
        author: "~Shanks"
    },

    // quote 5
    {
        quote: "If you don’t take risks, you can’t create a future.",
        author: "Marshall D. Teach"
    }
];



// Selecting Elements (Querying)
let quote = document.querySelector(".quote");
let author = document.querySelector(".author");
let newQuote = document.querySelector(".new");


// Random Quote Generator function code
newQuote.addEventListener("click", function () {

    // gives a random number from the quotes array
    let randomIndex = Math.floor(Math.random() * quotes.length);

    // gives the random quote
    let randomQuote = quotes[randomIndex];

    quote.textContent = randomQuote.quote;
    author.textContent = randomQuote.author;

});