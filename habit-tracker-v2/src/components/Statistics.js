import React from "react"; // Import React for component creation
import { useParams } from "react-router-dom"; // Import useParams to extract dynamic route parameters
import { Doughnut } from "react-chartjs-2"; // Import the Doughnut chart component
import "chart.js/auto"; // Automatically registers required Chart.js components
import "./Statistics.css"; // Import CSS for styling the Statistics component

// Statistics component: Displays progress statistics for a specific habit
const Statistics = ({ habits }) => {
  const { id } = useParams(); // Extract the habit ID from the URL
  const habit = habits.find((h) => h.id === parseInt(id)); // Find the habit with the matching ID in the habits array

  // If no habit matches the ID, display an error message
  if (!habit) {
    return <p class="notfound">Habit not found</p>;
  }

  // Extract habit progress and color from the habit object
  const { progress, color } = habit;
  console.log(habit); // Log the habit data for debugging

  // Calculate the number of completed days by filtering true values in the progress object
  const completedDays = Object.values(progress).filter((status) => status === true).length;

  // Calculate the total number of days by counting keys in the progress object
  const totalDays = Object.keys(progress).length;

  // Calculate the number of uncompleted days
  const uncompletedDays = totalDays - completedDays;

  // Calculate the percentage of completed and uncompleted days
  const completedPercentage = ((completedDays / totalDays) * 100).toFixed(1); // Rounded to 1 decimal place
  const uncompletedPercentage = (100 - completedPercentage).toFixed(1); // Remaining percentage for uncompleted days

  // Prepare data for the Doughnut chart
  const data = {
    labels: ["Completed", "Uncompleted"], // Labels for the chart sections
    datasets: [
      {
        data: [completedDays, uncompletedDays], // Data values: completed and uncompleted days
        backgroundColor: [color, "#D3D3D3"], // Colors: habit's color for completed, grey for uncompleted
        hoverBackgroundColor: [color, "#A9A9A9"], // Colors when hovering
        borderWidth: 0, // No border for chart sections
      },
    ],
  };

  // Options for customizing the Doughnut chart
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          // Custom tooltip to show the number of days for each section
          label: (context) => `${context.label}: ${context.raw} days`,
        },
      },
    },
    maintainAspectRatio: false, // Allow chart to adjust its size
    responsive: true, // Ensure the chart is responsive
    cutout: "70%", // Size of the donut hole (makes it a ring)
  };

  // Render the statistics section
  return (
    <div className="statistics-container"> {/* Main container for the statistics */}
      <h2>{habit.title} - Statistics</h2> {/* Display the habit title with "Statistics" */}
      <div className="chart-wrapper"> {/* Container for the chart */}
        <Doughnut data={data} options={options} /> {/* Render the Doughnut chart with data and options */}
      </div>
      
      <p class="indicator_completed">
        Completed: {completedDays}/{totalDays} days ({completedPercentage}%)
      </p> {/* Show completed days count and percentage */}
      <p class="indicator_uncompleted">
        Uncompleted: {uncompletedDays}/{totalDays} days ({uncompletedPercentage}%)
      </p> {/* Show uncompleted days count and percentage */}
    
    </div>
  );
};

export default Statistics; // Export the Statistics component for use in other parts of the app