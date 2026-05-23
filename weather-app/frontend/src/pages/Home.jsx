// import { useEffect, useState } from "react";
// import {
//   Search,
//   Wind,
//   Droplets,
//   MapPin,
//   Thermometer,
// } from "lucide-react";

// import API from "../services/api";

// const Home = () => {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Default city weather on startup
//   useEffect(() => {
//     fetchWeather("Kolkata");
//   }, []);

//   const fetchWeather = async (searchCity) => {
//     try {
//       setLoading(true);

//       const { data } = await API.get(
//         `/api/weather?city=${searchCity}`
//       );

//       setWeather(data);
//     } catch (error) {
//       console.log(error);
//       alert("Unable to fetch weather");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();

//     if (!city.trim()) return;

//     fetchWeather(city);
//     setCity("");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#172554] to-[#312e81] text-white flex items-center justify-center px-4">

//       <div className="w-full max-w-5xl">

//         {/* Header */}
//         <div className="text-center mb-10">
//           <h1 className="text-5xl font-bold mb-3">
//             Weather App
//           </h1>

//           <p className="text-gray-300 text-lg">
//             Real-time weather updates worldwide
//           </p>
//         </div>

//         {/* Search Box */}
//         <form
//           onSubmit={handleSearch}
//           className="flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl mb-8"
//         >
//           <div className="px-4">
//             <Search className="text-gray-300" />
//           </div>

//           <input
//             type="text"
//             placeholder="Search city..."
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             className="w-full bg-transparent outline-none py-5 text-lg placeholder:text-gray-300"
//           />

//           <button
//             type="submit"
//             className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-5 font-semibold hover:opacity-90 transition"
//           >
//             Search
//           </button>
//         </form>

//         {/* Loading */}
//         {loading && (
//           <div className="flex justify-center mt-10">
//             <div className="w-14 h-14 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
//           </div>
//         )}

//         {/* Weather Card */}
//         {weather && !loading && (
//           <div className="bg-white/10 border border-white/20 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">

//             <div className="grid md:grid-cols-2 gap-8 items-center">

//               {/* Left */}
//               <div>

//                 <div className="flex items-center gap-2 text-xl mb-3">
//                   <MapPin size={22} />
//                   <h2 className="font-semibold">
//                     {weather.name}, {weather.sys.country}
//                   </h2>
//                 </div>

//                 <p className="text-gray-300 mb-8">
//                   {new Date().toDateString()}
//                 </p>

//                 <div className="flex items-center gap-6">

//                   <img
//                     src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
//                     alt="weather"
//                     className="w-32"
//                   />

//                   <div>
//                     <h1 className="text-7xl font-bold">
//                       {Math.round(weather.main.temp)}°
//                     </h1>

//                     <p className="text-2xl text-gray-200 mt-2">
//                       {weather.weather[0].main}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Right */}
//               <div className="grid grid-cols-2 gap-5">

//                 <div className="bg-white/10 rounded-2xl p-5">
//                   <div className="flex items-center gap-2 mb-3 text-gray-300">
//                     <Thermometer />
//                     Feels Like
//                   </div>

//                   <h3 className="text-3xl font-bold">
//                     {Math.round(weather.main.feels_like)}°
//                   </h3>
//                 </div>

//                 <div className="bg-white/10 rounded-2xl p-5">
//                   <div className="flex items-center gap-2 mb-3 text-gray-300">
//                     <Droplets />
//                     Humidity
//                   </div>

//                   <h3 className="text-3xl font-bold">
//                     {weather.main.humidity}%
//                   </h3>
//                 </div>

//                 <div className="bg-white/10 rounded-2xl p-5">
//                   <div className="flex items-center gap-2 mb-3 text-gray-300">
//                     <Wind />
//                     Wind
//                   </div>

//                   <h3 className="text-3xl font-bold">
//                     {weather.wind.speed} km/h
//                   </h3>
//                 </div>

//                 <div className="bg-white/10 rounded-2xl p-5">
//                   <div className="flex items-center gap-2 mb-3 text-gray-300">
//                     <Thermometer />
//                     Pressure
//                   </div>

//                   <h3 className="text-3xl font-bold">
//                     {weather.main.pressure}
//                   </h3>
//                 </div>

//               </div>

//             </div>

//           </div>
//         )}

//       </div>

//     </div>
//   );
// };

// export default Home;
import { useEffect, useState } from "react";
import { MapPin, Thermometer, Droplets, Wind, Gauge } from "lucide-react";
import API from "../services/api";

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWeather("Dhanbad");
  }, []);

  const fetchWeather = async (searchCity) => {
    try {
      setLoading(true);
      const { data } = await API.get(`/api/weather?city=${searchCity}`);
      setWeather(data);
    } catch (error) {
      console.log(error);
      alert("City not found. Please try again.");
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

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const stats = weather
    ? [
        {
          icon: <Thermometer size={20} />,
          value: `${Math.round(weather.main.feels_like)}°`,
          label: "Feels Like",
        },
        {
          icon: <Droplets size={20} />,
          value: `${weather.main.humidity}%`,
          label: "Humidity",
        },
        {
          icon: <Wind size={20} />,
          value: `${weather.wind.speed}`,
          label: "Wind km/h",
        },
        {
          icon: <Gauge size={20} />,
          value: `${weather.main.pressure}`,
          label: "Pressure hPa",
        },
      ]
    : [];

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-10 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a0533 0%, #0d1b4b 35%, #0a3d62 65%, #1a0533 100%)" }}
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute top-[-100px] left-[-80px] w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.45) 0%, transparent 70%)" }}
      />
      <div className="pointer-events-none absolute bottom-[-80px] right-[-60px] w-[350px] h-[350px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)" }}
      />
      <div className="pointer-events-none absolute top-[45%] left-[55%] w-[250px] h-[250px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-lg">

        {/* Search Bar */}
        <form onSubmit={handleSearch}
          className="flex overflow-hidden rounded-2xl mb-7"
          style={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <div className="flex items-center pl-5 text-white/40">
            <MapPin size={18} />
          </div>
          <input
            type="text"
            placeholder="Search for a city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 bg-transparent outline-none px-4 py-4 text-white placeholder-white/40 text-[15px] font-light"
          />
          <button
            type="submit"
            className="px-7 py-4 text-white text-sm font-semibold tracking-wide transition-opacity hover:opacity-85"
            style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
          >
            Search
          </button>
        </form>

        {/* Loading spinner */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div
              className="w-12 h-12 rounded-full animate-spin"
              style={{ border: "2px solid rgba(255,255,255,0.15)", borderTopColor: "#a78bfa" }}
            />
          </div>
        )}

        {/* Weather Card */}
        {weather && !loading && (
          <div
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            {/* Top shimmer line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
            />

            {/* Location + Date row */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest">
                <MapPin size={13} />
                <span>{weather.name}, {weather.sys.country}</span>
              </div>
              <div
                className="text-white/50 text-xs font-light px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                {today}
              </div>
            </div>

            {/* Hero: city + temp + icon */}
            <div className="flex items-center justify-between mb-7">
              <div>
                <h2 className="text-3xl font-semibold text-white mb-1 tracking-tight">
                  {weather.name}
                </h2>
                <p className="text-white/50 text-sm mb-3">
                  {weather.weather[0].description.charAt(0).toUpperCase() +
                    weather.weather[0].description.slice(1)}
                </p>
                <div className="flex items-start leading-none">
                  <span className="text-[86px] font-bold text-white tracking-[-3px] leading-none">
                    {Math.round(weather.main.temp)}
                  </span>
                  <span className="text-3xl text-white/60 font-light mt-3 ml-1">°C</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-lg"
                    style={{ background: "rgba(251,146,60,0.2)", color: "#fbbf24" }}>
                    H: {Math.round(weather.main.temp_max)}°
                  </span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-lg"
                    style={{ background: "rgba(96,165,250,0.2)", color: "#93c5fd" }}>
                    L: {Math.round(weather.main.temp_min)}°
                  </span>
                </div>
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt={weather.weather[0].description}
                className="w-32 h-32"
                style={{ filter: "drop-shadow(0 0 30px rgba(139,92,246,0.6))" }}
              />
            </div>

            {/* Divider */}
            <div
              className="mb-6"
              style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
              }}
            />

            {/* Stats grid */}
            <div className="grid grid-cols-4 gap-3">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center rounded-2xl py-4 px-2 transition-all"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="text-white/50 mb-2">{s.icon}</div>
                  <div className="text-white text-xl font-bold leading-none mb-1.5">{s.value}</div>
                  <div className="text-white/40 text-[10px] uppercase tracking-widest font-normal">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;