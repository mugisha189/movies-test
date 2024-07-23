import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineSearch, AiOutlineSetting } from "react-icons/ai";

const morningGreetings = [
  { language: "English", greeting: "Good Morning 🌅" },
  { language: "French", greeting: "Bonjour 🌞" },
  { language: "Spanish", greeting: "Buenos Días 🌻" },
  // Add more morning greetings here
];

const afternoonGreetings = [
  { language: "English", greeting: "Good Afternoon ☀️" },
  { language: "French", greeting: "Bon Après-midi 🌤️" },
  { language: "Spanish", greeting: "Buenas Tardes ☀️" },
  // Add more afternoon greetings here
];

const eveningGreetings = [
  { language: "English", greeting: "Good Evening 🌆" },
  { language: "French", greeting: "Bonsoir 🌙" },
  { language: "Spanish", greeting: "Buenas Noches 🌜" },
  // Add more evening greetings here
];

const Navbar: React.FC = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [currentGreetings, setCurrentGreetings] = useState(morningGreetings);
  const location = useLocation();

  useEffect(() => {
    const updateGreetingSet = () => {
      const hour = new Date().getHours();
      if (hour < 12) {
        setCurrentGreetings(morningGreetings);
      } else if (hour < 18) {
        setCurrentGreetings(afternoonGreetings);
      } else {
        setCurrentGreetings(eveningGreetings);
      }
    };

    updateGreetingSet();

    const intervalId = setInterval(() => {
      setGreetingIndex(
        (prevIndex) => (prevIndex + 1) % currentGreetings.length
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [currentGreetings.length]);

  const handleSearchClick = () => {
    console.log("clicked on");
  };

  const renderGreeting = () => {
    const currentGreeting = currentGreetings[greetingIndex];
    return (
      <span className="text-gray-800 font-medium text-lg">
        {currentGreeting.greeting}
      </span>
    );
  };

  return (
    <nav className={`absolute w-full top-0 transition duration-300 p-2 `}>
      <div className="px-4 py-2 flex justify-between items-center bg-background2  bg-opacity-50 backdrop-blur-sm rounded-2xl">
        <div className="text-xl font-bold">
          {location.pathname === "/" ? (
            renderGreeting()
          ) : (
            <span>{location.pathname.slice(1).toUpperCase()}</span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {location.pathname === "/" && (
            <div className="flex items-center gap-2  border-myBlue border  rounded-2xl focus:border-primary transition-colors duration-300 focus:border-2 px-4">
              <input
                type="text"
                placeholder="Search..."
                className=" py-2 bg-inherit w-full  outline-none text-sm "
                onClick={handleSearchClick}
              />
              <AiOutlineSearch className=" text-gray-500 w-5 h-5" />
            </div>
          )}
          <button className="p-2">
            <AiOutlineSetting className="text-xl" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
