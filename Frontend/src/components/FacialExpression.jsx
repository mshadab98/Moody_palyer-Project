import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";
import "./FacialExpression.css";

const FacialExpression = ({ setSongs }) => {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState("Waiting...");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detecting, setDetecting] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
      startVideo();
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => setExpression("Webcam Error"));
  };

  const detectExpression = async () => {
    if (!modelsLoaded) return setExpression("Loading Models...");
    if (!videoRef.current) return;

    try {
      setDetecting(true);
      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detection && detection.expressions) {
        const best = Object.entries(detection.expressions).reduce((a, b) =>
          a[1] > b[1] ? a : b
        );
        const mood = best[0].toLowerCase();
        setExpression(mood);

        const invalidMoods = ["unknown", "no face detected", "waiting...", "error detecting expression"];
        if (!invalidMoods.includes(mood)) {
          axios
            .get(`https://moody-palyer-project-backend.onrender.com/songs?mood=${mood}`)
            .then((res) => setSongs(res.data.songs || []))
            .catch((err) => console.error(err));
        }
      } else setExpression("No Face Detected");
    } catch (err) {
      console.error(err);
      setExpression("Detection Error");
    } finally {
      setDetecting(false);
    }
  };

  return (
    <div className="facial-wrapper">
      {/* Left: Video Feed */}
      <div className="video-container">
        <video ref={videoRef} autoPlay muted playsInline className="video-feed" />
        {detecting && <div className="scanner-overlay"><div className="scanner"></div></div>}
      </div>

      {/* Right: Mood Panel */}
      <div className="mood-panel">
        <h1>Moodify AI</h1>
        <p>Detect your current emotion & play matching songs 🎵</p>

        <div className="mood-display">
          <i className="ri-emotion-line mood-icon"></i>
          <span className="mood-text">{expression}</span>
        </div>

        <button
          onClick={detectExpression}
          className={`detect-btn ${detecting ? "loading" : ""}`}
          disabled={detecting}
        >
          {detecting ? "Scanning..." : "Detect Mood"} <i className="ri-sparkling-line"></i>
        </button>

        <p className="hint">🎥 Keep your face visible and well-lit for better accuracy.</p>
      </div>
    </div>
  );
};

export default FacialExpression;
