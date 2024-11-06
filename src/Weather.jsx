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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-700 hidden 440px:block">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
            </svg>
        </button>
        
        <img src="./images/profile-pic.jpg" alt="Description of the image"  className=" rounded-full size-9 block 890px:hidden hidden 530px:block "/>
   
        <button className="p-2 rounded-full hidden 890px:block">
            {/* Icon for settings */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-gray-700">
            <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
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
      <img src="./images/clouds.gif" alt="Description of the image"  className="size-6"/>
        <span className="text-gray-500">Air Quality</span>
      </div>
      <span className="text-2xl font-semibold ml-7">156</span>
    </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
      <div className="flex items-center space-x-2">
      <img src="./images/wind.gif" alt="Description of the image"  className="size-6"/>
        <span className="text-gray-500">Wind</span>
        </div>
        <span className="text-2xl font-semibold ml-7">1 mph</span>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
      <div className="flex items-center space-x-2">
      <img src="./images/humidity.gif" alt="Description of the image"  className="size-6"/>
        <span className="text-gray-500">Humidity</span>
        </div>
        <span className="text-2xl font-semibold ml-7">54%</span>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
      <div className="flex items-center space-x-2">
      <img src="./images/vision.gif" alt="Description of the image"  className="size-6"/>
        <span className="text-gray-500">Visibility</span>
        </div>
        <span className="text-2xl font-semibold ml-7">3 mi</span>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
      <div className="flex items-center space-x-2">
      <img src="./images/air-pump.gif" alt="Description of the image"  className="size-6"/>
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
         
        <img src="./images/sun.gif" alt="Description of the image"  className="size-12"/>
        <div className="flex flex-col text-sm text-gray-500 pl-5">
        <div>Air Quality</div>
        <span className="text-xl font-semibold text-black">156</span>
        </div>
        </div>
        <div className="flex items-center space-x-4">
           <div className="flex items-center space-x-4 pt-4 xsm:pt-0">
          <div className="flex flex-col items-center">
          <img src="./images/field.gif" alt="Description of the image"  className="w-5 h-5  mb-1"/>
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
                
            <img src="./images/sunset.gif" alt="Description of the image"  className="w-5 h-5  mb-1"/>
            <div className="text-gray-500 text-sm">Sunset</div>
            <span className="text-sm font-semibold text-black">5:43AM</span>
         </div>
      </div>

         </div>
         </div>
         <div className="flex flex-col xsm:flex-row justify-between items-start pt-12">
         <div className="flex items-center ">
         <img src="./images/moon.gif" alt="Description of the image"  className="size-12"/>
        <div className="flex flex-col text-sm text-gray-500 pl-5">
        <div>Air Quality</div>
        <span className="text-xl font-semibold text-black">156</span>
        </div>
        </div>
        <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-4 pt-6 xsm:pt-0">
          <div className="flex flex-col items-center">
          <img src="./images/moon-rise.gif" alt="Description of the image"  className="w-5 h-5  mb-1"/>
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
      <img src="./images/moon-set.gif" alt="Description of the image"  className="w-5 h-5  mb-1"/>
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
            <div className="text-2xl  font-semibold text-gray-800 pr-2">{item.temperature}C</div>
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
