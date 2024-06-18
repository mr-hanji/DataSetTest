import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import data from "../data/dataoftransfers.json";
import { format, parseISO } from "date-fns";

const Transfers = () => {
  const [isTotalScaleAdjusted, setIsTotalScaleAdjusted] = useState(false);

  // Aggregate data by month
  const aggregatedData = data.data.list.reduce((acc, item) => {
    const date = parseISO(item.time_utc);
    const month = format(date, "yyyy-MM");

    if (!acc[month]) {
      acc[month] = { transfer_amount: 0, total: 0 };
    }
    acc[month].transfer_amount += parseFloat(item.transfer_amount);
    acc[month].total += parseInt(item.total, 10);

    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(aggregatedData), // Use the aggregated month keys as labels
    datasets: [
      {
        label: "Transfer Amount",
        data: Object.values(aggregatedData).map((item) => item.transfer_amount), // Use the aggregated transfer amounts
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.1,
        yAxisID: "y",
      },
      {
        label: "Total Number",
        data: Object.values(aggregatedData).map((item) => item.total), // Use the aggregated total numbers
        borderColor: "rgba(192, 75, 192, 1)",
        backgroundColor: "rgba(192, 75, 192, 0.2)",
        fill: true,
        tension: 0.1,
        yAxisID: "y1",
      },
    ],
  };

  // Chart.js options
  const options = {
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        title: {
          display: true,
          text: "Transfer Amount",
          font: {
            size: 16,
            color: "#FFF",
          },
        },
        ticks: {
          color: "#FFF",
        },
      },
      y1: {
        beginAtZero: true,
        position: "right",
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        title: {
          display: true,
          text: "Total Number",
          font: {
            size: 16,
            color: "#FFF",
          },
        },
        ticks: {
          color: "#FFF",
          max: isTotalScaleAdjusted ? 30 : undefined,
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
        onClick: (e, legendItem, legend) => {
          if (legendItem.text === "Total Number") {
            setIsTotalScaleAdjusted(!isTotalScaleAdjusted);
          } else {
            const index = legend.chart.data.datasets.findIndex(
              (dataset) => dataset.label === legendItem.text
            );
            const meta = legend.chart.getDatasetMeta(index);

            // Toggle the visibility
            meta.hidden =
              meta.hidden === null
                ? !legend.chart.data.datasets[index].hidden
                : null;
            legend.chart.update();
          }
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
      {data ? <Line data={chartData} options={options} /> : <p>Loading...</p>}
    </div>
  );
};

export default Transfers;
