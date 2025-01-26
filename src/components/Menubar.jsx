import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Import FontAwesomeIcon
import { faApple } from '@fortawesome/free-brands-svg-icons';  // Import the Apple icon
import { faBatteryHalf } from '@fortawesome/free-solid-svg-icons';  // Import the solid battery-half icon
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; 

function Menubar() {
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
      <FontAwesomeIcon icon={faMagnifyingGlass} className="ml-3" size="sm"/>
    </div>
  );
}

export default Menubar;
