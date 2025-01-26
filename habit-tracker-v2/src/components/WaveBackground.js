import React from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import './WaveBackground.css'; // Import the CSS file

const WaveBackground = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/habits"); // Redirect to /habits after clicking the button
  };

  return (
    <div className="wave-background">
      <div className="content">
        <img src="lamp.png" alt="Lamp" className="lamp-image" />
        <h1 className="title">Welcome to Daily Spark</h1>
        <p className="description">
          <Typewriter
            options={{
              strings: ['Transform your habits, transform your life.'],
              autoStart: true,
              loop: true,
              delay: 50, // Optional: Adjust typing speed
            }}
          />
        </p>
        <button onClick={handleGetStarted} className="get-started-btn">
          Get Started
        </button>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="wave-svg">
        <path
          fill="#f48347"
          fillOpacity="1"
          d="M0,64L48,58.7C96,53,192,43,288,69.3C384,96,480,160,576,208C672,256,768,288,864,250.7C960,213,1056,107,1152,90.7C1248,75,1344,149,1392,186.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default WaveBackground;