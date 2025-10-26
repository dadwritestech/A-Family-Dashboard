import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postcode, setPostcode] = useState(localStorage.getItem('postcode') || '82256');
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    localStorage.setItem('postcode', postcode);
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?zip=${postcode},de&units=metric&appid=${apiKey}`
        );
        if (!response.ok) {
          throw new Error('Weather data not found');
        }
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [apiKey, postcode]);

  const getWeatherEmoji = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) return '⛈️'; // Thunderstorm
    if (weatherId >= 300 && weatherId < 500) return '🌧️'; // Drizzle
    if (weatherId >= 500 && weatherId < 600) return '🌧️'; // Rain
    if (weatherId >= 600 && weatherId < 700) return '❄️'; // Snow
    if (weatherId >= 700 && weatherId < 800) return '🌫️'; // Atmosphere
    if (weatherId === 800) return '☀️'; // Clear
    if (weatherId > 800) return '☁️'; // Clouds
    return '🤷';
  };

  if (loading) {
    return <div className="text-center p-4">Loading weather...</div>;
  }

  return (
    <div className="max-w-xs mx-auto mt-5 p-4 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Current Weather</h2>
          {weather && <p className="text-gray-600">{weather.name}</p>}
        </div>
        <div className="text-5xl">
          {weather && getWeatherEmoji(weather.weather[0].id)}
        </div>
      </div>
      {weather && (
        <div className="mt-4">
          <p className="text-3xl font-bold text-gray-800">{Math.round(weather.main.temp)}°C</p>
          <p className="text-gray-600 capitalize">{weather.weather[0].description}</p>
        </div>
      )}
      <div className="mt-4">
        <input
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter postcode"
        />
      </div>
    </div>
  );
};

export default Weather;
