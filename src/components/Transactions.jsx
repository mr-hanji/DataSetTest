import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const Transactions = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get("https://darwinia-evm.subscan.io/api/v2/stats/charts/transactions")
      .then((res) => {
        const data = res.data;
        const labels = data.chart_data.map((item) => item.date);
        const txCounts = data.chart_data.map((item) => item.tx_count);

        setChartData({
          labels,
          datasets: [
            {
              label: "Transactions per Day",
              data: txCounts,
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
          text: "Number of Transactions",
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
      <h3 style={{ marginBottom: "60px" }}>
        This is the chart generated based on the transactions data form the
        Darwinia explorer. The charts show the number of transactions has been
        done during the time. It is a monthly chart shows the monthly number of
        transactions.
      </h3>
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Transactions;
