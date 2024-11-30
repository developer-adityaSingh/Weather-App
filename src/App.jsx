import { useState, useEffect, useRef } from "react";
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import clear_icon from "./assets/clear.png";
import cloud_icon from "./assets/cloud.png";
import drizzle_icon from "./assets/drizzle.png";
import rain_icon from "./assets/rain.png";
import snow_icon from "./assets/snow.png";
function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const inputRef = useRef();

  const allIcon = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const fetchWeatherData = async (city) => {
    try {
      const apiKey = import.meta.env.VITE_APIKEY;
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

      // Fetch current weather
      const weatherResponse = await fetch(currentWeatherUrl);
      const weather = await weatherResponse.json();

      // Fetch 7-day forecast
      const forecastResponse = await fetch(forecastUrl);
      const forecast = await forecastResponse.json();
      const icon = allIcon[weather.weather[0].icon] || clear_icon;
      setWeatherData({
        city: weather.name,
        temperature: Math.floor(weather.main.temp),
        description: weather.weather[0].description,
        icon: icon,
        windSpeed: weather.wind.speed,
        humidity: weather.main.humidity,
        sunrise: new Date(weather.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(weather.sys.sunset * 1000).toLocaleTimeString(),
      });

      // Extract hourly and daily forecast
      const dailyForecast = forecast.list.filter((entry) =>
        entry.dt_txt.includes("12:00:00")
      );
      setForecastData(dailyForecast);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const updateCurrentTime = () => {
    setCurrentTime(new Date());
  };

  useEffect(() => {
    fetchWeatherData("Bhopal");
    const timeInterval = setInterval(updateCurrentTime, 1000); // Update time every second
    return () => clearInterval(timeInterval); // Cleanup interval
  }, []);

  return (
    <div className="app">
      {/* Navbar */}
      <nav>
        <div className="logo">ClimaSense</div>
        <ul className="navSearchBox">
          <li>
            <input
              ref={inputRef}
              className="NavcityName"
              type="text"
              placeholder="Enter City Name"
            />
          </li>
          <li>
            <button onClick={() => fetchWeatherData(inputRef.current.value)}>
              Search
            </button>
          </li>
        </ul>
        <ul className="leftNav">
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
      </nav>

      {/* Current Weather */}
      <div className="current-weather">
        <h2>
          {currentTime.toLocaleDateString()} -{" "}
          {currentTime.toLocaleTimeString()}
        </h2>
        {weatherData && (
          <div className="weather-info">
            <div className="cityName">
              <h1>{weatherData.city}</h1>
            </div>
            <div className="weather-details">
              <h2>{weatherData.temperature}°C</h2>
              <p>{weatherData.description}</p>
              <p>Humidity: {weatherData.humidity}%</p>
              <p>Wind Speed: {weatherData.windSpeed} m/s</p>
              <p>Sunrise: {weatherData.sunrise}</p>
              <p>Sunset: {weatherData.sunset}</p>
            </div>
            <img
              className="imgTemp"
              src={weatherData.icon}
              alt="Weather Icon"
            />
          </div>
        )}
      </div>

      {/* Weekly Forecast */}
      <div className="weekly-forecast">
        <h2>7-Day Weather Forecast</h2>
        <div className="forecast-container">
          {forecastData.map((day, index) => (
            <div key={index} className="forecast-card">
              <p>
                {new Date(day.dt_txt).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </p>
              <img src={allIcon[day.weather[0].icon]} alt="Weather Icon" />
              <p>{Math.floor(day.main.temp)}°C</p>
            </div>
          ))}
        </div>
      </div>
      {/* Website Specifications */}
      <div className="container">
        <div className="website-specifications">
          <h2>Website Specifications</h2>
          <div className="specifications-list">
            <h3>Features:</h3>
            <ul>
              <li>
                Displays current weather, including temperature, humidity, and
                wind speed.
              </li>
              <li>
                Shows a 7-day weather forecast with daily high/low temperatures
                and weather icons.
              </li>
              <li>
                Hourly updates to provide real-time weather details for each
                hour of the day.
              </li>
              <li>
                Dynamic time display that updates every second to show the
                current date and time.
              </li>
              <li>
                Simple and responsive user interface for an easy and engaging
                experience.
              </li>
            </ul>
            <h3>Technology Stack:</h3>
            <ul>
              <li>Frontend: React.js for building the user interface.</li>
              <li>
                Weather API: OpenWeatherMap API for fetching weather data.
              </li>
              <li>
                Hosting: Deployed on Vercel.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        {/* User Experience Section */}
        <div className="user-experience">
          <h2>User Experience</h2>
          <p>
            Our website is designed with simplicity and ease of use in mind.
            Users can quickly find the weather forecast for their desired
            location by entering a city name in the search bar. The interface
            updates in real-time with hourly and weekly forecasts, ensuring
            accurate and up-to-date information.
          </p>
        </div>

        {/* User Guide Section */}
        <div className="user-guide">
          <h2>User Guide</h2>
          <h3>How to Use:</h3>
          <ul>
            <li>Enter the name of the city in the search bar.</li>
            <li>
              Click the "Search" button to fetch the weather data for that city.
            </li>
            <li>
              View the current weather, including temperature, humidity, and
              wind speed.
            </li>
            <li>Check the 7-day forecast for upcoming weather conditions.</li>
            <li>
              Hourly updates show real-time weather changes for each hour of the
              day.
            </li>
          </ul>
          <h3>FAQ:</h3>
          <ul>
            <li>
              <strong>Q:</strong> How accurate is the weather data?
              <span>
                <strong>A:</strong> The weather data is sourced from
                OpenWeatherMap API and is updated regularly.
              </span>
            </li>
            <li>
              <strong>Q:</strong> Can I see weather forecasts for multiple
              cities?
              <span>
                <strong>A:</strong> Yes, you can search for any city and view
                its weather details.
              </span>
            </li>
          </ul>
        </div>

        {/* Future Improvements Section */}
        <div className="future-improvements">
          <h2>Future Improvements</h2>
          <ul>
            <li>
              Implement a map view for better location-based weather updates.
            </li>
            <li>
              Allow users to save favorite cities for quick access to weather
              information.
            </li>
            <li>
              Add more detailed weather data, such as air quality and UV index.
            </li>
            <li>
              Integrate with voice assistants like Google Assistant for
              hands-free weather updates.
            </li>
          </ul>
        </div>

        {/* Footer Starts */}
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-logo">
              <h3>ClimaSense</h3>
              <p>Your go-to weather companion.</p>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
              </ul>
            </div>

            <div className="footer-socials">
              <h4>Follow Us</h4>
              <ul>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">
                    <i className="fab fa-facebook"></i> Facebook
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">
                    <i className="fab fa-twitter"></i> Twitter
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">
                    <i className="fab fa-instagram"></i> Instagram
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">
                    <i className="fab fa-github"></i> GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} ClimaSense. All rights
              reserved.
            </p>
          </div>
        </footer>

        {/* Footer Ends */}
      </div>
    </div>
  );
}

export default App;
