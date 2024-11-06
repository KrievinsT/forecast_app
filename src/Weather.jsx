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

  

  const forecastData = [
    { time: "1AM", description: "Mostly Cloudy", temperature: "12", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers very much", temperature: "14", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14", wind: "120km", humidity: "59%" },
  ];

  


  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {/* Header */}
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

        <img src="./images/google-maps.gif" alt="Description of the image"  className="w-6 h-6 ml-4 md:ml-6 lg:ml-8 xl:ml-14 hidden 890px:block"/>

        <span className="text-gray-800 ml-1 hidden 890px:block">Khulna, Bangladesh</span> 
    </div>
    <div className="flex items-center space-x-4">
        <div className="relative flex items-center">
            {/* Search bar */}
            <input
                type="text"
                placeholder="Search Location"
                className="pl-10 pr-10 py-2 border-2 border-gray-300 rounded-lg text-sm w-full max-w-full min-w-[188px]"
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

           
            <img src="./images/worldwide.gif" alt="Description of the image"  className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-6 h-6  z-10"/>
            <div className="absolute right-0.5 bg-gray-100 w-10 h-[90%] rounded-r-lg"></div>
        </div>
        {/* Light/Dark button */}
        <button className="relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300 
                bg-gray-300 text-gray-1000 hover:bg-gray-400 
                dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 hidden-on-small-screen hidden 890px:flex 890px:max-w-xs 890px:mx-auto">
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" 
        className="w-5 h-5 mr-2"> {/* Add margin-right for spacing */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
    <span>Light</span>
  </button> 
    </div>

    <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full">
            {/* Icon for notifications */}

            <img src="./images/notification.gif" alt="Description of the image"  className="size-7 text-gray-700 hidden 440px:block"/>
        </button>
        
        <img src="./images/profile-pic.jpg" alt="Description of the image"  className=" rounded-full size-9 block 890px:hidden hidden 530px:block "/>
   
        <button className="p-2 rounded-full hidden 890px:block">
            {/* Icon for settings */}

          <img src="./images/settings.gif" alt="Description of the image"  className="size-7 text-gray-700"/>

        </button>
    </div>
</header>




<main className="mt-24"> 
<div className="flex max-w-[100%] mx-auto">
<div className="w-[60%] bg-gray-100 pe-8 responsive-width">
    {/* Current Weather */}
    <section className="bg-white p-6 rounded-lg shadow-md mb-6">
  <div className="flex justify-between">
    <div>
      <div className="text-sm text-gray-800">Current Weather</div>
        {/* Current time*/}
      <div className="text-lg font-medium text-black-700">2:59PM</div>
      <div className="flex items-center">
          {/* Current tempeture*/}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-gray-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
    </svg>
  <div className="text-5xl font-semibold text-black  pl-3">12</div>
  <div className="text-2xl font-semibold text-gray-600 mb-5">°F</div>
  <div className="flex flex-col text-sm text-gray-500 pl-6">
      {/* Current condition*/}
    <div className="text-gray-800">Rainy</div>
    <div className="text-gray-900">Feels Like 35°</div>
  </div>
</div>
    </div>
    <div className="text-gray-600">
      <select className="bg-transparen p-1 text-gray-600 focus:outline-none">
        <option value="Fahrenheit">Fahrenheit</option>
        <option value="Celsius">Celsius</option>
      </select>
    </div>
  </div>
  <p className="mt-4 text-gray-800">
    There will be mostly sunny skies. The high will be 35°
  </p>
</section>

    {/* Statistical Details */}
    <section className="grid grid-cols-2 gap-6 lg:grid-cols-3 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
      <div className="flex items-center space-x-2">
      <img src="./images/clouds.gif" alt="Description of the image"  className="size-6"/>
        <span className="text-gray-800">Air Quality</span>
      </div>
      <span className="text-2xl font-semibold ml-8">156</span>
    </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
      <div className="flex items-center space-x-2">
      <img src="./images/wind.gif" alt="Description of the image"  className="size-6"/>
        <span className="text-gray-800">Wind</span>
        </div>
        <span className="text-2xl font-semibold ml-8">1 mph</span>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
      <div className="flex items-center space-x-2">
      <img src="./images/humidity.gif" alt="Description of the image"  className="size-6"/>
        <span className="text-gray-800">Humidity</span>
        </div>
        <span className="text-2xl font-semibold ml-8">54%</span>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
      <div className="flex items-center space-x-2">
      <img src="./images/vision.gif" alt="Description of the image"  className="size-6"/>
        <span className="text-gray-800">Visibility</span>
        </div>
        <span className="text-2xl font-semibold ml-8">3 mi</span>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
      <div className="flex items-center space-x-2">
      <img src="./images/air-pump.gif" alt="Description of the image"  className="size-6"/>
        <span className="text-gray-800">Pressure</span>
        </div>
        <span className="text-2xl font-semibold ml-8">27.65 in</span>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
      <div className="flex items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        <span className="text-gray-800">Pressure</span>
        </div>
        <span className="text-2xl font-semibold ml-8">66°</span>
      </div>
    </section>


    <div className="flex justify-start items-center mb-4 block 982px:hidden">
  <section className="w-full rounded-lg pb-6">
    {/* Button section */}
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-6">
        <button
          onClick={() => setSelectedButton("Today")}
          className={`${
            selectedButton === "Today" ? "text-black border-b-2 border-black font-semibold" : "text-gray-800"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setSelectedButton("Tomorrow")}
          className={`${
            selectedButton === "Tomorrow" ? "text-black border-b-2 border-black font-semibold" : "text-gray-800"
          }`}
        >
          Tomorrow
        </button>
        <button
          onClick={() => setSelectedButton("10 Days")}
          className={`${
            selectedButton === "10 Days" ? "text-black border-b-2 border-black font-semibold" : "text-gray-800"
          }`}
        >
          10 Days
        </button>
      </div>
      <button className="text-white px-4 py-2 rounded-lg transition-colors duration-300 bg-gray-300 text-gray-1000 hover:bg-gray-400 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
        See Monthly Cast
      </button>
    </div>

    {/* Weather Cards */}
    <div>
    <div
        ref={scrollRef2}
        className="flex space-x-4 overflow-x-auto overflow-y-auto hide-scrollbar no-select"
        onMouseDown={(e) => handleMouseDown(e, setIsDragging2, scrollRef2, setStartX2, setStartY2, setScrollLeft2, setScrollTop2)}
        onMouseLeave={() => handleMouseUp(setIsDragging2)}
        onMouseUp={() => handleMouseUp(setIsDragging2)}
        onMouseMove={(e) => handleMouseMove(e, isDragging2, scrollRef2, startX2, startY2, scrollLeft2, scrollTop2)}
        style={{ cursor: isDragging2 ? 'grabbing' : 'grab' }}
      >
        {forecastData.map((item, index) => (
          <div key={index} className="p-4 bg-white rounded-lg min-w-[150px] text-start shadow-md">
            <div className="flex justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-12 h-12 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
                />
              </svg>
            </div>
            <p className="mt-2 text-sm text-gray-800">{item.time}</p>
            <p className="mt-1 text-sm font-semibold">{item.description}</p>
            <div className="flex items-center">
            <p className="text-3xl font-bold">{item.temperature}</p>
            <p className="text-xl font-semibold text-gray-600 mb-2">°F</p>
            </div>
            <p className="text-sm text-gray-800">Wind: {item.wind}</p>
            <p className="text-sm text-gray-800">Humidity: {item.humidity}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
</div>



    {/*Sun % Moon summary */}
    <section className="bg-white p-6 rounded-lg shadow-md pb-14">
        <div className="flex justify-start items-center mb-4">
        <span className="text-gray-800">Sun & Moon Summary</span>
         </div>
         <div className="flex flex-col xsm:flex-row justify-between items-start">
         <div className="flex items-center ">
         
        <img src="./images/sun.gif" alt="Description of the image"  className="size-12"/>
        <div className="flex flex-col text-sm text-gray-800 pl-5">
        <div>Air Quality</div>
        <span className="text-xl font-semibold text-black">156</span>
        </div>
        </div>
        <div className="flex items-center space-x-4">
           <div className="flex items-center space-x-4 pt-4 xsm:pt-0">
          <div className="flex flex-col items-center">
          <img src="./images/field.gif" alt="Description of the image"  className="w-6 h-6  mb-1"/>
            <div className="text-gray-800 text-sm">Sunrise</div>
            <span className="text-sm font-semibold text-black">5:43AM</span>
          </div>

      {/* Half-Circle Progress Bar */}
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
        strokeDashoffset="63" 
          />
        </svg>
      </div>
      <div className="flex flex-col items-center">
                
            <img src="./images/sunset.gif" alt="Description of the image"  className="w-6 h-6  mb-1"/>
            <div className="text-gray-800 text-sm">Sunset</div>
            <span className="text-sm font-semibold text-black">5:43AM</span>
         </div>
      </div>

         </div>
         </div>
         <div className="flex flex-col xsm:flex-row justify-between items-start pt-12">
         <div className="flex items-center ">
         <img src="./images/moon.gif" alt="Description of the image"  className="size-12"/>
        <div className="flex flex-col text-sm text-gray-800 pl-5">
        <div>Air Quality</div>
        <span className="text-xl font-semibold text-black">156</span>
        </div>
        </div>
        <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-4 pt-6 xsm:pt-0">
          <div className="flex flex-col items-center">
          <img src="./images/moon-rise.gif" alt="Description of the image"  className="w-6 h-6 mb-1"/>
            <div className="text-gray-800 text-sm">Moonrise</div>
            <span className="text-sm font-semibold text-black">5:43AM</span>
          </div>

      {/* Half-Circle Progress Bar */}
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
        strokeDashoffset="63" 
          />
        </svg>
      </div>
      <div className="flex flex-col items-center">
      <img src="./images/moon-set.gif" alt="Description of the image"  className="w-6 h-6 mb-1"/>
            <div className="text-gray-800 text-sm">Moonset</div>
            <span className="text-sm font-semibold text-black">5:43AM</span>
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
        className={`pb-1 ${
          selectedButton === "Today"
            ? "text-black border-b-2 border-black font-semibold"
            : "text-gray-800"
        }`}
      >
        Today
      </button>
      <button
        onClick={() => setSelectedButton("Tomorrow")}
        className={`pb-1 ${
          selectedButton === "Tomorrow"
            ? "text-black border-b-2 border-black font-semibold"
            : "text-gray-800"
        }`}
      >
        Tomorrow
      </button>
      <button
        onClick={() => setSelectedButton("10 Days")}
        className={`pb-1 ${
          selectedButton === "10 Days"
            ? "text-black border-b-2 border-black font-semibold"
            : "text-gray-800"
        }`}
      >
        10 Days
      </button>
      <button
        onClick={() => setSelectedButton("Monthly")}
        className={`pb-1 ${
          selectedButton === "Monthly"
            ? "text-black border-b-2 border-black font-semibold"
            : "text-gray-800"
        }`}
      >
        Monthly
      </button>
    </div>
  </div>

  <div
        ref={scrollRef}
        className={`relative custom-height overflow-y-auto overflow-x-auto whitespace-nowrap custom-scrollbar pr-2 no-select ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={(e) => handleMouseDown(e, setIsDragging, scrollRef, setStartX, setStartY, setScrollLeft, setScrollTop)}
        onMouseLeave={() => handleMouseUp(setIsDragging)}
        onMouseUp={() => handleMouseUp(setIsDragging)}
        onMouseMove={(e) => handleMouseMove(e, isDragging, scrollRef, startX, startY, scrollLeft, scrollTop)}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
      {forecastData.map((item, index) => (
        <div key={index} className="flex justify-between items-center h-16 border-b-2 border-gray-300 pb-2 pt-2">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-12 h-12 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
              />
            </svg>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-700">{item.time}</span>
              <span className="font-semibold text-gray-700">{item.description}</span>
            </div>
          </div>

          <div className="h-12 border-l-2 border-gray-400 mx-2"></div>
          <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="text-2xl  font-semibold text-gray-800 ">{item.temperature}</div>
            <p className="text-xl font-semibold text-gray-600  pr-2 mb-2">°F</p>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-gray-800">Wind: {item.wind}</span>
              <span className="text-gray-800">Humidity: {item.humidity}</span>
            </div>
          </div>
        </div>
      ))}
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
