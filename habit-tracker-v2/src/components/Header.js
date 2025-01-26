import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ toggleShowFavorites }) => {
  return (
    <header className="header">
      <h1>
        <Link to="/">Daily Spark</Link>
      </h1>
      <div className="header-right">
        <div className="clock">{new Date().toLocaleTimeString()}</div>
        <button className="favorites-button" onClick={toggleShowFavorites}>
          Favorites
        </button>
        <Link to="/add-edit">
          <button className="add-button">+</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
