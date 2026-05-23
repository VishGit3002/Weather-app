import { useState } from "react";
import API from "../services/api";
import SearchBox from "../components/SearchBox";
import WeatherCard from "../components/WeatherCard";
import Loader from "../components/Loader";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      const { data } = await API.get(`/api/weather?city=${city}`);
      setWeather(data);
    } catch (error) {
      alert("City not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Weather App</h1>

      <SearchBox onSearch={fetchWeather} />

      {loading && <Loader />}

      {weather && <WeatherCard data={weather} />}
    </div>
  );
};

export default Home;
