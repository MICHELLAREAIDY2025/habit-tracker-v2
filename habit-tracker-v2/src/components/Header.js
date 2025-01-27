// Import necessary libraries and components
import React from 'react'; // Import React library
import { Link } from 'react-router-dom'; // Import Link component for routing
import './Header.css'; // Import CSS styles for the header

// Define the Header component, which takes toggleShowFavorites as a prop
const Header = ({ toggleShowFavorites }) => {
  // Render the header element
  return (
    <header className="header"> {/* Main header container with a class for styling */}
      <h1>
        <Link to="/">Daily Spark</Link> {/* Link to the home page, with the site title */}
      </h1>
      <div className="header-right"> {/* Container for right-aligned elements in the header */}
      <Link to="/habits">
      <button className="favorites-button"> {/* Button to view all habits */}
          Show All habits {/* Button text */}
        </button>
        </Link>
        <button className="favorites-button" onClick={toggleShowFavorites}> {/* Button to toggle favorite view */}
          Favorites {/* Button text */}
        </button>
        <Link to="/add-edit"> {/* Link to the add/edit page */}
          <button className="add-button">+</button> {/* Button to add a new habit */}
        </Link>
      </div>
    </header>
  );
};

// Export the Header component for use in other files
export default Header;
