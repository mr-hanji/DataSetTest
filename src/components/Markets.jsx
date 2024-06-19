import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const Markets = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("https://darwinia-evm.subscan.io/api/v2/stats/charts/market")
      .then((res) => {
        const labels = res.data.chart_data.map((item) => item.date);
        const closingPrices = res.data.chart_data.map((item) =>
          parseFloat(item.closing_price)
        );
        setData({
          labels,
          datasets: [
            {
              label: "Closing Price",
              data: closingPrices,
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
        beginAtZero: false,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        title: {
          display: true,
          text: "Closing Price",
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
        Markets Data
      </h2>
      <h3 style={{ marginBottom: "60px" }}>
        This is the chart generated for representing the price growth over the
        time. You can see in each month who much the price has been changed
        according to the past one. The data for this chart has been got from the
        Darwinia explorer Rest API.
      </h3>
      {data ? <Line data={data} options={options} /> : <p>Loading...</p>}
    </div>
  );
};

export default Markets;
