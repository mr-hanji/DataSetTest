import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const AverageGas = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [avgBlockSizeRes, newBlocksRes] = await Promise.all([
          axios.get(
            "https://darwinia-evm.subscan.io/api/v1/lines/averageGasPrice?from=2024-01-01&to=2024-06-22"
          ),
          axios.get(
            "https://darwinia-evm.subscan.io/api/v1/lines/gasUsedGrowth?from=2024-01-01&to=2024-06-22"
          ),
        ]);

        const avgBlockSizeData = avgBlockSizeRes.data.chart;
        const newBlocksData = newBlocksRes.data.chart;

        const processMonthlyData = (data) => {
          return data.reduce((acc, item) => {
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
        };

        const avgBlockSizeMonthlyData = processMonthlyData(avgBlockSizeData);
        const newBlocksMonthlyData = processMonthlyData(newBlocksData);

        const labels = Object.keys(avgBlockSizeMonthlyData);
        const avgBlockSizeValues = Object.values(avgBlockSizeMonthlyData).map(
          (item) => item.totalValue / item.count
        );
        const newBlocksValues = Object.values(newBlocksMonthlyData).map(
          (item) => item.totalValue / item.count
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "Average gas price",
              data: avgBlockSizeValues,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              pointBorderColor: "rgb(75, 192, 192)",
              pointBackgroundColor: "rgb(75, 192, 192)",
              pointRadius: 5,
              pointHoverRadius: 8,
              pointHitRadius: 10,
            },
            {
              label: "Gas used growth",
              data: newBlocksValues,
              fill: false,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              pointBorderColor: "rgb(255, 99, 132)",
              pointBackgroundColor: "rgb(255, 99, 132)",
              pointRadius: 5,
              pointHoverRadius: 8,
              pointHitRadius: 10,
            },
          ],
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
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
          text: "Average Value",
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
        Average Gas Data
      </h2>
      <h3 style={{ marginBottom: "60px" }}>
        This is the chart generated based on the migration data during the time.
        This charts consists of two line one for the Average gas price and the
        other for gas used growth from the beginning each month.
      </h3>
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AverageGas;
