import { useState } from "react";
import { API_KEY } from "./api";
import "./App.css";
import { clearAllInputs } from "./aux";

function App() {
    const [currentCity, setCurrentCity] = useState("");
    const [weatherData, setWeatherData] = useState({});
    const [units, setUnits] = useState("metric");
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");

    const getWeatherData = async () => {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
            { mode: "cors" }
        );
        const data = await response.json();

        setWeatherData(data);
    };

    const getGeoData = async (cityName) => {
        const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`,
            { mode: "cors" }
        );
        const locationData = await response.json();
        setLat(locationData[0].lat);
        setLon(locationData[0].lon);
    };

    const getData = async (cityName) => {
        await getGeoData(cityName);
        await getWeatherData();
    };

    const handleSearchCity = async (e) => {
        e.preventDefault();
        getData(currentCity)
        clearAllInputs();
    };

    return (
        <div className="App">
            <section className="current-weather">
                <div>
                    <h2>Clear Sky</h2>
                    <p>London</p>
                    <p>Thursday, 24th Mar '22</p>
                    <p>12:14pm</p>

                    <h2>18°C</h2>
                    <button className="swap-units">Display °F</button>
                    <p>Current Weather Icon</p>
                    <form onSubmit={handleSearchCity}>
                        <input
                            type="search"
                            placeholder="Search Location"
                            onChange={(e) => setCurrentCity(e.target.value)}
                        />
                        <button type="submit">SEARCH</button>
                    </form>
                </div>
                <div>
                    <div>Feels Like</div>
                    <div>Humidity </div>
                    <div>Chance of Rain </div>
                    <div>Wind Speed</div>
                </div>
            </section>
            <section className="daily-weather">
                <div className="mini-weather"></div>
                <div className="mini-weather"></div>
                <div className="mini-weather"></div>
                <div className="mini-weather"></div>
                <div className="mini-weather"></div>
                <div className="mini-weather"></div>
                <div className="mini-weather"></div>
            </section>
        </div>
    );
}

export default App;
