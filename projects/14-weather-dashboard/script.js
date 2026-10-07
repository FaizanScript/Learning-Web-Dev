// selecting the elements (quering)
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
weatherForm.addEventListener("submit", function (event) {
    // this stops the browser from executing its default behavior associated with a specific event
    event.preventDefault();

    // making sure to hidden the states
    loadingState.hidden = false;
    successState.hidden = true;
    errorState.hidden = true;

    // to get the cityname from the user's input
    let cityName = cityInput.value.trim();

    // this the first API to get the city name, latitude and longitude
    let url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;

    // fetching the first API
    fetch(url)

    // the fectch returns the raw data

        // to make that data readable, this will give the data in object/array form  
        .then(function (response) {
            return response.json();
        })

        // the returned data from first .then will go here 
        .then(function (data) {

            // these are the things we want for the 2nd API
            const name = data.results[0].name;
            const latitude = data.results[0].latitude;
            const longitude = data.results[0].longitude;

            // this is the 2nd API to get the weather data
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

            // this part is the nested promise

            return fetch(weatherUrl)

            // this will return the parsed data of weather api 
                .then(function (response) {
                    return response.json();
                })

            // the parsed data will go here and and it will return an object
                .then(function (weatherData) {
                    return {
                        name: name,
                        weather: weatherData
                    };
                });

            // so eventually this outer .then (2nd one) will return an object containing name and weatherdata
        })

        // the 2nd returned data will go here
        .then(function (data) {

            // to get the weather data to show
            const name = data.name;
            const temperatureValue = data.weather.current.temperature_2m;
            const humidityValue = data.weather.current.relative_humidity_2m;
            const windValue = data.weather.current.wind_speed_10m;

            // putting the data into the ui
            city.textContent = name;
            temperature.textContent = temperatureValue + "°C";
            humidity.textContent = humidityValue + "%";
            wind.textContent = windValue + "km/h";

            // changing the state once i get the data
            successState.hidden = false;
        })

        // this will run if the request get rejected
        .catch(function (error) {
            console.log(error);
            errorState.hidden = false;
        })

        // this will run regardless of anything
        .finally(function () {
            loadingState.hidden = true;
        });

});