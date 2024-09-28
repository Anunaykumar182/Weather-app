const apiKey = '453464e924msh1f28cdcf38d751ap1de572jsn64c8f5f22e72'; // Replace with your OpenWeatherMap API key
const apiUrl = 'https://rapidapi.com/worldapi/api/open-weather13/playground/apiendpoint_d15cd885-e8e5-49e7-b94b-588c41687aa1';

// Event listeners for search and geolocation buttons
document.getElementById('searchBtn').addEventListener('click', fetchWeather);
document.getElementById('geoBtn').addEventListener('click', fetchWeatherByGeolocation);

// Get selected unit (Celsius or Fahrenheit)
const getSelectedUnit = () => document.querySelector('input[name="unit"]:checked').value;

function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    const unit = getSelectedUnit();
    if (city) {
        fetchWeatherData(city, unit);
    }
}

function fetchWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const unit = getSelectedUnit();
            fetchWeatherDataByCoordinates(latitude, longitude, unit);
        });
    }
}

function fetchWeatherData(city, unit) {
    fetch(`${apiUrl}weather?q=${city}&units=${unit}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data, unit);
            fetchFiveDayForecast(data.coord.lat, data.coord.lon, unit);
        })
        .catch(error => alert('City not found!'));
}

function fetchWeatherDataByCoordinates(lat, lon, unit) {
    fetch(`${apiUrl}weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data, unit);
            fetchFiveDayForecast(lat, lon, unit);
        })
        .catch(error => alert('Unable to fetch weather data!'));
}

function displayWeather(data, unit) {
    document.getElementById('cityName').innerText = `Weather in ${data.name}`;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°${unit === 'metric' ? 'C' : 'F'}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind.speed} ${unit === 'metric' ? 'm/s' : 'mph'}`;
}

function fetchFiveDayForecast(lat, lon, unit) {
    fetch(`${apiUrl}forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayTomorrowWeather(data, unit);
            displayForecast(data, unit);
        })
        .catch(error => alert('Unable to fetch forecast data!'));
}

function displayTomorrowWeather(data, unit) {
    const tomorrow = data.list[8]; // The forecast data for the next day (24 hours later, 3-hour intervals)

    document.getElementById('tomorrowTemp').innerText = `Tomorrow's Temperature: ${tomorrow.main.temp}°${unit === 'metric' ? 'C' : 'F'}`;
    document.getElementById('tomorrowCondition').innerText = `Conditions: ${tomorrow.weather[0].description}`;
}

function displayForecast(data, unit) {
    const forecastCards = document.getElementById('forecastCards');
    forecastCards.innerHTML = '';

    // Loop through forecast data (every 3 hours, choose 1 for each day)
    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const forecastCard = `
            <div class="forecast-card">
                <p>${new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                <p>${forecast.main.temp}°${unit === 'metric' ? 'C' : 'F'}</p>
                <p>${forecast.weather[0].description}</p>
            </div>
        `;
        forecastCards.innerHTML += forecastCard;
    }
}
