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
 
  useEffect(() => {
    if (habit) {
      const getTotalDays = (startDate, endDate) => {
        const totalMillis = new Date(endDate) - new Date(startDate);
        return Math.ceil(totalMillis / (1000 * 60 * 60 * 24)) + 1;
      };
  
      const totalDays = getTotalDays(habit.startDate, habit.endDate);
      const progress = { ...habit.progress };
  
      for (let i = 0; i < totalDays; i++) {
        const date = new Date(habit.startDate);
        date.setDate(date.getDate() + i);
        const formattedDate = date.toISOString().split("T")[0];
  
        if (!(formattedDate in progress)) {
          progress[formattedDate] = false;
        }
      }
  
      setLocalProgress(progress);
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
  const getTextColor = (bgColor) => {
    const hex = bgColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
    return brightness > 128 ? "#000" : "#fff";
  };
  
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
              style={{
                backgroundColor: isCompleted ? habit.color : "#eee",
                "--text-color": isCompleted ? getTextColor(habit.color) : "#333",
              }}
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
