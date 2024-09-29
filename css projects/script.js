
// const apiKey = '1c629ffcdb73046f9f717c8889083a90'; // Replace with your OpenWeatherMap API key
// const apiUrl = 'https://api.openweathermap.org/data/2.5/';
// let unit = 'metric'; // Default to Celsius
// let unitSymbol = '°C'; // Symbol for Celsius

// document.getElementById('getStartBtn').addEventListener('click', () => {
//     document.getElementById('splashScreen').style.display = 'none';
//     document.getElementById('weatherApp').style.display = 'block';
// });

// document.getElementById('searchBtn').addEventListener('click', fetchWeather);
// document.getElementById('geoBtn').addEventListener('click', getLocation);
// document.getElementById('unitToggle').addEventListener('click', toggleUnits);

// // Function to toggle between Celsius and Fahrenheit
// function toggleUnits() {
//     if (unit === 'metric') {
//         unit = 'imperial'; // Switch to Fahrenheit
//         unitSymbol = '°F';
//         document.getElementById('unitToggle').innerText = 'Switch to °C';
//     } else {
//         unit = 'metric'; // Switch back to Celsius
//         unitSymbol = '°C';
//         document.getElementById('unitToggle').innerText = 'Switch to °F';
//     }
//     fetchWeather();
// }

// // Function to toggle dark mode
// function toggleDarkMode() {
//     isDarkMode = !isDarkMode; // Flip dark mode state

//     if (isDarkMode) {
//         document.body.classList.add('dark-mode');
//         document.getElementById('darkModeToggle').innerText = 'Switch to Light Mode';
//     } else {
//         document.body.classList.remove('dark-mode');
//         document.getElementById('darkModeToggle').innerText = 'Switch to Dark Mode';
//     }
// }

// // Function to get user's location
// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             const { latitude, longitude } = position.coords;
//             fetchWeatherDataByCoords(latitude, longitude, unit);
//         }, () => {
//             document.getElementById('errorMessage').innerText = 'Unable to retrieve your location.';
//         });
//     } else {
//         document.getElementById('errorMessage').innerText = 'Geolocation is not supported by this browser.';
//     }
// }

// // Function to fetch weather data by city
// function fetchWeather() {
//     const city = document.getElementById('cityInput').value;
//     if (city) {
//         document.getElementById('loader').style.display = 'block';
//         document.getElementById('errorMessage').innerText = ''; // Clear previous errors
//         fetchWeatherData(city, unit);
//     } else {
//         document.getElementById('errorMessage').innerText = 'Please enter a city name.';
//     }
// }

// // Function to get weather data by coordinates
// function fetchWeatherDataByCoords(lat, lon, unit) {
//     fetch(`${apiUrl}weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.cod === 200) {
//                 displayWeather(data, unit);
//                 fetchFiveDayForecast(data.coord.lat, data.coord.lon, unit);
//                 fetchDetailedWeather(data.coord.lat, data.coord.lon);
//             } else {
//                 throw new Error(data.message);
//             }
//         })
//         .catch(error => {
//             document.getElementById('errorMessage').innerText = error.message;
//         })
//         .finally(() => {
//             document.getElementById('loader').style.display = 'none';
//         });
// }

// // Function to get current weather data
// function fetchWeatherData(city, unit) {
//     fetch(`${apiUrl}weather?q=${city}&units=${unit}&appid=${apiKey}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.cod === 200) {
//                 displayWeather(data, unit);
//                 fetchFiveDayForecast(data.coord.lat, data.coord.lon, unit);
//                 fetchDetailedWeather(data.coord.lat, data.coord.lon);
//             } else {
//                 throw new Error(data.message);
//             }
//         })
//         .catch(error => {
//             document.getElementById('errorMessage').innerText = error.message;
//         })
//         .finally(() => {
//             document.getElementById('loader').style.display = 'none';
//         });
// }

// // Function to display current weather
// function displayWeather(data, unit) {
//     document.getElementById('cityName').innerText = `Weather in ${data.name}`;
//     document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}${unitSymbol}`;
//     document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
//     document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind.speed} m/s`;

//     // Show weather emoji based on current weather condition
//     const weatherCondition = data.weather[0].main;
//     document.getElementById('weatherIcon').innerText = getWeatherIcon(weatherCondition);

//     const date = new Date(data.dt * 1000);
//     document.getElementById('dateTime').innerText = `Date & Time: ${date.toLocaleString()}`;
// }

// // Get weather icon (emoji) based on condition
// function getWeatherIcon(condition) {
//     switch (condition) {
//         case 'Clear':
//             return '☀️';
//         case 'Clouds':
//             return '☁️';
//         case 'Rain':
//             return '🌧️';
//         case 'Snow':
//             return '❄️';
//         case 'Thunderstorm':
//             return '⛈️';
//         default:
//             return '🌈'; // Default icon
//     }
// }

// // Fetch 5-day forecast (for tomorrow's weather)
// function fetchFiveDayForecast(lat, lon, unit) {
//     fetch(`${apiUrl}forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`)
//         .then(response => response.json())
//         .then(data => {
//             const tomorrowWeather = data.list[8]; // 24 hours from now
//             document.getElementById('tomorrowTemp').innerText = `Temperature: ${tomorrowWeather.main.temp}${unitSymbol}`;
//             document.getElementById('tomorrowHumidity').innerText = `Humidity: ${tomorrowWeather.main.humidity}%`; // Added Humidity
//             document.getElementById('tomorrowWindSpeed').innerText = `Wind Speed: ${tomorrowWeather.wind.speed} m/s`; // Added Wind Speed
//             document.getElementById('tomorrowCondition').innerText = tomorrowWeather.weather[0].description;
//             document.getElementById('tomorrowIcon').innerText = getWeatherIcon(tomorrowWeather.weather[0].main);
//         });
// }

// // Fetch detailed weather info: Air Quality, UV Index, Sunrise, and Sunset
// function fetchDetailedWeather(lat, lon) {
//     const airQualityUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
//     const uvIndexUrl = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

//     // Fetch Air Quality
//     fetch(airQualityUrl)
//         .then(response => response.json())
//         .then(data => {
//             const airQuality = data.list[0].main.aqi; // Air Quality Index
//             document.getElementById('airQuality').innerText = `Air Quality: ${getAirQualityDescription(airQuality)}`;
//         });

//     // Fetch UV Index
//     fetch(uvIndexUrl)
//         .then(response => response.json())
//         .then(data => {
//             document.getElementById('uvIndex').innerText = `UV Index: ${data.value}`;
//         });

//     // Fetch Sunrise and Sunset times
//     fetch(`${apiUrl}weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
//         .then(response => response.json())
//         .then(data => {
//             const sunrise = new Date(data.sys.sunrise * 1000);
//             const sunset = new Date(data.sys.sunset * 1000);
//             document.getElementById('sunrise').innerText = `Sunrise: ${sunrise.toLocaleTimeString()}`;
//             document.getElementById('sunset').innerText = `Sunset: ${sunset.toLocaleTimeString()}`;
//         });
// }

// // Get description for air quality index
// function getAirQualityDescription(aqi) {
//     switch (aqi) {
//         case 1:
//             return 'Good';
//         case 2:
//             return 'Fair';
//         case 3:
//             return 'Moderate';
//         case 4:
//             return 'Poor';
//         case 5:
//             return 'Very Poor';
//         default:
//             return 'Unknown';
//     }
// }

const apiKey = '1c629ffcdb73046f9f717c8889083a90'; // Replace with your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/';
let unit = 'metric'; // Default to Celsius
let unitSymbol = '°C'; // Symbol for Celsius
let isDarkMode = false; // Initialize dark mode state

document.getElementById('getStartBtn').addEventListener('click', () => {
    document.getElementById('splashScreen').style.display = 'none';
    document.getElementById('weatherApp').style.display = 'block';
});

document.getElementById('searchBtn').addEventListener('click', fetchWeather);
document.getElementById('geoBtn').addEventListener('click', getLocation);
document.getElementById('unitToggle').addEventListener('click', toggleUnits);
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode); // Add this line

// Function to toggle between Celsius and Fahrenheit
function toggleUnits() {
    if (unit === 'metric') {
        unit = 'imperial'; // Switch to Fahrenheit
        unitSymbol = '°F';
        document.getElementById('unitToggle').innerText = 'Switch to °C';
    } else {
        unit = 'metric'; // Switch back to Celsius
        unitSymbol = '°C';
        document.getElementById('unitToggle').innerText = 'Switch to °F';
    }
    fetchWeather();
}

// Function to toggle dark mode
function toggleDarkMode() {
    isDarkMode = !isDarkMode; // Flip dark mode state

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').innerText = 'Switch to Light Mode';
    } else {
        document.body.classList.remove('dark-mode');
        document.getElementById('darkModeToggle').innerText = 'Switch to Dark Mode';
    }
}

// Function to get user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherDataByCoords(latitude, longitude, unit);
        }, () => {
            document.getElementById('errorMessage').innerText = 'Unable to retrieve your location.';
        });
    } else {
        document.getElementById('errorMessage').innerText = 'Geolocation is not supported by this browser.';
    }
}

// Function to fetch weather data by city
function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        document.getElementById('loader').style.display = 'block';
        document.getElementById('errorMessage').innerText = ''; // Clear previous errors
        fetchWeatherData(city, unit);
    } else {
        document.getElementById('errorMessage').innerText = 'Please enter a city name.';
    }
}

// Function to get weather data by coordinates
function fetchWeatherDataByCoords(lat, lon, unit) {
    fetch(`${apiUrl}weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data, unit);
                fetchFiveDayForecast(data.coord.lat, data.coord.lon, unit);
                fetchDetailedWeather(data.coord.lat, data.coord.lon);
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            document.getElementById('errorMessage').innerText = error.message;
        })
        .finally(() => {
            document.getElementById('loader').style.display = 'none';
        });
}

// Function to get current weather data
function fetchWeatherData(city, unit) {
    fetch(`${apiUrl}weather?q=${city}&units=${unit}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data, unit);
                fetchFiveDayForecast(data.coord.lat, data.coord.lon, unit);
                fetchDetailedWeather(data.coord.lat, data.coord.lon);
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            document.getElementById('errorMessage').innerText = error.message;
        })
        .finally(() => {
            document.getElementById('loader').style.display = 'none';
        });
}

// Function to display current weather
function displayWeather(data, unit) {
    document.getElementById('cityName').innerText = `Weather in ${data.name}`;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}${unitSymbol}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind.speed} m/s`;

    // Show weather emoji based on current weather condition
    const weatherCondition = data.weather[0].main;
    document.getElementById('weatherIcon').innerText = getWeatherIcon(weatherCondition);

    const date = new Date(data.dt * 1000);
    document.getElementById('dateTime').innerText = `Date & Time: ${date.toLocaleString()}`;
}

// Get weather icon (emoji) based on condition
function getWeatherIcon(condition) {
    switch (condition) {
        case 'Clear':
            return '';
        case 'Clouds':
            return '';
        case 'Rain':
            return '';
        case 'Snow':
            return '';
        case 'Thunderstorm':
            return '';
        default:
            return ''; // Default icon
    }
}

// Fetch 5-day forecast (for tomorrow's weather)
function fetchFiveDayForecast(lat, lon, unit) {
    fetch(`${apiUrl}forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const tomorrowWeather = data.list[8]; // 24 hours from now
            document.getElementById('tomorrowTemp').innerText = `Temperature: ${tomorrowWeather.main.temp}${unitSymbol}`;
            document.getElementById('tomorrowHumidity').innerText = `Humidity: ${tomorrowWeather.main.humidity}%`; // Added Humidity
            document.getElementById('tomorrowWindSpeed').innerText = `Wind Speed: ${tomorrowWeather.wind.speed} m/s`; // Added Wind Speed
            document.getElementById('tomorrowCondition').innerText = tomorrowWeather.weather[0].description;
            document.getElementById('tomorrowIcon').innerText = getWeatherIcon(tomorrowWeather.weather[0].main);
        });
}

// Fetch detailed weather info: Air Quality, UV Index, Sunrise, and Sunset
function fetchDetailedWeather(lat, lon) {
    const airQualityUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const uvIndexUrl = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // Fetch Air Quality
    fetch(airQualityUrl)
        .then(response => response.json())
        .then(data => {
            const airQuality = data.list[0].main.aqi; // Air Quality Index
            document.getElementById('airQuality').innerText = `Air Quality: ${getAirQualityDescription(airQuality)}`;
        });

    // Fetch UV Index
    fetch(uvIndexUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('uvIndex').innerText = `UV Index: ${data.value}`;
        });

    // Fetch Sunrise and Sunset times
    fetch(`${apiUrl}weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const sunrise = new Date(data.sys.sunrise * 1000);
            const sunset = new Date(data.sys.sunset * 1000);
            document.getElementById('sunrise').innerText = `Sunrise: ${sunrise.toLocaleTimeString()}`;
            document.getElementById('sunset').innerText = `Sunset: ${sunset.toLocaleTimeString()}`;
        });
}

// Get description for air quality index
function getAirQualityDescription(aqi) {
    switch (aqi) {
        case 1:
            return 'Good';
        case 2:
            return 'Fair';
        case 3:
            return 'Moderate';
        case 4:
            return 'Poor';
        case 5:
            return 'Very Poor';
        default:
            return 'Unknown';
    }
}
