// Import necessary libraries
import React from "react"; // Import React to create components
import { Link,useNavigate } from "react-router-dom"; // Import Link for navigation between routes
import "./Header.css"; // Import CSS for styling the header component

// Define the Header component, passing in props: showFavorites and setShowFavorites
const Header = ({ showFavorites, setShowFavorites }) => {

  const navigate = useNavigate(); // Initialize navigate function
  // Function to show all habits by setting showFavorites to false
  const handleShowAll = () => {
    setShowFavorites(false); // Update state
    navigate("/habits"); // Redirect to /habits
  };

 // Function to show only favorite habits by setting showFavorites to true
  const handleShowFavorites = () => {
    setShowFavorites(true); // Update state
    navigate("/habits"); // Redirect to /habits
  };

  // Render the header component
  return (
    <header className="header"> {/* Main container for the header */}
      <h1> {/* Heading for the site title */}
        <Link to="/">Daily Spark</Link> {/* Link to the home page */}
      </h1>
      <div className="header-right"> {/* Container for right-aligned buttons */}
        {/* Button to display all habits */}
        <button
          className={`favorites-button ${!showFavorites ? "active" : ""}`} // Add active class if not showing favorites
          onClick={handleShowAll} // Call handleShowAll when clicked
        >
          Show All habits {/* Text for the button */}
        </button>
        {/* Button to display only favorite habits */}
        <button
          className={`favorites-button ${showFavorites ? "active" : ""}`} // Add active class if showing favorites
          onClick={handleShowFavorites} // Call handleShowFavorites when clicked
        >
          Favorites {/* Text for the button */}
        </button>
        {/* Button to navigate to the add/edit habit page */}
        <Link to="/add-edit"> {/* Link to the add/edit route */}
          <button className="add-button">+</button> {/* Plus button to add a new habit */}
        </Link>
      </div>
    </header>
  );
};

// Export the Header component for use in other parts of the app
export default Header;
