import './App.css';
import Menubar from './components/Menubar'; // Import Navbar component

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(/images/wallpaper.jpg)`,
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
    </div>
  );
}

export default App;
