const apiKey = 'b5c7c518203606445ff1d07ddb7244c0';  // Replace with your OpenWeatherMap API key
const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');

weatherForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = cityInput.value;
    getWeather(city);
});

function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            displayError(error.message);
        });
}

function displayWeather(data) {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const city = data.name;
    const country = data.sys.country;
    const icon = data.weather[0].icon;

    weatherResult.innerHTML = `
        <h2>${city}, ${country}</h2>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p>Temperature: ${temperature}°C</p>
        <p>Weather: ${description}</p>
    `;
}

function displayError(message) {
    weatherResult.innerHTML = `<p class="error">${message}</p>`;
}
