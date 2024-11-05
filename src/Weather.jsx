import './index.css';

import React, { useRef, useState, useEffect } from 'react';

function Weather() {
  const [selectedButton, setSelectedButton] = useState("Today");
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setStartY(e.pageY - scrollRef.current.offsetTop);
    setScrollLeft(scrollRef.current.scrollLeft);
    setScrollTop(scrollRef.current.scrollTop);
    e.preventDefault();
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const x = e.pageX - scrollRef.current.offsetLeft;
    const y = e.pageY - scrollRef.current.offsetTop;

    const walkX = (x - startX) * 1; // Adjust sensitivity if needed
    const walkY = (y - startY) * 1; // Adjust sensitivity if needed

    scrollRef.current.scrollLeft = scrollLeft - walkX;
    scrollRef.current.scrollTop = scrollTop - walkY;
  };

  useEffect(() => {
    const updateScrollbarVisibility = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        // Update scrollbar visibility logic if needed
      }
    };

    updateScrollbarVisibility();
    window.addEventListener('resize', updateScrollbarVisibility);

    return () => {
      window.removeEventListener('resize', updateScrollbarVisibility);
    };
  }, []);

  const forecastData = [
    { time: "1AM", description: "Mostly Cloudy", temperature: "12°", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14°", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14°", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14°", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14°", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14°", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14°", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers very much", temperature: "14°", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14°", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14°", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14°", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14°", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14°", wind: "120km", humidity: "59%" },
    { time: "2AM", description: "Rain Showers", temperature: "14°", wind: "120km", humidity: "59%" },
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

        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 ml-4 md:ml-6 lg:ml-8 xl:ml-14 hidden 890px:block"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
        </svg>

        <span className="text-gray-500 ml-1 hidden 890px:block">Khulna, Bangladesh</span> 
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

            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 z-10"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-gray-700 hidden 440px:block">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
            </svg>
        </button>
        
        <img src="./images/profile-pic.jpg" alt="Description of the image"  className=" rounded-full size-9 block 890px:hidden hidden 530px:block "/>
   
        <button className="p-2 rounded-full hidden 890px:block">
            {/* Icon for settings */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-gray-700">
            <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd" />
          </svg>

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
      <div className="text-sm text-gray-500">Current Weather</div>
        {/* Current time*/}
      <div className="text-lg font-medium text-black-700">2:59PM</div>
      <div className="flex items-center">
          {/* Current tempeture*/}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-gray-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
    </svg>
  <div className="text-5xl font-semibold text-black mr-2 pl-3">12°F</div>
  <div className="flex flex-col text-sm text-gray-500 pl-6">
      {/* Current condition*/}
    <div>Rainy</div>
    <div className="text-gray-700">Feels Like 35°</div>
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
        </svg>
        <span className="text-gray-500">Air Quality</span>
      </div>
      <span className="text-2xl font-semibold ml-7">156</span>
    </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
      <div className="flex items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16"  className="size-5 bi bi-wind">
        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>
      </svg>
        <span className="text-gray-500">Wind</span>
        </div>
        <span className="text-2xl font-semibold ml-7">1 mph</span>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
      <div className="flex items-center space-x-2">
      <img src="./images/humidity-icon.svg" alt="Description of the image"  className="size-5"/>
        <span className="text-gray-500">Humidity</span>
        </div>
        <span className="text-2xl font-semibold ml-7">54%</span>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
      <div className="flex items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        <span className="text-gray-500">Visibility</span>
        </div>
        <span className="text-2xl font-semibold ml-7">3 mi</span>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
      <div className="flex items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        <span className="text-gray-500">Pressure</span>
        </div>
        <span className="text-2xl font-semibold ml-7">27.65 in</span>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
      <div className="flex items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        <span className="text-gray-500">Pressure</span>
        </div>
        <span className="text-2xl font-semibold ml-7">66°</span>
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
            selectedButton === "Today" ? "text-black border-b-2 border-black font-semibold" : "text-gray-600"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setSelectedButton("Tomorrow")}
          className={`${
            selectedButton === "Tomorrow" ? "text-black border-b-2 border-black font-semibold" : "text-gray-600"
          }`}
        >
          Tomorrow
        </button>
        <button
          onClick={() => setSelectedButton("10 Days")}
          className={`${
            selectedButton === "10 Days" ? "text-black border-b-2 border-black font-semibold" : "text-gray-600"
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
        className="flex space-x-4 overflow-x-auto hide-scrollbar"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
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
            <p className="mt-2 text-sm text-gray-500">{item.time}</p>
            <p className="mt-1 text-sm font-semibold">{item.description}</p>
            <p className="text-3xl font-bold">{item.temperature}C</p>
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
        <span className="text-gray-500">Sun & Moon Summary</span>
         </div>
         <div className="flex flex-col xsm:flex-row justify-between items-start">
         <div className="flex items-center ">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12 text-gray-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
        <div className="flex flex-col text-sm text-gray-500 pl-5">
        <div>Air Quality</div>
        <span className="text-xl font-semibold text-black">156</span>
        </div>
        </div>
        <div className="flex items-center space-x-4">
           <div className="flex items-center space-x-4 pt-4 xsm:pt-0">
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-gray-700 mb-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
            <div className="text-gray-500 text-sm">Sunrise</div>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-gray-700 mb-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
            <div className="text-gray-500 text-sm">Sunset</div>
            <span className="text-sm font-semibold text-black">5:43AM</span>
         </div>
      </div>

         </div>
         </div>
         <div className="flex flex-col xsm:flex-row justify-between items-start pt-12">
         <div className="flex items-center ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12 text-gray-700">
          <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
        </svg>
        <div className="flex flex-col text-sm text-gray-500 pl-5">
        <div>Air Quality</div>
        <span className="text-xl font-semibold text-black">156</span>
        </div>
        </div>
        <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-4 pt-6 xsm:pt-0">
          <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5  text-gray-700 mb-1">
          <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
        </svg>
            <div className="text-gray-500 text-sm">Moonrise</div>
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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5  text-gray-700 mb-1">
          <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
        </svg>
            <div className="text-gray-500 text-sm">Moonset</div>
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
            : "text-gray-500"
        }`}
      >
        Today
      </button>
      <button
        onClick={() => setSelectedButton("Tomorrow")}
        className={`pb-1 ${
          selectedButton === "Tomorrow"
            ? "text-black border-b-2 border-black font-semibold"
            : "text-gray-500"
        }`}
      >
        Tomorrow
      </button>
      <button
        onClick={() => setSelectedButton("10 Days")}
        className={`pb-1 ${
          selectedButton === "10 Days"
            ? "text-black border-b-2 border-black font-semibold"
            : "text-gray-500"
        }`}
      >
        10 Days
      </button>
      <button
        onClick={() => setSelectedButton("Monthly")}
        className={`pb-1 ${
          selectedButton === "Monthly"
            ? "text-black border-b-2 border-black font-semibold"
            : "text-gray-500"
        }`}
      >
        Monthly
      </button>
    </div>
  </div>

  <div
      ref={scrollRef}
      className={`relative custom-height overflow-y-auto overflow-x-auto whitespace-nowrap custom-scrollbar pr-2 no-select ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }} 
    >
      {forecastData.map((item, index) => (
        <div key={index} className="flex justify-between items-center h-16 border-b-2 border-gray-300 pb-2">
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
            <div className="text-lg text-gray-800">{item.temperature}</div>
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
