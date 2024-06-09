import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const Accounts0 = ({ data, title }) => {
  // Extract labels and data for the chart
  const labels = Object.keys(data);
  const freeBalances = labels.map(
    (address) => parseFloat(data[address].data.free) / 1e18
  ); // Convert from wei to ether

  // Chart.js data object
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Free Balance (ETH)",
        data: freeBalances,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options object
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div>
      <h2>{title}</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default Accounts0;
