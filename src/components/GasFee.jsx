import React from "react";
import { Line } from "react-chartjs-2";
import data from "../data/Transactions.json";

const GasFee = () => {
  // Extracting x (timestamps) and y (base_fee_per_gas) values from data
  const timestamps = data.items.map((item) => item.timestamp);
  const baseFees = data.items.map((item) => parseInt(item.fee.value));

  // Mapping timestamps to month format
  const formattedTimestamps = timestamps.map((timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleString("default", {
      month: "short",
    })} ${date.getFullYear()}`;
  });

  // Prepare data for chart
  const chartData = {
    labels: formattedTimestamps,
    datasets: [
      {
        label: "Base Fee Per Gas",
        data: baseFees,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        title: {
          display: true,
          text: "Fee",
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
          text: "Date",
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
  };

  return (
    <div
      style={{
        backgroundColor: "#2C2C2C",
        color: "#FFF",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "white" }}>
        Transaction Data
      </h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default GasFee;
