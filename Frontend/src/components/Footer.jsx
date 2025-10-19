import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-logo">Modify AI</h2>
        <p className="footer-tagline">Your Mood, Your Music – Powered by AI 🎧</p>

        <div className="footer-icons">
          <a href="https://github.com/mshadab98" target="_blank" rel="noreferrer">
            <i className="ri-github-line"></i>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            <i className="ri-linkedin-line"></i>
          </a>
          <a href="mailto:mohdshadab98977@gmail.com">
            <i className="ri-mail-line"></i>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Modify AI | Created by Mohd Shadab
      </div>
    </footer>
  );
};

export default Footer;
