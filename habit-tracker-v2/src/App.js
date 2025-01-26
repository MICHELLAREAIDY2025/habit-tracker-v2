import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import AddEditHabit from "./components/AddEditHabit";
import ShowAllHabits from "./components/ShowAllHabits";
import Statistics from "./components/Statistics";
import WaveBackground from "./components/WaveBackground"; // Import the WaveBackground as the welcome page
import "./App.css";

const App = () => {
  const [habits, setHabits] = useState([]); 
  const [showFavorites, setShowFavorites] = useState(false);
 
  const getTotalDays = (startDate, endDate) => {
    const totalMillis = new Date(endDate) - new Date(startDate);
    return Math.ceil(totalMillis / (1000 * 60 * 60 * 24)) + 1;
  };
 
  const reinitializeProgress = (habit) => {
    const totalDays = getTotalDays(habit.startDate, habit.endDate);
    const newProgress = {};

    for (let i = 0; i < totalDays; i++) {
      const date = new Date(habit.startDate);
      date.setDate(date.getDate() + i);
      const formattedDate = date.toISOString().split("T")[0];
      newProgress[formattedDate] = habit.progress?.[formattedDate] || false;
    }

    return newProgress;
  };
 
  const addHabit = (newHabit) => {
    const updatedHabit = {
      ...newHabit,
      progress: reinitializeProgress(newHabit),
    };
    setHabits([...habits, updatedHabit]);
  };
 
  const editHabit = (updatedHabit) => {
    const reinitializedHabit = {
      ...updatedHabit,
      progress: reinitializeProgress(updatedHabit),
    };
    setHabits(habits.map((habit) => (habit.id === updatedHabit.id ? reinitializedHabit : habit)));
  };
 
  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };
 
  const toggleFavorite = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, isFavorite: !habit.isFavorite } : habit
      )
    );
  };

  const filteredHabits = showFavorites
    ? habits.filter((habit) => habit.isFavorite)
    : habits;

  return (
    <Router>
      <Header toggleShowFavorites={() => setShowFavorites(!showFavorites)} />
      <Routes> 
        <Route path="/welcome" element={<WaveBackground />} />
       
        <Route path="/" element={<Navigate to="/welcome" />} />
         
        <Route
          path="/habits"
          element={
            <ShowAllHabits
              habits={filteredHabits}
              deleteHabit={deleteHabit}
              toggleFavorite={toggleFavorite}
              updateHabit={editHabit}
            />
          }
        />
        <Route
          path="/add-edit/:id?"
          element={<AddEditHabit habits={habits} addHabit={addHabit} editHabit={editHabit} />}
        />
        <Route path="/statistics/:id" element={<Statistics habits={habits} />} />
      </Routes>
    </Router>
  );
};

export default App;
