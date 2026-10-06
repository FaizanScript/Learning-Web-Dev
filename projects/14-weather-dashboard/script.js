// selecting the elements (quering)
let weatherForm = document.querySelector(".search-form");
let cityInput = document.querySelector(".city-input");
let loadingState = document.querySelector(".loading");
let successState = document.querySelector(".weather");
let errorState = document.querySelector(".not-found");



// 
weatherForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let city = cityInput.value.trim();

});