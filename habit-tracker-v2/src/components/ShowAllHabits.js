import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "./Calendar"; // Ensure Calendar component is imported correctly
import "./ShowAllHabits.css"; // Make sure this CSS includes necessary styles for the modal
import icons from "../data/icons";
import 'font-awesome/css/font-awesome.min.css';
import { FaChartBar } from "react-icons/fa";

const ShowAllHabits = ({ habits, deleteHabit, toggleFavorite, updateHabit }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const navigate = useNavigate();

  const getIconByName = (name) => {
    const selectedIcon = icons.find((icon) => icon.name === name);
    return selectedIcon ? selectedIcon.icon : null;
  };

  const handleShowCalendar = (habit) => {
    setSelectedHabit(habit);   
    setShowCalendar(true);     
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);   
    setSelectedHabit(null);   
  };

  return (
    <div className="habit-list">
    {habits.length === 0 ? (
      <p className="no-habits-message">Click the plus in the header to start</p>
    ) : (
      habits.map((habit) => (
        <div
          key={habit.id}
          className="habit-card"
          style={{ borderBottom: `4px solid ${habit.color}` }}
        >
          <div className="card-front">
            <div className="icon" style={{ color: habit.color }}>
              {getIconByName(habit.icon)}
            </div>
            <h3>{habit.title}</h3>
          </div>
          <p className="card-description">{habit.description}</p>
          <p className="card-date">{new Date(habit.id).toLocaleDateString()}</p>
         
          <div className="card-actions">
            <button
              className="action-btn"
              data-tooltip={habit.isFavorite ? "Unfavorite" : "Favorite"}
              onClick={() => toggleFavorite(habit.id)}
            >
              <i className={`fa fa-star${habit.isFavorite ? '' : '-o'}`}></i>
            </button>
            <button
              className="action-btn"
              data-tooltip="Edit"
              onClick={() => navigate(`/add-edit/${habit.id}`)}
            >
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="action-btn"
              data-tooltip="Delete"
              onClick={() => deleteHabit(habit.id)}
            >
              <i className="fa fa-trash"></i>
            </button>
            <button
              className="action-btn"
              data-tooltip="Calendar"
              onClick={() => handleShowCalendar(habit)}
            >
              <i className="fa fa-calendar"></i>
            </button>
            <button
              className="action-btn"
              data-tooltip="Statistics"
              onClick={() => navigate(`/statistics/${habit.id}`)}
            >
              <FaChartBar />
            </button>
          </div>
        </div>
      )
      ))}
 
      {showCalendar && selectedHabit && (
          <div
          className="calendar-overlay"
          onClick={(e) => {
            // Close only if clicking outside the popup
            if (e.target.classList.contains("calendar-overlay")) {
              handleCloseCalendar();
            }
          }}
        >
          <div className="calendar-popup">
            <Calendar
              habit={selectedHabit}
              updateHabit={updateHabit}
              closePopup={handleCloseCalendar}
            />
          </div>
        </div>
)}

    </div>
  );
};

export default ShowAllHabits;
