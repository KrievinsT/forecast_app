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
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch(handleError);
  };

  const fetchDataFor = () => {
    return fetch(urlFor)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch(handleError);
  };

  const handleSubmit = (e) => {
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
        <div 
          onClick={() => 
            setIsFahrenheit(!isFahrenheit)} 
            style={{ cursor: 'pointer' }}
        > Display in {isFahrenheit ? 'Celsius' : 'Fahrenheit'} </div>
        {data.current && (
          <div>
            <h2>City: {data.location.name}</h2>
            <p>Temperature: {isFahrenheit ? data.current.temp_f : data.current.temp_c}°{isFahrenheit ? 'F' : 'C'}</p>
            <p>Condition: {data.current.condition.text}</p>
          </div>
        )}
        <p>Powered by WeatherAPI</p>
      </header>
    </div>
  );
}

export default App;
