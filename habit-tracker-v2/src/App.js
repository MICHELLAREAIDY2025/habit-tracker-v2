import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
//import Header from "./components/Header";
//import AddEditHabit from "./components/AddEditHabit";
//import ShowAllHabits from "./components/ShowAllHabits";
//import Statistics from "./components/Statistics";
//import WaveBackground from "./components/WaveBackground"; // Import the WaveBackground as the welcome page
import "./App.css";

const App = () => {
  const [habits, setHabits] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const addHabit = (newHabit) => {
    setHabits([...habits, newHabit]);
  };

  const editHabit = (updatedHabit) => {
    setHabits(habits.map((habit) => (habit.id === updatedHabit.id ? updatedHabit : habit)));
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
/*
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
  );*/
};

export default App;
