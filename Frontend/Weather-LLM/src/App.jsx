import React, { useEffect, useState } from 'react';
import Circle from 'react-progressbar-circle';
import { FaCloud, FaSun, FaWind, FaRegFlag, FaThermometerHalf, FaWater } from 'react-icons/fa';

function App() {
  const [weatherAnalysis, setWeatherAnalysis] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundClass, setBackgroundClass] = useState('bg-blue-500');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:9000');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setWeatherData(data.weatherData);
      setWeatherAnalysis(data.weatherAnalysis);

      // Set background based on weather condition
      const condition = data.weatherData.weather_condition;
      if (condition === 'Rainy') setBackgroundClass('bg-gray-900');
      else if (condition === 'Sunny') setBackgroundClass('bg-yellow-500');
      else if (condition === 'Foggy') setBackgroundClass('bg-gray-400');
      else setBackgroundClass('bg-blue-500');
    };

    ws.onerror = (error) => console.error('WebSocket error:', error);

    return () => ws.close();
  }, []);

  return (
    <div className={`min-h-screen ${backgroundClass} p-8 transition-all`}>
      <div className="container mx-auto p-6 rounded-xl shadow-2xl bg-white space-y-8">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">Weather Dashboard</h1>

        {/* Weather Data Section */}
        {weatherData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Temperature */}
            <div className="bg-red-100 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Temperature</h2>
              <Circle
                percentage={(weatherData.temperature + 10) * 2} // Assuming range -10°C to 40°C
                size={100}
                strokeWidth={6}
                color="#FF5733"
              />
              <p className="text-2xl text-gray-700 mt-4">{weatherData.temperature}°C</p>
              <FaThermometerHalf className="text-4xl text-gray-600 mt-4 mx-auto" />
            </div>

            {/* Humidity */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Humidity</h2>
              <p className="text-3xl text-gray-700">{weatherData.humidity}%</p>
              <FaWater className="text-4xl text-gray-600 mt-4 mx-auto" />
            </div>

            {/* Weather Condition */}
            <div className="bg-teal-100 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Weather Condition</h2>
              <p className="text-3xl text-gray-700">{weatherData.weather_condition}</p>
              <FaCloud className="text-5xl text-gray-600 mt-4 mx-auto" />
            </div>

            {/* Wind Speed */}
            <div className="bg-indigo-100 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Wind Speed</h2>
              <p className="text-3xl text-gray-700">{weatherData.wind_speed} km/h</p>
              <FaWind className="text-4xl text-gray-600 mt-4 mx-auto" />
            </div>

            {/* Visibility */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Visibility</h2>
              <p className="text-3xl text-gray-700">{weatherData.visibility} km</p>
              <FaRegFlag className="text-4xl text-gray-600 mt-4 mx-auto" />
            </div>

            {/* UV Index */}
            <div className="bg-pink-100 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">UV Index</h2>
              <p className="text-3xl text-gray-700">{weatherData.UV_index}</p>
              <FaSun className="text-4xl text-gray-600 mt-4 mx-auto" />
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading weather data...</p>
        )}

        {/* Weather Analysis Section */}
        {weatherAnalysis && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Weather Analysis</h2>
            <div className="space-y-4 text-gray-700">
              {weatherAnalysis.split('\n').map((line, index) => (
                <p key={index} className="text-lg leading-relaxed">{line.trim()}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;