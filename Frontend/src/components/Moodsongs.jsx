import React, { useEffect, useRef, useState } from "react";
import "./MoodSongs.css";

const MoodSongs = ({ Songs = [] }) => {
  const [isPlaying, setPlaying] = useState(null);
  const audioRefs = useRef([]);

  useEffect(() => {
    return () => {
      audioRefs.current.forEach((a) => a && a.pause());
    };
  }, [Songs]);

  const handlePlayPause = (index) => {
    const current = audioRefs.current[index];
    if (!current) return;

    if (isPlaying === index) {
      current.pause();
      setPlaying(null);
    } else {
      audioRefs.current.forEach((a, i) => i !== index && a?.pause());
      current.currentTime = 0;
      current.play();
      setPlaying(index);
    }
  };

  const setAudioRef = (el, i) => {
    audioRefs.current[i] = el;
    if (el) el.onended = () => setPlaying((p) => (p === i ? null : p));
  };

  return (
    <div className="mood-wrapper">
      <h2 className="mood-heading">
        <i className="ri-play-list-line"></i> Moodify Playlist
      </h2>

      {Songs.length === 0 ? (
        <p className="no-songs">🎧 No songs for this mood yet.</p>
      ) : (
        <div className="song-list">
          {Songs.map((song, i) => (
            <div
              className={`song-card ${isPlaying === i ? "active" : ""}`}
              key={i}
            >
              <div className="song-left">
                <div className="thumb">
                  {song.cover ? (
                    <img src={song.cover} alt={song.title} />
                  ) : (
                    <div className="placeholder">{song.title?.charAt(0) || "♪"}</div>
                  )}
                </div>
                <div className="info">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
              </div>

              <div className="song-right">
                <audio ref={(el) => setAudioRef(el, i)} src={song.audio} />
                <button className="play-btn" onClick={() => handlePlayPause(i)}>
                  {isPlaying === i ? (
                    <i className="ri-pause-fill"></i>
                  ) : (
                    <i className="ri-play-fill"></i>
                  )}
                </button>

                <div className="wave">
                  <span className={isPlaying === i ? "active" : ""}></span>
                  <span className={isPlaying === i ? "active" : ""}></span>
                  <span className={isPlaying === i ? "active" : ""}></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodSongs;
