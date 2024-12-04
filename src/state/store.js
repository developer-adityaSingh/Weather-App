import {create} from "zustand";
import {persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {devtools} from "zustand/middleware";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";


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


const store = (set) => ({
    forecast: [],
    weather: {
        city: "",
        temperature: 0,
        description: "",
        icon: "",
        windSpeed: 0,
        humidity: 0,
        sunrise: 0,
        sunset: 0

    },
    error: {
        status: 200,
        message: ""
    },
    setHydrated() {
        set({hydrated: true})
    },
    async fetchWeather(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);
            const data = await response.json();
            if (data.name === undefined) {
                set(state => {
                    state.error.status = 404;
                    state.error.message = data.message;
                })
            } else {
                set(state => {
                    // setting state of current weather
                    state.weather.city = data?.name || "";
                    state.weather.temperature = Math.floor(data?.main?.temp) || 0;
                    state.weather.description = data?.weather[0]?.description || "";
                    state.weather.icon = allIcon[data?.weather[0]?.icon] || clear_icon;
                    state.weather.windSpeed = data?.wind?.speed || 0;
                    state.weather.humidity = data?.main?.humidity || 0;
                    state.weather.sunrise = new Date(data?.sys?.sunrise * 1000).toLocaleTimeString() || 0;
                    state.weather.sunset = new Date(data?.sys?.sunset * 1000).toLocaleTimeString() || 0;

                    // setting error to null
                    state.error.status = 200;
                    state.error.message = "";
                })
            }
        } catch (error) {
            set(state => {
                state.error.status = 500;
                state.error.message = "Error Fetching Data From the Server"
            })
            console.error("Error fetching Weather", error);
        }
    },
    async fetchForecast(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
            const data = await response.json();
            set(state => {
                state.forecast = data.list.filter((entry) => entry.dt_txt.includes("12:00:00"))
            })
        } catch (e) {
            set(state => {
                if (state.error === 200) {
                    state.error.status = 500;
                    state.error.message = "Error fetching Forecast";
                }
            })
            console.error("Error fetching Forecast", e)
        }
    }
})

const useStore = create(devtools(persist(immer(store), {
    name: "reports",
    onRehydrateStorage() {
        return (state, error) => {
            if (error) {
                console.error("Failed to rehydrate storage", error)
            } else {
                state?.setHydrated()
            }
        }
    }
})));

export default useStore;