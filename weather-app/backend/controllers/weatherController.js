import axios from "axios";
import SearchHistory from "../models/SearchHistory.js";

export const getWeather = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({
        message: "City is required"
      });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

    const response = await axios.get(url);

    await SearchHistory.create({ city });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch weather"
    });
  }
};
