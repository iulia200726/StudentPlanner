import React from 'react';
import '../style/LandingPage.css';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="LandingPageMinimal">
      <div className="landing-content">
        <h1>Welcome to Student Planner</h1>
        <p className="subtitle">
          Organize your tasks, schedule, and deadlines all in one place.
        </p>
        <Link to="/signup" className="cta-button">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
