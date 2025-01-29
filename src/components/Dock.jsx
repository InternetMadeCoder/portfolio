import { useState, useEffect } from 'react';
import Launchpad from './Launchpad';

const Dock = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false);
  
  const icons = [
    { name: 'Finder', src: './icons/finder.png' },
    { name: 'Launchpad', src: './icons/launchpad.png' },
    { name: 'Terminal', src: './icons/terminal.png' },
    { name: 'Safari', src: './icons/safari.png' },
    { name: 'Projects', src: './icons/projects.png' },
    { name: 'Github', src: './icons/github.png', url: 'https://github.com/InternetMadeCoder' },
    { name: 'About Me', src: './icons/memoji.png' },
    { name: 'Resume', src: './icons/resume.png', url: 'https://drive.google.com/file/d/1oYdaP69jWgwFlcdqdlypLRLEZMeoVgtc/view?usp=sharing'},
  ];

  const handleIconClick = (icon) => {
    console.log('Icon clicked:', icon.name); // Debug log
    if (icon.url) {
      window.open(icon.url, '_blank');
    } else if (icon.name === 'Launchpad') {
      console.log('Opening Launchpad'); // Debug log
      setIsLaunchpadOpen(prev => !prev); // Toggle Launchpad
    }
  };

  // Add error handling for images
  const handleImageError = (e) => {
    console.error(`Failed to load image: ${e.target.src}`);
    e.target.src = './icons/default.png'; // Fallback image
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isHovering) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  const getScale = (index, mouseX) => {
    if (!isHovering) return 1;

    const iconElement = document.getElementById(`dock-icon-${index}`);
    if (!iconElement) return 1;

    const rect = iconElement.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - iconCenterX);
    const maxDistance = 150;

    if (distance > maxDistance) return 1;
    return 1 + (1 - distance / maxDistance) * 0.5;
  };

  return (
    <>
      {isLaunchpadOpen && ( // Add conditional check
        <Launchpad 
          isOpen={isLaunchpadOpen} 
          onClose={() => {
            console.log('Closing Launchpad'); // Debug log
            setIsLaunchpadOpen(false);
          }} 
        />
      )}
      <div 
        className="fixed bottom-3 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-lg rounded-2xl p-2 flex gap-3 shadow-lg border border-white/22"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setHoveredIcon(null);
        }}
      >
        {icons.map((icon, index) => (
          <div 
            key={index}
            id={`dock-icon-${index}`}
            onMouseEnter={() => setHoveredIcon(icon.name)}
            onMouseLeave={() => setHoveredIcon(null)}
            onClick={() => handleIconClick(icon)}
            className="relative w-[50px] h-[50px] transition-all duration-150 ease-in-out cursor-pointer"
            style={{
              transform: `scale(${getScale(index, mousePosition.x)})`,
              transformOrigin: 'bottom'
            }}
          >
            {hoveredIcon === icon.name && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800/60 text-white/90 px-2 py-0.5 rounded-md text-xs whitespace-nowrap backdrop-blur-sm animate-fade-in">
                {icon.name}
              </div>
            )}
            <img 
              src={icon.src} 
              alt={icon.name} 
              onError={handleImageError}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Dock;
