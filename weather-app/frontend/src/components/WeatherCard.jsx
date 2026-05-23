const WeatherCard = ({ data }) => {
  return (
    <div className="weather-card">
      <h2>{data.name}</h2>

      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="weather"
      />

      <h1>{Math.round(data.main.temp)}°C</h1>

      <p>{data.weather[0].main}</p>

      <div className="details">
        <span>Humidity: {data.main.humidity}%</span>
        <span>Wind: {data.wind.speed} km/h</span>
      </div>
    </div>
  );
};

export default WeatherCard;
