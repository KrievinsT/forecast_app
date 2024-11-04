import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [dataFor, setDataFor] = useState([]);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("");
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [isMPH, setIsMPH] = useState(false);

  const url = `https://api.weatherapi.com/v1/current.json?key=1f8a5c56a5744e389e741625240111&q=${location}`;
  const urlFor = `https://api.weatherapi.com/v1/forecast.json?key=1f8a5c56a5744e389e741625240111&q=${location}`;

  const fetchData = () => {
    if (!location) return;
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('City not found or doesn’t exist');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch(handleError);
  };

  const fetchDataFor = () => {
    if (!location) return;
    return fetch(urlFor)
      .then((response) => {
        if (!response.ok) {
          throw new Error('City not found or doesn’t exist');
        }
        return response.json();
      })
      .then((dataFor) => {
        setDataFor(dataFor);
        setError(null);
      })
      .catch(handleError);
  };

  const handleSubmit = (e) => {  
    e.preventDefault();
    if (!location) {
      setError(new Error('Please enter a city name'));
      return;
    }
    fetchData();
    fetchDataFor();
  };

  const handleError = (error) => {
    setError(error);
    console.error('Error:', error); 
  };

  // useEffect(() => { {/* uncomment if need to display cities without submiting */}
  //   if (location) {
  //     fetchData();
  //   }
  // }, [location]);

  // useEffect(() => {
  //   if (location) {
  //     fetchDataFor();
  //   }
  // }, [location]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {!error && data.current && (
          <div 
            onClick={() => setIsFahrenheit(!isFahrenheit)} 
            style={{ cursor: 'pointer' }}
          >
            Display in {isFahrenheit ? 'Celsius' : 'Fahrenheit'}  {/* Unit conversion trigger for degree */}
          </div>
        )}
        {!error && data.current && (
          <div 
            onClick={() => setIsMPH(!isMPH)} 
            style={{ cursor: 'pointer' }}
          >
            Display in {isMPH ? 'Kilometers' : 'Miles'}  {/* Unit conversion trigger for speed */}
          </div>
        )}
        {error && <p className="error-message">{error.message}</p>} {/* Display error message to user */}
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
        <p>Powered by WeatherAPI</p>
      </header>
    </div>
  );
}

export default App;
