🌦️ Weather App
A sleek and interactive Weather Forecasting App that provides real-time weather data, forecasts, and environmental metrics for any city. The app allows users to search for weather information based on their city or their current location, while toggling between Celsius and Fahrenheit and light or dark mode themes.

🔥 Features
Real-Time Weather: Get accurate and up-to-date weather data including temperature, humidity, wind speed, and more.
Geolocation: Automatically fetch the weather for your current location.
Unit Conversion: Switch between Celsius (°C) and Fahrenheit (°F) easily.
Dark Mode: Toggle between light and dark modes for a personalized user experience.
Detailed Information: View additional weather metrics like Air Quality, UV Index, Sunrise, and Sunset times.
Tomorrow's Forecast: Check the weather for the upcoming day.
Weather Alerts: Receive alerts for extreme weather conditions.

🚀 Tech Stack
HTML5 & CSS3: For structuring and styling the app.
JavaScript (ES6): The core logic to fetch weather data and dynamically update the UI.
OpenWeatherMap API: Provides real-time weather data.
Geolocation API: For fetching the user’s current location.
Font Awesome: For weather icons and additional UI elements.

🛠️ Setup & Installation
1. Clone the repository
bash

git clone https://github.com/your-username/weather-app.git
cd weather-app
2. Open the index.html file
Simply open the index.html file in your favorite web browser.

3. API Key Setup
To run the weather app, you need an API key from OpenWeatherMap.

Sign up for an account at OpenWeatherMap and obtain your API key.
Replace the placeholder API key in script.js with your own:
javascript

const apiKey = 'your-api-key-here';
4. Enjoy the App!
Now you can search for the weather in any city or use geolocation to fetch weather data based on your current position.

🌟 How to Use
Search: Enter the city name in the search bar and click the search button (🔍) to get the current weather.
Use My Location: Click the "Use My Location" button to fetch weather data based on your current geolocation.
Switch Units: Click the "Switch to °F" button to toggle between Celsius and Fahrenheit.
Dark Mode: Click the "Switch to Dark Mode" button to enable a dark theme for the app.
Detailed Info: Scroll down to view detailed information such as Air Quality, UV Index, and tomorrow’s forecast.

🎯 API Endpoints Used
Current Weather:

Endpoint: https://api.openweathermap.org/data/2.5/weather
Used for fetching current weather data by city or geolocation

UV Index:

Endpoint: http://api.openweathermap.org/data/2.5/uvi
Fetches the UV Index for the specified location.

⚙️ Dependencies
OpenWeatherMap API
Font Awesome (for icons)
Geolocation API (built-in browser API)

🐛 Known Issues
The UV Index might take a few seconds to load due to OpenWeatherMap API response time.
Some weather icons might not perfectly match the weather condition due to limitations in the emoji set.

.
📜 License
This project is licensed under the MIT License - see the LICENSE file for details.


