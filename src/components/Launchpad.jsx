import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Launchpad = ({ isOpen, onClose, onProjectsClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const launchpadRef = useRef();

  const apps = [
    { name: 'Safari', icon: './icons/safari.png' },
    { name: 'Projects', icon: './icons/projects.png' },
    { name: 'Terminal', icon: './icons/terminal.png' },
    { name: 'Github', icon: './icons/github.png', url: 'https://github.com/InternetMadeCoder' },
    { name: 'About Me', icon: './icons/memoji.png' },
    { name: 'Resume', icon: './icons/resume.png', url: 'https://drive.google.com/file/d/1oYdaP69jWgwFlcdqdlypLRLEZMeoVgtc/view?usp=sharing'},
  ];

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAppClick = (app) => {
    if (app.url) {
      window.open(app.url, '_blank');
    } else if (app.name === 'Projects') {
      onProjectsClick();
    }
    onClose(); // Close Launchpad after clicking
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (launchpadRef.current && !launchpadRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    console.log('Launchpad isOpen:', isOpen); // Debug log
  }, [isOpen]);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xl z-50 flex flex-col items-center pt-20 animate-fade-in">
      <div ref={launchpadRef} className="w-full max-w-2xl">
        <div className="relative mx-auto w-64 mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              className={`w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-lg text-white outline-none ${
                isInputFocused || searchTerm ? 'text-left pl-9' : 'text-center'
              } transition-all duration-200`}
              style={{
                caretColor: isInputFocused ? 'white' : 'transparent'
              }}
            />
            <div 
              className={`absolute inset-0 flex items-center pointer-events-none transition-all duration-200 ${
                isInputFocused || searchTerm 
                  ? 'justify-start pl-4' 
                  : 'justify-center'
              }`}
            >
              <FontAwesomeIcon 
                icon={faMagnifyingGlass} 
                className="text-white/50 text-sm"
              />
              {!searchTerm && (
                <span className="text-white/50 text-sm ml-1">Search</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-6 gap-8 px-8">
          {filteredApps.map((app, index) => (
            <div
              key={index}
              onClick={() => handleAppClick(app)}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-16 h-16 mb-2 transition-transform duration-200 group-hover:scale-110">
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white text-sm">{app.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Launchpad;
