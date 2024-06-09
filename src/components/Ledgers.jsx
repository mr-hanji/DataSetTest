// StakedBalanceChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Ledgers = ({ data, title }) => {
  // Extract labels and data for the chart
  const labels = Object.keys(data);
  const stakedRingBalances = Object.values(data).map((item) =>
    parseFloat(item.stakedRing.replace(/,/g, ""))
  );
  const stakedKtonBalances = Object.values(data).map((item) =>
    parseFloat(item.stakedKton.replace(/,/g, ""))
  );

  // Chart.js data object
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Staked RING",
        data: stakedRingBalances,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Staked KTON",
        data: stakedKtonBalances,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options object
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Staked Balances (RING and KTON)",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <h2>{title}</h2>
      <Bar data={chartData} options={options} />;
    </>
  );
};

export default Ledgers;
