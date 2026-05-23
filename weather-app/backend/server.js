import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import weatherRoutes from "./routes/weatherRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.get("/", (req, res) => {
  res.send("Weather API Running");
});

app.use("/api/weather", weatherRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
