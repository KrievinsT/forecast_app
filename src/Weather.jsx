import './index.css';

import React, { useRef, useState, useEffect } from 'react';

function Weather() {

  const [selectedButton, setSelectedButton] = useState("Today");
  const [isDragging, setIsDragging] = useState(false);
  const [isDragging2, setIsDragging2] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startX2, setStartX2] = useState(0);
  const [startY2, setStartY2] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft2, setScrollLeft2] = useState(0);
  const [scrollTop2, setScrollTop2] = useState(0);
  const scrollRef = useRef(null);
  const scrollRef2 = useRef(null);

  const [data, setData] = useState([]);
  const [dataFor, setDataFor] = useState(null);

  const [error, setError] = useState(null);
  const [location, setLocation] = useState("");
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [isMPH, setIsMPH] = useState(false);
  const [today, setToday] = useState(new Date());
  const [tomorrow, setTomorrow] = useState(new Date());
  const [tenDaysLater, setTenDaysLater] = useState(new Date());
  const [monthly, setMonthly] = useState(new Date());

  const [isLoading, setIsLoading] = useState(true);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
              setLocation(data.city || data.locality || data.principalSubdivision);
              setIsLoading(false);
            })
            .catch(error => {
              console.error('Error fetching city name:', error);
              setError("Location not found.");
              setIsLoading(false);
            });
        },
        error => {
          console.error('Error getting location', error);
          setError("Unable to retrieve your location.");
          setIsLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setError("Geolocation is not supported.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const loadingIndicator = isLoading && (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );

  useEffect(() => {
    setToday(new Date());
    setTomorrow(new Date(new Date().setDate(new Date().getDate() + 1)));
    setTenDaysLater(new Date(new Date().setDate(new Date().getDate() + 10)));
    setMonthly(new Date(new Date().setDate(new Date().getDate() + 14)));
  }, []);

  const url = `https://api.weatherapi.com/v1/current.json?key=1f8a5c56a5744e389e741625240111&q=${location}&aqi=yes`;

  const handleError = (error) => {
    setError(error);

  };
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
    if (!location) return;

    let selectedDate = "";
    if (selectedButton === "Today") {
      selectedDate = today.toISOString().split('T')[0];
    } else if (selectedButton === "Tomorrow") {
      selectedDate = tomorrow.toISOString().split('T')[0];
    } else if (selectedButton === "10 Days") {
      selectedDate = tenDaysLater.toISOString().split('T')[0];
    } else if (selectedButton === "monthly") {
      selectedDate = monthly.toISOString().split('T')[0];
    }

    const urlFor = `https://api.weatherapi.com/v1/forecast.json?key=1f8a5c56a5744e389e741625240111&q=${location}&dt=${selectedDate}&aqi=yes`;

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
    if (location && selectedButton) {
      fetchData();
      fetchDataFor();
    }
  }, [location, selectedButton]);

  const handleMouseDown = (e, setDragging, ref, setStartX, setStartY, setScrollLeft, setScrollTop) => {
    setDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setStartY(e.pageY - ref.current.offsetTop);
    setScrollLeft(ref.current.scrollLeft);
    setScrollTop(ref.current.scrollTop);
    e.preventDefault();
  };

  const handleMouseMove = (e, isDragging, ref, startX, startY, scrollLeft, scrollTop) => {
    if (!isDragging) return;

    const x = e.pageX - ref.current.offsetLeft;
    const y = e.pageY - ref.current.offsetTop;

    const walkX = x - startX;
    const walkY = y - startY;

    ref.current.scrollLeft = scrollLeft - walkX;
    ref.current.scrollTop = scrollTop - walkY;
  };

  const handleMouseUp = (setDragging) => {
    setDragging(false);
  };

  const handleMouseDown1 = (e) => {
    handleMouseDown(e, setIsDragging, scrollRef, setStartX, setStartY, setScrollLeft, setScrollTop);
  };

  const handleMouseMove1 = (e) => {
    handleMouseMove(e, isDragging, scrollRef, startX, startY, scrollLeft, scrollTop);
  };

  const handleMouseUp1 = () => {
    handleMouseUp(setIsDragging);
  };

  const handleMouseDown2 = (e) => {
    handleMouseDown(e, setIsDragging2, scrollRef2, setStartX2, setStartY2, setScrollLeft2, setScrollTop2);
  };

  const handleMouseMove2 = (e) => {
    handleMouseMove(e, isDragging2, scrollRef2, startX2, startY2, scrollLeft2, scrollTop2);
  };

  const handleMouseUp2 = () => {
    handleMouseUp(setIsDragging2);
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsDragging(false);
      setIsDragging2(false);
    };
    window.addEventListener('mouseup', handleMouseUpGlobal);
    return () => {
      window.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, []);

  useEffect(() => {
    const updateScrollbarVisibility = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;

      }
    };

    updateScrollbarVisibility();
    window.addEventListener('resize', updateScrollbarVisibility);

    return () => {
      window.removeEventListener('resize', updateScrollbarVisibility);
    };
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.body.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem('theme', 'dark');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      localStorage.setItem('theme', 'light');
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);


  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const period = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}${period}`;
  };


  const [sunProgress, setSunProgress] = useState(0);
  const [moonProgress, setMoonProgress] = useState(0);


  const convertToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };


  useEffect(() => {
    const currentTime = new Date();
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    const sunriseMinutes = convertToMinutes('06:00');
    const sunsetMinutes = convertToMinutes('18:00');
    const moonriseMinutes = convertToMinutes('20:00');
    const moonsetMinutes = convertToMinutes('06:00');

    // Sun progress calculation
    const sunElapsed = currentMinutes - sunriseMinutes;
    const sunDuration = sunsetMinutes - sunriseMinutes;
    setSunProgress(Math.min(Math.max((sunElapsed / sunDuration) * 100, 0), 100));

    // Moon progress calculation
    const moonElapsed = currentMinutes - moonriseMinutes;
    const moonDuration = moonsetMinutes - moonriseMinutes;
    setMoonProgress(Math.min(Math.max((moonElapsed / moonDuration) * 100, 0), 100));
  }, []);

  return (
    <div className={`min-h-screen p-6 relative ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      {/* Header */}

      {loadingIndicator}

      <header className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 fixed top-6 left-6 right-6 z-50">
        <div className="flex items-center">
          <button className="p-2 mr-3">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-semibold text-blue-500 mr-3 cursor-pointer">SkyCast</h1>

          <img src="./images/google-maps.gif" alt="Description of the image" className="w-6 h-6 ml-4 md:ml-6 lg:ml-8 xl:ml-14 hidden 890px:block" />
          {data.current && !error && (
            <span className="text-gray-800 ml-1 hidden 890px:block">{data.location.name}, {data.location.country}</span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center">
            {/* Search bar */}
            <form>
              <input
                type="text"
                placeholder="Search Location"
                className="pl-10 pr-10 py-2 border-2 border-gray-300 rounded-lg text-sm w-full max-w-full min-w-[153px]"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 2a9 9 0 1 0 6.293 15.293l4.707 4.707a1 1 0 0 0 1.414-1.414l-4.707-4.707A9 9 0 0 0 11 2zM11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14z"
                />
              </svg>

              <img src="./images/worldwide.gif" alt="Description of the image" className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-6 h-6  z-10" />
            </form>
            <div className="absolute right-0.5 bg-gray-100 w-10 h-[90%] rounded-r-lg"></div>
          </div>
          {/* Light/Dark button */}
          <button
            onClick={toggleTheme}
            className="relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300
                 bg-gray-300 text-gray-1000 hover:bg-gray-400
                 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700  hidden 640px:flex "
          >
            {isDarkMode ? (
              // Dark mode icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            ) : (
              // Light mode icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            )}
            <span>{isDarkMode ? 'Dark' : 'Light'}</span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full">
            {/* Icon for notifications */}

            <img src="./images/notification.gif" alt="Description of the image" className="size-7 text-gray-700 hidden 440px:block" />
          </button>

          <img src="./images/profile-pic.jpg" alt="Description of the image" className=" rounded-full size-9 block 890px:hidden hidden 530px:block " />

          <button className="p-2 rounded-full hidden 890px:block">
            {/* Icon for settings */}

            <img src="./images/settings.gif" alt="Description of the image" className="size-7 text-gray-700" />

          </button>
        </div>
      </header>

      <main className="mt-24">
        <div className="flex max-w-[100%] mx-auto">
          <div className="w-[60%] ${isDarkMode ? 'bg-gray-800 ' : 'bg-gray-100 '}`} pe-8 responsive-width">
            {/* Current Weather */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex justify-between">
                <div>
                  <div className="text-sm text-gray-800">Current Weather</div>
                  {/* Current time*/}

                  {data.current && !error && (
                    <div className="text-lg font-medium text-black-700">{formatTime(data.location.localtime)}</div>
                  )}
                  <div className="flex items-center">
                    {/* Current tempeture*/}

                    {data.current && !error && (
                      <img className="w-12 h-12" src={data.current.condition.icon} alt="Weather Icon"></img>
                    )}
                    {data.current && !error && (
                      <div className="text-5xl font-semibold text-black  pl-3">{isFahrenheit ? data.current.temp_f : data.current.temp_c}</div>
                    )}
                    {data.current && !error && (
                      <p className="text-2xl font-semibold text-gray-600 pr-2 mb-2">°{isFahrenheit ? 'F' : 'C'}</p>
                    )}
                    <div className="flex flex-col text-sm text-gray-500 pl-6">
                      {/* Current condition*/}
                      {data.current && !error && (
                        <div className="text-gray-800">{data.current.condition.text}</div>
                      )}
                      {data.current && !error && (
                        <div className="text-gray-900">Feels Like {isFahrenheit ? data.current.feelslike_f : data.current.feelslike_c}°{isFahrenheit ? 'F' : 'C'}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-gray-600">
                  {!error && data.current && (
                    <div className="text-gray-900">
                      <select
                        onChange={(e) => {
                          const value = e.target.value;
                          setIsFahrenheit(value === 'Fahrenheit');
                          setIsMPH(value === 'Fahrenheit');
                        }}
                        value={isFahrenheit ? 'Fahrenheit' : 'Celsius'}
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="Celsius">Celsius and Kilometers</option>
                        <option value="Fahrenheit">Fahrenheit and Miles</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
              {data.current && !error && (
                <p className="mt-4 text-gray-800">
                  Current wind direction: {data.current.wind_dir}
                </p>
              )}
            </section>

            {/* Statistical Details */}
            <section className="grid grid-cols-2 gap-6 lg:grid-cols-3 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
                <div className="flex items-center space-x-2">
                  <img src="./images/clouds.gif" alt="Description of the image" className="size-6" />
                  <span className="text-gray-800">Air Quality </span>
                </div>
                {data.current && !error && (
                  <span className="text-2xl font-semibold ml-8">{(data.current.air_quality["gb-defra-index"])}</span>
                )}
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
                <div className="flex items-center space-x-2">
                  <img src="./images/wind.gif" alt="Description of the image" className="size-6" />
                  <span className="text-gray-800">Wind</span>
                </div>
                {data.current && !error && (
                  <span className="text-2xl font-semibold ml-8">{isMPH ? data.current.wind_mph + ' mph' : data.current.wind_kph + ' km/h'}</span>
                )}
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
                <div className="flex items-center space-x-2">
                  <img src="./images/humidity.gif" alt="Description of the image" className="size-6" />
                  <span className="text-gray-800">Humidity</span>
                </div>
                {data.current && !error && (
                  <span className="text-2xl font-semibold ml-8">{data.current.humidity}%</span>
                )}
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
                <div className="flex items-center space-x-2">
                  <img src="./images/vision.gif" alt="Description of the image" className="size-6" />
                  <span className="text-gray-800">Visibility</span>
                </div>

                {data.current && !error && (
                  <span className="text-2xl font-semibold ml-8"> {isMPH ? data.current.vis_miles + ' mi' : data.current.vis_km + ' km'}</span>
                )}
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
                <div className="flex items-center space-x-2">
                  <img src="./images/air-pump.gif" alt="Description of the image" className="size-6" />
                  <span className="text-gray-800">Pressure</span>
                </div>
                {data.current && !error && (
                  <span className="text-2xl font-semibold ml-8"> {data.current.pressure_in + ' in'}</span>
                )}
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
                <div className="flex items-center space-x-2">
                  <img src="./images/air-pump.gif" alt="Description of the image" className="size-6" />
                  <span className="text-gray-800">Pressure</span>
                </div>
                {data.current && !error && (
                  <span className="text-2xl font-semibold ml-8">{data.current.pressure_mb}°</span>
                )}
              </div>
            </section>

            {/* Mobile version   weather day selection  */}
            <div className="flex justify-start items-center mb-4 block 982px:hidden ">
              <section className="w-full rounded-lg pb-6">
                {/* Button section */}
                <div className={`flex justify-between items-center mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  <div className="flex space-x-6">
                    <button
                      onClick={() => setSelectedButton("Today")}
                      className={`${selectedButton === "Today"
                        ? `${isDarkMode ? 'text-white border-white' : 'text-black border-black'} border-b-2 font-semibold`
                        : `${isDarkMode ? 'text-gray' : 'text-gray-800'}`
                        }`}
                    >
                      Today
                    </button>
                    <button
                      onClick={() => setSelectedButton("Tomorrow")}
                      className={`${selectedButton === "Tomorrow"
                        ? `${isDarkMode ? 'text-white border-white' : 'text-black border-black'} border-b-2 font-semibold`
                        : `${isDarkMode ? 'text-gray' : 'text-gray-800'}`
                        }`}
                    >
                      Tomorrow
                    </button>
                    <button
                      onClick={() => setSelectedButton("10 Days")}
                      className={`${selectedButton === "10 Days"
                        ? `${isDarkMode ? 'text-white border-white' : 'text-black border-black'} border-b-2 font-semibold`
                        : `${isDarkMode ? 'text-gray' : 'text-gray-800'}`
                        }`}
                    >
                      10 Days
                    </button>
                  </div>
                  <button
                  onClick={() => setSelectedButton("monthly")}
                    className={`px-4 py-2 rounded-lg transition-colors duration-300 ${isDarkMode
                      ? 'bg-white text-black hover:bg-grey-500'
                      : 'dark:bg-gray-800  text-white hover:bg-gray-600'}`}
                  >
                    See Monthly Cast
                  </button>
                </div>

                {/* Weather Cards */}

                <div>
                  {dataFor && !error && (
                    <div
                      ref={scrollRef2}
                      className="flex space-x-4 overflow-x-auto overflow-y-auto hide-scrollbar no-select"
                      onMouseDown={(e) =>
                        handleMouseDown(e, setIsDragging2, scrollRef2, setStartX2, setStartY2, setScrollLeft2, setScrollTop2)
                      }
                      onMouseLeave={() => handleMouseUp(setIsDragging2)}
                      onMouseUp={() => handleMouseUp(setIsDragging2)}
                      onMouseMove={(e) =>
                        handleMouseMove(e, isDragging2, scrollRef2, startX2, startY2, scrollLeft2, scrollTop2)
                      }
                      style={{ cursor: isDragging2 ? 'grabbing' : 'grab' }}
                    >
                      {dataFor.forecast.forecastday[0].hour.map((hourData, index) => (
                        <div
                          key={index}
                          className="p-4 bg-white rounded-lg min-w-[150px] text-start shadow-md"
                        >
                          <div className="flex justify-start">
                            <img
                              className="w-12 h-12"
                              src={hourData.condition.icon}
                              alt="Weather Icon"
                            />
                          </div>
                          <p className="mt-2 text-sm text-gray-800">{formatTime(hourData.time)}</p>
                          <p className="mt-1 text-sm font-semibold">{hourData.condition.text}</p>
                          <div className="flex items-center">
                            <p className="text-3xl font-bold">{isFahrenheit ? hourData.temp_f : hourData.temp_c}</p>
                            <p className="text-xl font-semibold text-gray-600 mb-2">
                              °{isFahrenheit ? 'F' : 'C'}
                            </p>
                          </div>
                          <p className="text-sm text-gray-800">Wind: {isMPH ? hourData.wind_mph : hourData.wind_kph} {isMPH ? 'mi/h' : 'km/h'}</p>
                          <p className="text-sm text-gray-800">Humidity: {hourData.humidity}%</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {error && <p>Error loading weather data: {error.message}</p>}
                </div>
              </section>
            </div>

            {/*Sun & Moon summary */}
            <section className="bg-white p-6 rounded-lg shadow-md pb-14">
              <div className="flex justify-start items-center mb-4">
                <span className="text-gray-800">Sun & Moon Summary</span>
              </div>

              {/* Sun Section */}
              <div className="flex flex-col xsm:flex-row justify-between items-start">
                <div className="flex items-center">
                  <img src="./images/sun.gif" alt="Sun Icon" className="size-12" />
                  <div className="flex flex-col text-sm text-gray-800 pl-5">
                    <div>Air Quality</div>
                    {data.current && !error && (
                      <span className="text-xl font-semibold text-black">
                        {data.current.air_quality["gb-defra-index"]}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-4 pt-4 xsm:pt-0">
                    <div className="flex flex-col items-center">
                      <img src="./images/field.gif" alt="Sunrise Icon" className="w-6 h-6 mb-1" />
                      <div className="text-gray-800 text-sm">Sunrise</div>
                      {dataFor && !error && (
                        <span className="text-sm font-semibold text-black">
                          {dataFor.forecast.forecastday[0].astro.sunrise}
                        </span>
                      )}
                    </div>

                    {/* Sun Progress Bar */}
                    <div className="relative w-48 h-14 overflow-hidden">
                      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 50">
                        <path
                          d="M 10,50 A 40,40 0 1 1 90,50"
                          fill="none"
                          stroke="#e5e5e5"
                          strokeWidth="10"
                        />
                        <path
                          d="M 10,50 A 40,40 0 1 1 90,50"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="10"
                          strokeDasharray="126"
                          strokeDashoffset={`${126 - (126 * sunProgress) / 100}`}
                        />
                      </svg>
                    </div>

                    <div className="flex flex-col items-center">
                      <img src="./images/sunset.gif" alt="Sunset Icon" className="w-6 h-6 mb-1" />
                      <div className="text-gray-800 text-sm">Sunset</div>
                      {dataFor && !error && (
                        <span className="text-sm font-semibold text-black">
                          {dataFor.forecast.forecastday[0].astro.sunset}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Moon Section */}
              <div className="flex flex-col xsm:flex-row justify-between items-start pt-12">
                <div className="flex items-center">
                  <img src="./images/moon.gif" alt="Moon Icon" className="size-12" />
                  <div className="flex flex-col text-sm text-gray-800 pl-5">
                    <div>Air Quality</div>
                    {data.current && !error && (
                      <span className="text-xl font-semibold text-black">
                        {data.current.air_quality["gb-defra-index"]}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-4 pt-6 xsm:pt-0">
                    <div className="flex flex-col items-center">
                      <img src="./images/moon-rise.gif" alt="Moonrise Icon" className="w-6 h-6 mb-1" />
                      <div className="text-gray-800 text-sm">Moonrise</div>
                      {dataFor && !error && (
                        <span className="text-sm font-semibold text-black">
                          {dataFor.forecast.forecastday[0].astro.moonrise}
                        </span>
                      )}
                    </div>

                    {/* Moon Progress Bar */}
                    <div className="relative w-48 h-14 overflow-hidden">
                      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 50">
                        <path
                          d="M 10,50 A 40,40 0 1 1 90,50"
                          fill="none"
                          stroke="#e5e5e5"
                          strokeWidth="10"
                        />
                        <path
                          d="M 10,50 A 40,40 0 1 1 90,50"
                          fill="none"
                          stroke="#0D92F4"
                          strokeWidth="10"
                          strokeDasharray="126"
                          strokeDashoffset={`${126 - (126 * moonProgress) / 100}`}
                        />
                      </svg>
                    </div>

                    <div className="flex flex-col items-center">
                      <img src="./images/moon-set.gif" alt="Moonset Icon" className="w-6 h-6 mb-1" />
                      <div className="text-gray-800 text-sm">Moonset</div>
                      {dataFor && !error && (
                        <span className="text-sm font-semibold text-black">
                          {dataFor.forecast.forecastday[0].astro.moonset}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* weather day selection */}
          <div className="relative w-[40%] bg-white p-6 rounded-lg shadow-md hidden 982px:block">
            <div className="flex justify-start items-center mb-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedButton("Today")}
                  className={`pb-1 ${selectedButton === "Today"
                    ? "text-black border-b-2 border-black font-semibold"
                    : "text-gray-800"
                    }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setSelectedButton("Tomorrow")}
                  className={`pb-1 ${selectedButton === "Tomorrow"
                    ? "text-black border-b-2 border-black font-semibold"
                    : "text-gray-800"
                    }`}
                >
                  Tomorrow
                </button>
                <button
                  onClick={() => setSelectedButton("10 Days")}
                  className={`pb-1 ${selectedButton === "10 Days"
                    ? "text-black border-b-2 border-black font-semibold"
                    : "text-gray-800"
                    }`}
                >
                  10 Days
                </button>
                <button
                  onClick={() => setSelectedButton("monthly")}
                  className={`pb-1 ${selectedButton === "monthly"
                    ? "text-black border-b-2 border-black font-semibold"
                    : "text-gray-800"
                    }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            <div>
              {dataFor && !error && (
                <div
                  ref={scrollRef}
                  className={`relative custom-height overflow-y-auto overflow-x-auto whitespace-nowrap custom-scrollbar pr-2 no-select ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                  onMouseDown={handleMouseDown1}
                  onMouseLeave={handleMouseUp1}
                  onMouseUp={handleMouseUp1}
                  onMouseMove={handleMouseMove1}
                  style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                >
                  {dataFor.forecast.forecastday[0].hour.map((hourData, index) => (
                    <div key={index} className="flex justify-between items-center h-16 border-b-2 border-gray-300 pb-2 pt-2">
                      <div className="flex items-center space-x-2">

                        <img className="w-12 h-12" src={hourData.condition.icon} alt="Weather Icon"></img>
                        <div className="flex flex-col items-start overflow-hidden w-full sm:w-40 md:w-48 lg:w-55">
                          <span className="text-sm font-semibold text-gray-700">{formatTime(hourData.time)}</span>
                          <span className="font-semibold text-gray-700">{hourData.condition.text}</span>
                        </div>
                      </div>
                      <div className="h-12 border-l-2 border-gray-400 mx-2"></div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <div className="text-2xl font-semibold text-gray-800">{isFahrenheit ? hourData.temp_f : hourData.temp_c}</div>
                          <p className="text-xl font-semibold text-gray-600 pr-2 mb-2">°{isFahrenheit ? 'F' : 'C'}</p>
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="text-gray-800">Wind: {isMPH ? hourData.wind_mph : hourData.wind_kph} {isMPH ? 'mi/h' : 'km/h'}</span>
                          <span className="text-gray-800">Humidity: {hourData.humidity}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {error && <p>Error loading weather data: {error.message}</p>}
            </div>

            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-7 h-7 text-gray-500"
              >
                <path d="M12 16l-6-6h12l-6 6z" />
              </svg>
            </div>
          </div>


        </div>
      </main>

    </div>
  );
}

export default Weather;
