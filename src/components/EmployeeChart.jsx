import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import data from "../data/data.json";

const MigrationCharts = () => {
  // Extract months and count migrations for each month
  const months = [];
  const migrationCounts = [];
  let totalMigrations = 0;
  const cumulativeMigrationsData = [];

  // Helper function to format the date as YYYY-MM (for month aggregation)
  const getMonth = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };

  // Process data to count migrations per month and accumulate totals
  data.Employees.Employee.forEach((employee) => {
    const month = getMonth(employee["Block Timestamp"]); // Extract month part
    const count = 1; // Assuming each entry represents one migration

    // Count migrations per month
    if (!months.includes(month)) {
      months.push(month);
      migrationCounts.push(count);
    } else {
      const index = months.indexOf(month);
      migrationCounts[index] += count;
    }
  });

  // Calculate cumulative migrations data
  migrationCounts.forEach((count, index) => {
    if (index === 0) {
      cumulativeMigrationsData.push(count);
    } else {
      cumulativeMigrationsData.push(
        cumulativeMigrationsData[index - 1] + count
      );
    }
  });

  // State to track which dataset is being displayed
  const [currentDataset, setCurrentDataset] = useState("migrationCounts");

  // Determine maximum y-axis value based on current dataset
  let maxY;
  if (currentDataset === "migrationCounts") {
    maxY = 100;
  } else if (currentDataset === "cumulativeMigrationsData") {
    maxY = 700;
  }

  // Prepare data for line chart
  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Migrations per Month",
        data: migrationCounts,
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        pointBorderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHitRadius: 10,
        hidden: currentDataset !== "migrationCounts", // Hide if not current dataset
      },
      {
        label: "Cumulative Migrations",
        data: cumulativeMigrationsData,
        fill: false,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        pointBorderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHitRadius: 10,
        hidden: currentDataset !== "cumulativeMigrationsData", // Hide if not current dataset
      },
    ],
  };

  return (
    <div
      style={{
        backgroundColor: "#2C2C2C",
        color: "#FFF",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "white" }}>
        Employee Migration Data
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setCurrentDataset("migrationCounts")}
          style={buttonStyle}
        >
          Show Migration Counts
        </button>
        <button
          onClick={() => setCurrentDataset("cumulativeMigrationsData")}
          style={buttonStyle}
        >
          Show Cumulative Migrations
        </button>
      </div>
      <Line
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              min: 0,
              max: maxY, // Dynamic maximum based on current dataset
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
              title: {
                display: true,
                text: "Number of Migrations",
                font: {
                  size: 16,
                  color: "#FFF",
                },
              },
              ticks: {
                color: "#FFF",
              },
            },
            x: {
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
              title: {
                display: true,
                text: "Month",
                font: {
                  size: 16,
                  color: "#FFF",
                },
              },
              ticks: {
                color: "#FFF",
              },
            },
          },
          plugins: {
            legend: {
              position: "top",
              labels: {
                font: {
                  size: 14,
                  color: "#FFF",
                },
                usePointStyle: true,
              },
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              titleFont: {
                size: 16,
                color: "#FFF",
              },
              bodyFont: {
                size: 14,
                color: "#FFF",
              },
              bodySpacing: 4,
              padding: 10,
            },
          },
        }}
      />
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "rgb(75, 192, 192)",
  color: "white",
  border: "none",
  padding: "10px 20px",
  margin: "0 10px",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "16px",
};

export default MigrationCharts;
