// selecting elements
let searchForm = document.querySelector(".search-form");
let searchInput = document.querySelector(".movie-search");
let statusMessage = document.querySelector(".status");
let resultList = document.querySelector(".result-list");



// function code to get the result from the api
searchForm.addEventListener("submit", async function (evt) {
    evt.preventDefault();

    let movieName = searchInput.value.trim();

    if (!movieName) return;

    let encodedMovieName = encodeURIComponent(movieName);

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodedMovieName}`;

    try {
        // send the HTTP request and wait for the response object
        const response = await fetch(url, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWQ1ODgxMDIyYzk2ZTg1MzNkYTcyMTU2NTIyMjQzZiIsIm5iZiI6MTc5MTkwOTMwMi42MTksInN1YiI6IjZhY2U1ZGI2MGUwMjJjMGE2ZThlOTRjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yG0oof8YICGSm7uY4tpq3Z_b-NgNxOhRIPBHkTnJUa8"
            }

        });

        // check if the HTTP status code is successful (200-299)
        if (!response.ok) {
            throw new Error(response.status);
        }

        // parse the response body as JSON
        const data = await response.json();

        const movies = data.results.map(movie => ({
            title: movie.title,
            poster: movie.poster_path,
            releaseDate: movie.release_date,
            rating: movie.vote_average,
            overview: movie.overview,
            id: movie.id
        }));

        renderMovies(movies);

    } catch (error) {
        console.error(error);
    }

});


// function code to render and show the results
function renderMovies(movie) {

    // looping the movies array to get each object and create its card and render it
    movie.forEach(element => {

        // creating the elements that are gonna be in the result list (dynamically)

        // creating the li element
        const li = document.createElement("li");

        // creating the article element
        const movieCard = document.createElement("article");

        // giving the class to article element
        movieCard.classList.add("movie-card");

        // creating the img element
        const img = document.createElement("img");

        // giving img elment its class
        img.classList.add("poster");

        // setting the img of the poster
        img.src = `https://image.tmdb.org/t/p/w500${element.poster}`;
        img.alt = `Poster for ${element.title}`;

        // Hide the element if the image fails to load
        img.onerror = function () {
            this.style.display = 'none';
        };

        // creating the div element
        const movieInfo = document.createElement("div");

        // giving the div its class
        movieInfo.classList.add("movie-info");

        // creating the name, h3 element
        const name = document.createElement("h3");

        // giving h3 its class
        name.classList.add("name");

        // setting the text content of name
        name.textContent = element.title;

        // creating the p element for meta
        const meta = document.createElement("p");

        // giving the p (meta) its class
        meta.classList.add("meta");

        // creating the time element
        const date = document.createElement("time");

        // giving time its class
        date.classList.add("date");

        // setting the text content of date
        date.dateTime = element.releaseDate;

        // 3. Convert the date string into a JavaScript Date object
        const dateObj = new Date(element.releaseDate);

        date.textContent = dateObj.getFullYear();

        // creating the raing span element
        const rating = document.createElement("span");

        // giving the rating span element its class
        rating.classList.add("rating");

        // setting the rating text content
        rating.textContent = element.rating.toFixed(1);

        // creating the overview element
        const overview = document.createElement("p");

        // giving overview element its class
        overview.classList.add("overview");

        // setting the text content of overwiew
        overview.textContent = element.overview;


        // appending the elements to its parent

        // appending the time and rating in meta
        meta.append(date, rating);

        // appending the name and meta in movie-info
        movieInfo.append(name, meta, overview);

        // appending the img and movie-info in article (movie card)
        movieCard.append(img, movieInfo);

        // appending the movie card in li 
        li.append(movieCard);

        // appending the movie card in the ul (result list)
        resultList.append(li);
    });

}