// BalanceChart.js
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

const KtonAccounts = ({ data, title }) => {
  // Extract labels and data for the chart
  const labels = Object.keys(data);
  const balances = Object.values(data).map((item) =>
    parseFloat(item.balance.replace(/,/g, ""))
  );

  // Chart.js data object
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Balance",
        data: balances,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
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
        text: "Account Balances",
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

export default KtonAccounts;
