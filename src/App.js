import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [dataFor, setDataFor] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [isMPH, setIsMPH] = useState(false);
  const [maxDate, setMaxDate] = useState("");

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
          .then(response => response.json())
          .then(data => {
            setLocation(data.city || data.locality || data.principalSubdivision);
          })
          .catch(error => {
            console.error('Error fetching city name:', error);
          });
      },
        error => {
          console.error('Error getting location', error);
        });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getUserLocation();
    setDate(new Date().toISOString().split('T')[0]);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 15);
    setMaxDate(maxDate.toISOString().split('T')[0]);
  }, []);


  useEffect(() => {
    if (location) {
      fetchData();
      fetchDataFor();
    }
  }, [location, date]);

  const fetchData = () => {
    if (!location) return;
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found or doesn’t exist');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setError(null);
      })
      .catch(handleError);
  };

  const fetchDataFor = () => {
    if (!location || !date) return;
    return fetch(urlFor)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found or doesn’t exist');
        }
        return response.json();
      })
      .then(dataFor => {
        console.log('Forecast data:', dataFor);
        setDataFor(dataFor);
        setError(null);
      })
      .catch(handleError);
  };

  useEffect(() => {
    if (location && date) {
      fetchData(); fetchDataFor();
    }
  }, [location, date]);

  const url = `https://api.weatherapi.com/v1/current.json?key=1f8a5c56a5744e389e741625240111&q=${location}`;
  const urlFor = `https://api.weatherapi.com/v1/forecast.json?key=1f8a5c56a5744e389e741625240111&q=${location}&dt=${date}`;

  const handleError = (error) => {
    setError(error);
    console.error('Error:', error);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <form>
          <input
            type="text"
            placeholder="Enter city name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input 
            type="date" 
            value={date} 
            max={maxDate} 
            onChange={(e) => setDate(e.target.value)} 
          />
        </form>
        {!error && data.current && (
          <div
            onClick={() => setIsFahrenheit(!isFahrenheit)}
            style={{ cursor: 'pointer' }}
          >
            Display in {isFahrenheit ? 'Celsius' : 'Fahrenheit'}
          </div>
        )}
        {!error && data.current && (
          <div
            onClick={() => setIsMPH(!isMPH)}
            style={{ cursor: 'pointer' }}
          >
            Display in {isMPH ? 'Kilometers' : 'Miles'}
          </div>
        )}
        {error && <p className="error-message">{error.message}</p>}
        {data.current && !error && (
          <div>
            <h2>City: {data.location.name}</h2>
            <p>Temperature: {isFahrenheit ? data.current.temp_f : data.current.temp_c}°{isFahrenheit ? 'F' : 'C'}</p>
            <p>Actual feel: {isFahrenheit ? data.current.feelslike_f : data.current.feelslike_c}°{isFahrenheit ? 'F' : 'C'}</p>
            <p>Wind speed: {isMPH ? data.current.wind_mph + ' miles' : data.current.wind_kph + ' kilometers'} per hour</p>
            <p>Wind direction: {data.current.wind_dir}</p>
            <p>Humidity: {data.current.humidity}%</p>
            <p>Condition: {data.current.condition.text}</p>
            <img src={data.current.condition.icon} alt="Weather Icon"></img>
            <p>UV index: {data.current.uv}</p>
          </div>
        )}
        {dataFor && !error && (
          <div>
            <h2>Forecast for {dataFor.forecast.forecastday[0].date}</h2>
            <p>Avg Temperature: {isFahrenheit ? dataFor.forecast.forecastday[0].day.avgtemp_f : dataFor.forecast.forecastday[0].day.avgtemp_c}°{isFahrenheit ? 'F' : 'C'}</p>
            <p>Max Temperature: {isFahrenheit ? dataFor.forecast.forecastday[0].day.maxtemp_f : dataFor.forecast.forecastday[0].day.maxtemp_c}°{isFahrenheit ? 'F' : 'C'}</p>
            <p>Min Temperature: {isFahrenheit ? dataFor.forecast.forecastday[0].day.mintemp_f : dataFor.forecast.forecastday[0].day.mintemp_c}°{isFahrenheit ? 'F' : 'C'}</p>
            <p>Condition: {dataFor.forecast.forecastday[0].day.condition.text}</p>
            <img src={dataFor.forecast.forecastday[0].day.condition.icon} alt="Weather Icon"></img>
            <p>Chance to rain: {dataFor.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
            <p>Chance to snow: {dataFor.forecast.forecastday[0].day.daily_chance_of_snow}%</p>
          </div>
        )}
        {dataFor && !error && (
          <div>
            <p>Sunrise: {dataFor.forecast.forecastday[0].astro.sunrise}</p>
            <p>Sunset: {dataFor.forecast.forecastday[0].astro.sunset}</p>
            <p>Moonrise: {dataFor.forecast.forecastday[0].astro.moonrise}</p>
            <p>Moonset: {dataFor.forecast.forecastday[0].astro.moonset}</p>
            <p>Moon phase: {dataFor.forecast.forecastday[0].astro.moon_phase}</p>
          </div>
        )}
        {dataFor && !error && (
          <div>
            <p>Date: {dataFor.forecast.forecastday[0].date}</p>
            <div style={{ overflowY: 'scroll', overflowX: 'hidden', height: '400px' }}>
              {dataFor.forecast.forecastday[0].hour.map((hourData, index) => (
                <div key={index}>
                  <p>Time: {hourData.time}</p>
                  <p>Temperature: {isFahrenheit ? hourData.temp_f : hourData.temp_c}°{isFahrenheit ? 'F' : 'C'}</p>
                  <p>Condition: {hourData.condition.text}</p>
                  <img src={hourData.condition.icon} alt="Weather Icon"></img>
                  <p>___________________</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <p>Powered by WeatherAPI</p>
      </header>
    </div>
  );
}

export default App;
