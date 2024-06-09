import React from "react";
import { Bar } from "react-chartjs-2";

const Identities = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.displayName || item.address),
    datasets: [
      {
        label: "Deposits",
        data: data.map((item) => item.deposit / 1e15), // Adjusting for large numbers
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default Identities;
