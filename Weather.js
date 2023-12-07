import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Weather.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { WiDaySunny, WiCloud, WiDayCloudy, WiDayShowers, WiDayRainMix, WiThunderstorm } from 'react-icons/wi';


function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <WiDaySunny />;
      case 'Clouds':
        return <WiCloud />;
      case 'Partly Cloudy':
        return <WiDayCloudy />;
      case 'Showers':
        return <WiDayShowers />;
      case 'Rain':
        return <WiDayRainMix />;
      case 'Thunderstorm':
        return <WiThunderstorm />;
      default:
        return null;
    }
  };

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e849ec378296aae22dc243a8b9d84def`)
      .then((result) => result.json())
      .then((data) => {
        const kelvin = data.main.temp;
        const celsius = kelvin - 273.15;
        setWeatherData({
          temperature: Math.round(celsius),
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
          weatherCondition: data.weather[0].main,
        });
      });
  };

  return (
    <div className="bg-image">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4">
          <h1 className="text-center mb-4">Weather App</h1>
          <form onSubmit={submitHandler} className="d-flex">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={city}
                onChange={changeHandler}
                placeholder="Enter city"
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-primary">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
          </form>

          {weatherData && (
            <div className="weather-card mt-4">
              <h2>Weather in {city}</h2>
              <p id='bold'>Temperature: {weatherData.temperature}°C {getWeatherIcon(weatherData.weatherCondition)} {weatherData.weatherCondition}</p>
              <p>{weatherData.date} {weatherData.day}</p>
              <p> {weatherData.time} {weatherData.timeZone} </p>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;



