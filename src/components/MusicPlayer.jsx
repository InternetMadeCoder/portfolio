import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward, faVolumeHigh, faVolumeLow, faVolumeMute, faShuffle, faRepeat } from '@fortawesome/free-solid-svg-icons';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5); // 0.5 = 50%
  const [showVolume, setShowVolume] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none'); // 'none', 'all', 'one'
  const [previousVolume, setPreviousVolume] = useState(0.5);
  const audioRef = useRef(null);
  
  const tracks = [
    {
      title: "Embrace", 
      artist: "Sappherios", 
      audio: "./music/audio/Embrace.mp3",
      cover: "./music/cover/Sappheiros.jpg"  
    },
    {
        title: "Jaag", 
        artist: "Bayaan", 
        audio: "./music/audio/Jaag.mp3",
        cover: "./music/cover/Bayaan.jpg"  
    },
    {
        title: "Teri Tasveer", 
        artist: "Bayaan", 
        audio: "./music/audio/Teri Tasveer.mp3",
        cover: "./music/cover/Bayaan.jpg"  
    },
    {
        title: "OBVIOUS", 
        artist: "Umar, Hasan Raheem", 
        audio: "./music/audio/OBVIOUS.mp3",
        cover: "./music/cover/hasan raheem.jpg"  
    },
    {
        title: "Welcome and Goodbye", 
        artist: "Dream, Ivory", 
        audio: "./music/audio/Welcome and Goodbye.mp3",
        cover: "./music/cover/dream, ivory.jpeg"  
    },
  ];

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const playPrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleImageError = (e) => {
    console.error('Failed to load cover image:', e.target.src);
    e.target.src = './icons/default.png'; // Fallback image
  };

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    audioRef.current.volume = value;
  };

  const getVolumeIcon = () => {
    if (volume === 0) return faVolumeMute;
    if (volume < 0.5) return faVolumeLow;
    return faVolumeHigh;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleTrackEnded = () => {
    playNext();
  };

  const handleProgressChange = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    audioRef.current.currentTime = time;
  };

  const handleProgressBarClick = (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const newTime = position * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeBarClick = (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const newVolume = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const toggleRepeat = () => {
    setRepeatMode(current => {
      switch(current) {
        case 'none': return 'all';
        case 'all': return 'one';
        default: return 'none';
      }
    });
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPreviousVolume(volume);
      setVolume(0);
      audioRef.current.volume = 0;
    } else {
      setVolume(previousVolume);
      audioRef.current.volume = previousVolume;
    }
  };

  const getRepeatIcon = () => {
    switch(repeatMode) {
      case 'one': return <div className="relative">
        <FontAwesomeIcon icon={faRepeat} />
        <span className="absolute -top-2 -right-2 text-[0.6rem]">1</span>
      </div>;
      default: return <FontAwesomeIcon icon={faRepeat} />;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleTrackEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleTrackEnded);
    };
  }, []);

  useEffect(() => {
    audioRef.current.src = tracks[currentTrack].audio;
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrack]);

  // Add effect to set initial volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  return (
    <div className="fixed left-8 top-52 p-5 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-2xl min-w-[350px] hover:bg-white/15 transition-all duration-300">
      <audio ref={audioRef} />
      
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <img 
            src={tracks[currentTrack].cover}
            alt="Album Cover"
            onError={handleImageError}
            className="w-[70px] h-[70px] rounded-full object-cover shadow-lg"
            style={{
              animation: isPlaying ? 'spin 8s linear infinite' : 'none'
            }}
          />
        </div>
        <div className="flex flex-col items-start">
          <div className="font-semibold text-base mb-1 tracking-wide">
            {tracks[currentTrack].title}
          </div>
          <div className="text-sm text-white/80 font-medium">
            {tracks[currentTrack].artist}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 px-2">
          <span className="text-xs text-white/70 min-w-[3rem]">
            {formatTime(currentTime)}
          </span>
          <div 
            className="flex-1 h-1 bg-white/20 rounded-full relative cursor-pointer"
            onClick={handleProgressBarClick}
          >
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            <div 
              className="h-full bg-white rounded-full"
              style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
            />
          </div>
          <span className="text-xs text-white/70 min-w-[3rem] text-right">
            {formatTime(duration)}
          </span>
        </div>

        <div className="flex items-center justify-between px-2">
          <div className="flex items-center justify-between w-full gap-8">
            <button 
              onClick={toggleRepeat}
              className={`text-white/70 hover:text-white transition-colors p-2 bg-transparent border-0 outline-none ${
                repeatMode !== 'none' ? 'text-white' : ''
              }`}
            >
              {getRepeatIcon()}
            </button>

            <button 
              onClick={playPrevious}
              className="text-white/70 hover:text-white transition-colors p-2 bg-transparent border-0 outline-none"
            >
              <FontAwesomeIcon icon={faBackward} size="lg" />
            </button>

            <button 
              onClick={togglePlay}
              className="text-white hover:text-white/80 transition-colors p-2 bg-transparent border-0 outline-none"
            >
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="xl" />
            </button>

            <button 
              onClick={playNext}
              className="text-white/70 hover:text-white transition-colors p-2 bg-transparent border-0 outline-none"
            >
              <FontAwesomeIcon icon={faForward} size="lg" />
            </button>

            <button 
              onClick={toggleMute}
              className="text-white/70 hover:text-white transition-colors p-2 bg-transparent border-0 outline-none"
            >
              <FontAwesomeIcon icon={volume === 0 ? faVolumeMute : faVolumeHigh} size="lg" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-2">
          <FontAwesomeIcon 
            icon={getVolumeIcon()} 
            className="text-white/70 text-xs"
          />
          <div 
            className="flex-1 h-1 bg-white/20 rounded-full relative cursor-pointer"
            onClick={handleVolumeBarClick}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            <div 
              className="h-full bg-white rounded-full"
              style={{ width: `${volume * 100}%` }}
            />
          </div>
          <span className="text-xs text-white/70 min-w-[2rem] text-right">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
