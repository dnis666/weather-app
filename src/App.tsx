import React, { useState, useEffect } from 'react';

import './App.css'

interface WeatherResponse {
  location: {
    name: string,
    region: string,
    country: string,
    lat: number,
    lon: number,
    tz_id: string,
    localtime_epoch: number,
    localtime: string
  },
  current: {
    last_updated_epoch: number,
    last_updated: string,
    temp_c: number,
    temp_f: number,
    is_day: number,
    // other fields omitted for brevity
  }
  // other fields omitted for brevity
}

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
        fetch(`http://api.weatherapi.com/v1/current.json?key=3ae8e0b73e7b42949bd191935230407&q=${position.coords.latitude},${position.coords.longitude}`)
            .then(response => response.json())
            .then(data => {
                setWeatherData(data);
                console.log(data)
                setIsLoading(false);
            });
    });
}, []);


  if (isLoading) {
    return <div>Loading...</div>
  }

  if (weatherData === null) {
    return <div>Failed to load weather data</div>
  }

  // Format the date and time to the Brazilian standard
  const date = new Date(weatherData.location.localtime);
  const formattedDate = date.toLocaleString('pt-BR');

  return (
    <div className='card-weather'>
      <div className='weather-city'>Temperatura na cidade de: <br />{weatherData.location.name}, {weatherData.location.region} - {weatherData.location.country}</div>
      <p className='weather-degres'>{weatherData.current.temp_c}°C</p>
      <p>{formattedDate}</p>
    </div>
  );
};

export default App;
