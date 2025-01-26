// Import necessary libraries and components
import React, { useState } from 'react'; // React and useState hook for managing state
import { useNavigate, useParams } from 'react-router-dom'; // Hooks for navigation and route parameters
import icons from '../data/icons'; // Importing icons data from a local file
import './AddEditHabit.css'; // Importing CSS styles for the component

// Define the AddEditHabit component, which takes habits, addHabit, and editHabit as props
const AddEditHabit = ({ habits, addHabit, editHabit }) => {
  // Initialize the navigate function for programmatic navigation
  const navigate = useNavigate();
  
  // Extract the id parameter from the current route
  const { id } = useParams();
  
  // Check if we are editing an existing habit based on the id
  const editingHabit = id ? habits.find((h) => h.id === parseInt(id)) : null;

  // Set up local state for the form, initializing with an existing habit or default values
  const [form, setForm] = useState(
    editingHabit || {
      id: Date.now(), // Unique id for the new habit
      title: '', // Title of the habit
      description: '', // Description of the habit
      color: '#44C6BB', // Default color for the habit
      icon: '', // Selected icon for the habit
      isFavorite: false, // Indicates if the habit is a favorite
      startDate: '', // Start date for the habit
      endDate: '', // End date for the habit
      progress: {}, // Progress tracking for the habit
    }
  );

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setForm({ ...form, [name]: value }); // Update the form state with the new value
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (editingHabit) {
      editHabit(form); // Edit the existing habit if we are in edit mode
    } else {
      addHabit(form); // Add a new habit if we are in add mode
    }
    navigate('/'); // Navigate back to the home page after submission
  };

  // Render the form for adding/editing a habit
  return (
    <form className="add-edit-form" onSubmit={handleSubmit}> {/* Form element */}
      <h2>{editingHabit ? 'Edit Habit' : 'Add New Habit'}</h2> {/* Conditional title */}
      <input
        type="text"
        name="title" // Input name for the title
        placeholder="Title" // Placeholder text
        value={form.title} // Controlled component value
        onChange={handleInputChange} // Event handler for input change
        required // Makes this field mandatory
      />
      <textarea
        name="description" // Input name for the description
        placeholder="Description" // Placeholder text
        value={form.description} // Controlled component value
        onChange={handleInputChange} // Event handler for input change
        required // Makes this field mandatory
      ></textarea>
      <label>Pick a color:</label> {/* Label for color input */}
      <input
        type="color" // Color input type
        name="color" // Input name for the color
        value={form.color} // Controlled component value
        onChange={handleInputChange} // Event handler for input change
      />
      <label>Pick an icon:</label> {/* Label for icon selection */}
      <div className="icon-picker"> {/* Container for icon selection */}
        {icons.map((icon) => ( // Map through the icons array
          <div
            key={icon.name} // Unique key for each icon
            className={`icon ${form.icon === icon.name ? 'selected' : ''}`} // Apply selected class if the icon matches
            style={{ borderColor: form.color }} // Dynamic border color
            onClick={() => setForm({ ...form, icon: icon.name })} // Set the selected icon
          >
            {icon.icon} {/* Render the icon */}
          </div>
        ))}
      </div>
      <input
        type="date" // Date input type for start date
        name="startDate" // Input name for the start date
        value={form.startDate} // Controlled component value
        onChange={handleInputChange} // Event handler for input change
        required // Makes this field mandatory
      />
      <input
        type="date" // Date input type for end date
        name="endDate" // Input name for the end date
        value={form.endDate} // Controlled component value
        onChange={handleInputChange} // Event handler for input change
        required // Makes this field mandatory
      />
      <button type="submit">{editingHabit ? 'Update' : 'Add'}</button> {/* Submit button */}
    </form>
  );
};

// Export the AddEditHabit component for use in other files
export default AddEditHabit;