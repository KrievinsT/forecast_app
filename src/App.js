import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("");
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  const url = `https://api.weatherapi.com/v1/current.json?key=1f8a5c56a5744e389e741625240111&q=${location}`;
  const urlFor = `https://api.weatherapi.com/v1/forecast.json?key=1f8a5c56a5744e389e741625240111&q=${location}`;

  const fetchData = () => {
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
    return fetch(urlFor)
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

  const handleSubmit = (e) => {  {/* Trigger search without page reload */}
    e.preventDefault();
    fetchData();
  };

  const handleError = (error) => {
    setError(error);
    console.error('Error:', error); 
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchDataFor();
  }, []);

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
        {!error && (
          <div 
            onClick={() => setIsFahrenheit(!isFahrenheit)} 
            style={{ cursor: 'pointer' }}
          >
            Display in {isFahrenheit ? 'Celsius' : 'Fahrenheit'}  {/* Unit conversion trigger */}
          </div>
        )}
        {error && <p className="error-message">{error.message}</p>} {/* Display error message to user */}
        {data.current && !error && (
          <div>
            <h2>City: {data.location.name}</h2>
            <p>Temperature: {isFahrenheit ? data.current.temp_f : data.current.temp_c}°{isFahrenheit ? 'F' : 'C'}</p>  {/* Unit conversion */}
            <p>Condition: {data.current.condition.text}</p>
            <img src={data.current.condition.icon}></img>
          </div>
        )}
        <p>Powered by WeatherAPI</p>
      </header>
    </div>
  );
}

export default App;
