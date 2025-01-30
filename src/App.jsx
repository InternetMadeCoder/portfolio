import { useState, useEffect } from 'react';
import './App.css';
import Menubar from './components/Menubar'; // Import Navbar component
import Dock from './components/Dock';
import TimeWidget from './components/TimeWidget';
import MusicPlayer from './components/MusicPlayer';
import ProjectWindow from './components/ProjectWindow';

function App() {
  const [currentWallpaper, setCurrentWallpaper] = useState(0);
  const totalWallpapers = 8; // wallpaper0 through wallpaper7
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isProjectsMinimized, setIsProjectsMinimized] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWallpaper((prev) => (prev + 1) % totalWallpapers);
    }, 5000); // Change wallpaper every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handleProjectsClick = () => {
    if (isProjectsOpen) {
      // If window is minimized, restore it
      if (isProjectsMinimized) {
        setIsProjectsMinimized(false);
      }
    } else {
      // Open new window
      setIsProjectsOpen(true);
      setIsProjectsMinimized(false);
    }
  };

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
      <TimeWidget />
      <MusicPlayer />
      <ProjectWindow 
        isOpen={isProjectsOpen} 
        isMinimized={isProjectsMinimized}
        onClose={() => {
          setIsProjectsOpen(false);
          setIsProjectsMinimized(false);
        }}
        onMinimize={setIsProjectsMinimized}
      />
      <Dock 
        activeWindows={isProjectsOpen ? ['Projects'] : []}
        activeMinimized={isProjectsMinimized ? ['Projects'] : []}
        onProjectsClick={handleProjectsClick}
      />
    </div>
  );
}

export default App;
