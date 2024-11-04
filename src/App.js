import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("Britain")

  const url = "http://api.weatherapi.com/v1/current.json?key=1f8a5c56a5744e389e741625240111&q=" + location;

  const fetchData = () => {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        {data.current && (
          <div>
            <h2>Location: {data.location.name}</h2>
            <p>Temperature: {data.current.temp_c}°C</p>
            <p>Condition: {data.current.condition.text}</p>
          </div>
        )}
        <p>Powered by WeatherAPI</p>
      </header>
    </div>
  );
}

export default App;
