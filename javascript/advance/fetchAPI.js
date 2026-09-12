//    API (Application Programming Interface)

// API(Application Programming Interface): An API, which stands for Application Programming Interface,
//       is a set of rules and protocols that allows different software applications to communicate and share data with one another.

// Think of it as an invisible messenger. When you use an app on your phone, it connects to the internet and sends data to a server.
//  The server then retrieves that data, interprets it, performs the necessary actions, and sends it back to your phone.
//  The app then interprets that data and presents you with the information you wanted in a readable way.
//  All of this background communication happens via an API.

// The Restaurant Analogy:
//      To understand it easily, imagine you are sitting at a table in a restaurant:
//  1. You are the client (the application or user).
//  2. The Kitchen is the server (the system containing the data or tools to make your meal).
//  3. The Waiter is the API.



// Fetch API: GET, POST basics

// Fetch API: The Fetch API is a built-in JavaScript interface used for making asynchronous HTTP network requests in modern web browsers and Node.js.
//       It allows developers to seamlessly interact with external data sources, send or retrieve data, and load resources like files, images, or JSON data over the web without requiring a full page refresh.

// Key Features:

//  1. Promise-Based: It utilizes modern JavaScript Promises,
//  which makes managing asynchronous requests much cleaner and highly compatible with async/await syntax.

//  2. Global Availability: The global fetch() method is accessible within standard browser environments (Window) as well as background.

//  3. Streamlined Workflow: It supports standard HTTP request methods like GET, POST, PUT, PATCH, and DELETE.


// How It Works (The Two-Step Process):
//      When you call fetch(), it returns a Promise that resolves into a raw Response object as soon as the server responds with headers.
//  Because web data is streamed, you must execute a secondary step to read and parse the full response body content.

//  1.  Using Promise Chaining (.then)

// Step 1: Start the request
fetch('https://api.example.com/data')
    .then(response => {
        // Crucial: Fetch won't reject on 404 or 500 errors, you must manually check .ok
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Step 2: Parse the response body into JSON
    })
    .then(data => console.log(data)) // Work with your parsed data
    .catch(error => console.error('Fetch error:', error)); // Handles actual network failures



//   2. Using Clean Modern Syntax (async/await)

async function getApiResponse() {
    try {
        const response = await fetch('https://api.example.com/data');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


// Important Things to Remember:

//  1. HTTP Errors vs Network Failures: A fetch() promise only rejects if there is a literal network error (like being completely offline or encountering an invalid URL).
//  If the server responds with a 404 Not Found or 500 Internal Server Error, the promise still resolves normally.
//  You must always manually verify the response.ok property (which guarantees a successful status code in the 200–299 range).

//  2. Sending Data: By default, fetch() performs a GET request.
//  To send data (like a POST request), you need to pass an optional options configuration object as the second argument, specifying the HTTP method, headers, and stringified body data.

// Example:-
fetch('https://example.com', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: 'Alex', role: 'Developer' })
});