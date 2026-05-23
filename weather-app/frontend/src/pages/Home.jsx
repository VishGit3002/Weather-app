import { useEffect, useState } from "react";
import {
  Search,
  Wind,
  Droplets,
  MapPin,
  Thermometer,
} from "lucide-react";

import API from "../services/api";

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // Default city weather on startup
  useEffect(() => {
    fetchWeather("Kolkata");
  }, []);

  const fetchWeather = async (searchCity) => {
    try {
      setLoading(true);

      const { data } = await API.get(
        `/api/weather?city=${searchCity}`
      );

      setWeather(data);
    } catch (error) {
      console.log(error);
      alert("Unable to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!city.trim()) return;

    fetchWeather(city);
    setCity("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#172554] to-[#312e81] text-white flex items-center justify-center px-4">

      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-3">
            Weather App
          </h1>

          <p className="text-gray-300 text-lg">
            Real-time weather updates worldwide
          </p>
        </div>

        {/* Search Box */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl mb-8"
        >
          <div className="px-4">
            <Search className="text-gray-300" />
          </div>

          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-transparent outline-none py-5 text-lg placeholder:text-gray-300"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-5 font-semibold hover:opacity-90 transition"
          >
            Search
          </button>
        </form>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center mt-10">
            <div className="w-14 h-14 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}

        {/* Weather Card */}
        {weather && !loading && (
          <div className="bg-white/10 border border-white/20 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">

            <div className="grid md:grid-cols-2 gap-8 items-center">

              {/* Left */}
              <div>

                <div className="flex items-center gap-2 text-xl mb-3">
                  <MapPin size={22} />
                  <h2 className="font-semibold">
                    {weather.name}, {weather.sys.country}
                  </h2>
                </div>

                <p className="text-gray-300 mb-8">
                  {new Date().toDateString()}
                </p>

                <div className="flex items-center gap-6">

                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                    alt="weather"
                    className="w-32"
                  />

                  <div>
                    <h1 className="text-7xl font-bold">
                      {Math.round(weather.main.temp)}°
                    </h1>

                    <p className="text-2xl text-gray-200 mt-2">
                      {weather.weather[0].main}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="grid grid-cols-2 gap-5">

                <div className="bg-white/10 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3 text-gray-300">
                    <Thermometer />
                    Feels Like
                  </div>

                  <h3 className="text-3xl font-bold">
                    {Math.round(weather.main.feels_like)}°
                  </h3>
                </div>

                <div className="bg-white/10 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3 text-gray-300">
                    <Droplets />
                    Humidity
                  </div>

                  <h3 className="text-3xl font-bold">
                    {weather.main.humidity}%
                  </h3>
                </div>

                <div className="bg-white/10 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3 text-gray-300">
                    <Wind />
                    Wind
                  </div>

                  <h3 className="text-3xl font-bold">
                    {weather.wind.speed} km/h
                  </h3>
                </div>

                <div className="bg-white/10 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3 text-gray-300">
                    <Thermometer />
                    Pressure
                  </div>

                  <h3 className="text-3xl font-bold">
                    {weather.main.pressure}
                  </h3>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default Home;