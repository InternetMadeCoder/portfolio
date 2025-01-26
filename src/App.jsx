import { useState, useEffect } from 'react';
import './App.css';
import Menubar from './components/Menubar'; // Import Navbar component
import Dock from './components/Dock';

function App() {
  const [currentWallpaper, setCurrentWallpaper] = useState(0);
  const totalWallpapers = 8; // wallpaper0 through wallpaper7

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWallpaper((prev) => (prev + 1) % totalWallpapers);
    }, 5000); // Change wallpaper every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(/wallpaper/wallpaper${currentWallpaper}.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        transition: 'background-image 1s ease-in-out',
      }}
    >
      <Menubar /> 
      <Dock />
    </div>
  );
}

export default App;
