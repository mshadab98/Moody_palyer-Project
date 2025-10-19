import FacialExpression from './components/FacialExpression';
import MoodSongs from './components/Moodsongs';
import Footer from './components/Footer';
import { useState } from 'react';
import "./App.css";

const App = () => {
  const [Songs, setSongs] = useState([]);

  return (
    <div className="app-container">
         <header className="app-header">
        <div className="logo">
          <img src="https://cdn-icons-png.flaticon.com/512/727/727245.png" alt="Moodify Logo" />
          <h1>Moodify AI</h1>
        </div>
        <p className="quote">"Music is the art of feeling; let your mood play its tune 🎵"</p>
      </header>

      {/* Main content */}
      <main className="app-main">
        <FacialExpression setSongs={setSongs} />
        <MoodSongs Songs={Songs} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
