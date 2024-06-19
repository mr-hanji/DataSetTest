import React from "react";
import { Line } from "react-chartjs-2";
import data from "../data/Transactions.json";

const GasFee = () => {
  // Extracting x (timestamps) and y (base_fee_per_gas) values from data
  const transactions = data.chart;

  // Function to group transactions by month and calculate total fee per month
  const groupByMonth = () => {
    const groupedData = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!acc[monthYear]) {
        acc[monthYear] = {
          monthYear,
          totalFee: parseInt(transaction.value),
        };
      } else {
        acc[monthYear].totalFee += parseInt(transaction.value);
      }
      return acc;
    }, {});

    // Convert grouped data object to array and sort by month
    const sortedData = Object.values(groupedData).sort((a, b) => {
      const [yearA, monthA] = a.monthYear.split("-");
      const [yearB, monthB] = b.monthYear.split("-");
      return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1);
    });

    return sortedData;
  };

  // Prepare data for chart
  const chartData = {
    labels: groupByMonth().map((item) => item.monthYear),
    datasets: [
      {
        label: "Total Fee",
        data: groupByMonth().map((item) => item.totalFee),
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
        beginAtZero: true,
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
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Transaction Data Per Month
      </h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default GasFee;
