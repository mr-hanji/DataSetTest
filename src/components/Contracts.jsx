// src/components/CustomChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import data from "../data/dataofContract.json";

const formatMonthYear = (timestamp) => {
  if (timestamp === 0) return "N/A";
  const date = new Date(timestamp * 1000);
  return `${date.getMonth() + 1}-${date.getFullYear()}`;
};

// Aggregate the data by month
const aggregatedData = data.data.list.reduce((acc, item) => {
  const monthYear = formatMonthYear(item.verify_time);
  if (!acc[monthYear]) {
    acc[monthYear] = 0;
  }
  acc[monthYear] += item.transaction_count;
  return acc;
}, {});

const verifyTimes = Object.keys(aggregatedData);
const transactionCounts = Object.values(aggregatedData);

const chartData = {
  labels: verifyTimes,
  datasets: [
    {
      label: "Transaction Count",
      data: transactionCounts,
      borderColor: "rgba(75,192,192,1)",
      backgroundColor: "rgba(75,192,192,0.2)",
      pointBackgroundColor: "rgba(75,192,192,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(75,192,192,1)",
    },
  ],
};

const chartOptions = {
  scales: {
    y: {
      beginAtZero: false,
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
      title: {
        display: true,
        text: "transaction count",
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

const Contracts = () => {
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
        Contracts Data
      </h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default Contracts;
