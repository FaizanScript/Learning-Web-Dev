const url = "https://api.themoviedb.org/3/search/movie?query=Batman";


async function xyz() {
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

        // const name = data.results[0].title;
        // const poster = data.results[0].poster_path;
        // const releaseDate = data.results[0].release_date;
        // const rating = data.results[0].vote_average;
        // const overview = data.results[0].overview;
        // const id = data.results[0].id;

        // displaying the data
        // console.log(name);
        // console.log(poster);
        // console.log(releaseDate);
        // console.log(rating);
        // console.log(overview);
        // console.log(id);

        const movies = data.results.map(movie => ({
            title: movie.title,
            poster: movie.poster_path,
            releaseDate: movie.release_date,
            rating: movie.vote_average,
            overview: movie.overview,
            id: movie.id
        }));

        console.log(movies);

    } catch (error) {
        console.error(error);
    }

}

xyz();

