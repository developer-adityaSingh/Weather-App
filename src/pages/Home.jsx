import {useState, useEffect, useRef} from "react";
import "../App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import useStore from "../state/store.js";

function Home() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const {weather, forecast} = useStore();

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


    const updateCurrentTime = () => {
        setCurrentTime(new Date());
    };
    const {fetchWeather, fetchForecast} = useStore();

    const fetchData = async (city) => {
        try {
            await fetchWeather(city);
            await fetchForecast(city);
        } catch (e) {
            console.log("Error fetching Data from API", e.message);
        }
    }


    useEffect(() => {
        fetchData("Bhopal").then(() => console.log("Data Fetched"));
        console.log("forecast", forecast)
        const timeInterval = setInterval(updateCurrentTime, 1000); // Update time every second
        return () => clearInterval(timeInterval); // Cleanup interval
    }, []);

    return (
        <div className="app">
            {/* Navbar */}

            {/* Current Weather */}
            <div className="current-weather">
                <h2>
                    {currentTime.toLocaleDateString()} -{" "}
                    {currentTime.toLocaleTimeString()}
                </h2>
                {weather && (
                    <div className="weather-info">
                        <div className="cityName">
                            <h1>{weather.city}</h1>
                        </div>
                        <div className="weather-details">
                            <h2>{weather.temperature}°C</h2>
                            <p>{weather.description}</p>
                            <p>Humidity: {weather.humidity}%</p>
                            <p>Wind Speed: {weather.windSpeed} m/s</p>
                            <p>Sunrise: {weather.sunrise}</p>
                            <p>Sunset: {weather.sunset}</p>
                        </div>
                        <img
                            className="imgTemp"
                            src={weather.icon}
                            alt="Weather Icon"
                        />
                    </div>
                )}
            </div>

            {/* Weekly Forecast */}
            <div className="weekly-forecast">
                <h2>7-Day Weather Forecast</h2>
                <div className="forecast-container">
                    {forecast?.map((day, index) => (
                        <div key={index} className="forecast-card">
                            <p>
                                {new Date(day.dt_txt).toLocaleDateString("en-IN", {
                                    weekday: "long",
                                })}
                            </p>
                            <img src={allIcon[day.weather[0].icon]} alt="Weather Icon"/>
                            <p>{(day.main.temp)}°C</p>
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
                            Click the &#34;Search&#34; button to fetch the weather data for that city.
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
                    <ul className={"faq"}>
                        <li>
                            <span>
                            <strong>Q</strong> How accurate is the weather data?
                            </span>
                            <span>
                <strong>A</strong> The weather data is sourced from
                OpenWeatherMap API and is updated regularly.
              </span>
                        </li>
                        <li>
                            <span>
                            <strong>Q</strong> Can I see weather forecasts for multiple
                            cities?
                            </span>
                            <span>
                <strong>A</strong> Yes, you can search for any city and view
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

            </div>
        </div>
    );
}

export default Home;
