import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Import FontAwesomeIcon
import { faApple } from '@fortawesome/free-brands-svg-icons';  // Import the Apple icon
import { faBatteryHalf } from '@fortawesome/free-solid-svg-icons';  // Import the solid battery-half icon
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; 

function Menubar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    return `${weekday} ${day} ${month}`;
  };

  const formatTime = (date) => {
    const formatted = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).trim().replace(/\s+/g, ' '); // Replace multiple spaces with single space
    return formatted;
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800/80 text-white py-1 px-4 flex items-center shadow-sm">
      <FontAwesomeIcon icon={faApple} className="mr-3" />  
      <div className="text-sm font-bold mr-4">Finder</div>
      <div className="text-sm font-medium mx-2">File</div>
      <div className="text-sm font-medium mx-2">Edit</div>
      <div className="text-sm font-medium mx-2">View</div>
      <div className="text-sm font-medium mx-2">Go</div>
      <div className="text-sm font-medium mx-2">Window</div>
      <div className="text-sm font-medium mx-2">Help</div>

      <FontAwesomeIcon icon={faBatteryHalf} className="ml-auto mr-3" />
      <img src="/images/wifi.png" alt="WiFi" className="mx-3 w-4 h-4" />
      <FontAwesomeIcon icon={faMagnifyingGlass} className="mx-3" size="sm"/>
      <img src="/images/control-centre.svg" alt="Control Center" className="mx-3 w-4 h-4" />

      <span className="text-sm ml-3">{formatDate(currentTime)}&nbsp;{formatTime(currentTime)}</span>
    </div>
  );
}

export default Menubar;
