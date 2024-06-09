import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const ChartDisplay = ({ data, title }) => {
  const addresses = Object.keys(data);
  const values = addresses.map((address) => {
    return data[address].reduce(
      (sum, record) => sum + parseFloat(record.value.replace(/,/g, "")),
      0
    );
  });

  const chartData = {
    labels: addresses,
    datasets: [
      {
        label: "Total Value",
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString(); // format the tick labels
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.dataset.label + ": " + context.raw.toLocaleString(); // format the tooltip labels
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>{title}</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartDisplay;
