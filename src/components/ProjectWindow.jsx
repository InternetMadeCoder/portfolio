import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMinus, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';

const ProjectWindow = ({ isOpen, onClose, onMinimize, isMinimized }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth/2 - 300, y: window.innerHeight/2 - 200 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isControlsHovered, setIsControlsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previousState, setPreviousState] = useState(null);
  const windowRef = useRef(null);
  const frameRef = useRef();

  // Save previous state before going fullscreen
  const handleFullscreen = () => {
    if (!isFullscreen) {
      setPreviousState({ position, isMinimized });
      setIsFullscreen(true);
      onMinimize(false);
    } else {
      setIsFullscreen(false);
      if (previousState) {
        setPosition(previousState.position);
        onMinimize(previousState.isMinimized);
      }
    }
  };

  const handleMinimize = () => {
    onMinimize(true);
    // Save current position and state before minimizing
    setPreviousState({ position, isFullscreen });
  };

  const handleRestore = () => {
    onMinimize(false);
    // Restore previous position and state
    if (previousState) {
      setPosition(previousState.position);
      setIsFullscreen(previousState.isFullscreen);
    }
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    // Use requestAnimationFrame for smoother updates
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMinimized && previousState) {
      handleRestore();
    }
  }, [isMinimized]);

  if (!isOpen) return null;
  if (isMinimized) return null;

  return (
    <div 
      ref={windowRef}
      className={`fixed bg-white/90 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden transition-all duration-200 ${
        isDragging ? 'shadow-2xl scale-[1.002]' : 'scale-100'
      }`}
      style={{ 
        width: isFullscreen ? '100vw' : '600px',
        height: isFullscreen ? 'calc(100vh - 48px)' : '400px', // Account for menubar
        left: isFullscreen ? 0 : position.x,
        top: isFullscreen ? '24px' : position.y, // Below menubar
        transform: isFullscreen ? 'none' : `translate3d(0, 0, 0)`,
        cursor: isDragging ? 'grabbing' : 'default',
        transition: isDragging ? 'none' : 'all 0.2s ease-out',
        willChange: 'transform, width, height'
      }}
      onMouseMove={!isFullscreen ? handleMouseMove : undefined}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Window Title Bar */}
      <div 
        className="h-8 bg-gray-100/80 border-b border-gray-200/20 flex items-center px-4"
        onMouseDown={!isFullscreen ? handleMouseDown : undefined}
        style={{ cursor: isFullscreen ? 'default' : 'grab' }}
      >
        {/* Window Controls */}
        <div 
          className="window-controls flex items-center gap-2"
          onMouseEnter={() => setIsControlsHovered(true)}
          onMouseLeave={() => setIsControlsHovered(false)}
        >
          <div 
            onClick={onClose}
            className={`w-3 h-3 rounded-full bg-[#FF5F56] border-[0.5px] border-[#E0443E] flex items-center justify-center transition-all duration-200 relative ${
              isControlsHovered ? 'scale-110' : ''
            }`}
          >
            <FontAwesomeIcon 
              icon={faXmark} 
              className={`text-black/80 transition-opacity absolute ${
                isControlsHovered ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ fontSize: '8px', fontWeight: 'bold' }}
            />
          </div>
          <div 
            onClick={handleMinimize}
            className={`w-3 h-3 rounded-full bg-[#FFBD2E] border-[0.5px] border-[#DEA123] flex items-center justify-center transition-all duration-200 relative ${
              isControlsHovered ? 'scale-110' : ''
            }`}
          >
            <FontAwesomeIcon 
              icon={faMinus} 
              className={`text-black/80 transition-opacity absolute ${
                isControlsHovered ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ fontSize: '8px', fontWeight: 'bold' }}
            />
          </div>
          <div 
            onClick={handleFullscreen}
            className={`w-3 h-3 rounded-full bg-[#27C93F] border-[0.5px] border-[#1AAB29] flex items-center justify-center transition-all duration-200 relative ${
              isControlsHovered ? 'scale-110' : ''
            }`}
          >
            <FontAwesomeIcon 
              icon={faUpRightAndDownLeftFromCenter} 
              className={`text-black/80 transition-opacity absolute ${
                isControlsHovered ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ fontSize: '7px', fontWeight: 'bold' }}
            />
          </div>
        </div>
        
        {/* Window Title */}
        <span className="absolute left-1/2 -translate-x-1/2 text-sm text-gray-600 font-semibold">
          Projects
        </span>
      </div>

      {/* Window Content */}
      <div className={`p-6 ${isFullscreen ? 'h-full overflow-auto' : ''}`}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Coming Soon...</h2>
        {/* Add your projects content here */}
      </div>
    </div>
  );
};

export default ProjectWindow;
