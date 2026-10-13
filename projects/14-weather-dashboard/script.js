// selecting the elements (querying)
let weatherForm = document.querySelector(".search-form");
let cityInput = document.querySelector(".city-input");
let loadingState = document.querySelector(".loading");
let successState = document.querySelector(".weather");
let errorState = document.querySelector(".not-found");

// the elements we are gonna change the text content of
let city = document.querySelector(".city");
let temperature = document.querySelector(".temperature");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");


// function code to get the weather data when search button is clicked
weatherForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    // making sure to hide the states
    loadingState.hidden = false;
    successState.hidden = true;
    errorState.hidden = true;

    // to get the city name from the user's input
    let cityName = cityInput.value.trim();

    // first API: get city name, latitude and longitude
    let url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;

    try {

        // FIRST API
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("HTTP error");
        }

        const data = await response.json();

        // check if city was found
        if (data.results.length === 0) {
            throw new Error("city not found");
        }

        // get the data needed for the second API
        const name = data.results[0].name;
        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;

        // SECOND API: get weather data
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
            throw new Error("HTTP error");
        }

        const weatherData = await weatherResponse.json();

        // get the weather values
        const temperatureValue = weatherData.current.temperature_2m;
        const humidityValue = weatherData.current.relative_humidity_2m;
        const windValue = weatherData.current.wind_speed_10m;

        // putting the data into the UI
        city.textContent = name;
        temperature.textContent = temperatureValue + "°C";
        humidity.textContent = humidityValue + "%";
        wind.textContent = windValue + " km/h";

        // show successful state
        successState.hidden = false;

    } catch (error) {

        console.log(error);
        errorState.hidden = false;

    } finally {

        loadingState.hidden = true;

    }

});