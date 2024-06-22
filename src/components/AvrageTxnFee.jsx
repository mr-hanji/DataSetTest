import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const AvrageTxnFee = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://darwinia-evm.subscan.io/api/v1/lines/averageTxnFee?from=2023-01-01&to=2024-06-22"
      )
      .then((res) => {
        const data = res.data;

        // Process the data to group by month and calculate average
        const monthlyData = data.chart.reduce((acc, item) => {
          const date = new Date(item.date);
          const month = date.getMonth() + 1; // getMonth() is zero-based
          const year = date.getFullYear();
          const key = `${year}-${month < 10 ? `0${month}` : month}`;

          if (!acc[key]) {
            acc[key] = {
              totalValue: 0,
              count: 0,
            };
          }

          acc[key].totalValue += parseFloat(item.value);
          acc[key].count += 1;

          return acc;
        }, {});

        const labels = Object.keys(monthlyData);
        const avgTxCounts = Object.values(monthlyData).map(
          (item) => item.totalValue / item.count
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "Average Transaction Fee per Month",
              data: avgTxCounts,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              pointBorderColor: "rgb(75, 192, 192)",
              pointBackgroundColor: "rgb(75, 192, 192)",
              pointRadius: 5,
              pointHoverRadius: 8,
              pointHitRadius: 10,
            },
          ],
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        title: {
          display: true,
          text: "Average Transaction Fee",
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
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "white" }}>
        Average Transaction Data
      </h2>
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AvrageTxnFee;
