import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./Calendar.css";

const NoteSentence = () => {
  return (
    <div className="typewriter">Tap a day to mark it done ! </div>
  );
};

const Calendar = ({ habit, updateHabit, closePopup }) => {
  const [localProgress, setLocalProgress] = useState({});
console.log("aa"+ habit);
  
  const getTotalDays = (startDate, endDate) => {
    const totalMillis = new Date(endDate) - new Date(startDate);
    return Math.ceil(totalMillis / (1000 * 60 * 60 * 24)) + 1;
  };
 
  const initializeProgress = (startDate, endDate, currentProgress) => {
    const totalDays = getTotalDays(startDate, endDate);
    const progress = { ...currentProgress };

    for (let i = 0; i < totalDays; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const formattedDate = date.toISOString().split("T")[0];

      if (!(formattedDate in progress)) {
        progress[formattedDate] = false;  
      }
    }

    return progress;
  };
 
  useEffect(() => {
    if (habit) {
      const reinitializedProgress = initializeProgress(
        habit.startDate,
        habit.endDate,
        habit.progress
      );
      setLocalProgress(reinitializedProgress);
    }
  }, [habit]);
 
  const markDayComplete = (date) => {
    const formattedDate = date.toISOString().split("T")[0];

    const updatedProgress = {
      ...localProgress,
      [formattedDate]: !localProgress[formattedDate],
    };

    setLocalProgress(updatedProgress);

    
    updateHabit({ ...habit, progress: updatedProgress });
  };
 
  const totalDays = getTotalDays(habit.startDate, habit.endDate);
  const dates = Array.from({ length: totalDays }, (_, i) => {
    const date = new Date(habit.startDate);
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <div className="calendar">
      <button className="close-btn" onClick={closePopup}>
        <FaTimes />
      </button>
      <h2>{habit.title} - Calendar</h2>
 
      <NoteSentence />

      <div className="day-slider">
        {dates.map((date, index) => {
          const formattedDate = date.toISOString().split("T")[0];
          const isCompleted = localProgress[formattedDate];

          return (
            <div
              key={index}
              className={`day-card ${isCompleted ? "completed" : ""}`}
              style={{ backgroundColor: isCompleted ? habit.color : "#eee" }}
              onClick={() => markDayComplete(date)} 
            >
              <p>{date.toLocaleDateString("en-US", { weekday: "short" })}</p>
              <p>{date.getDate()}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
