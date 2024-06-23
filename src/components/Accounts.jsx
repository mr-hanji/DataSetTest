import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Ensure Chart.js is imported
import { parseISO, format } from "date-fns";
import data from "../data/dataofAccount.json";

const Accounts = () => {
  // Aggregate data by month
  const monthlyData = data.data.list.reduce((acc, item) => {
    const date = parseISO(item.time_utc);
    const month = format(date, "yyyy-MM");

    if (!acc[month]) {
      acc[month] = { total: 0, count: 0 };
    }

    acc[month].total += parseFloat(item.total);
    acc[month].count += 1;

    return acc;
  }, {});

  const labels = Object.keys(monthlyData).map((month) => {
    const [year, monthNum] = month.split("-");
    const date = new Date(year, monthNum - 1);
    return format(date, "MMM yyyy");
  });

  const totals = Object.values(monthlyData).map(
    (monthData) => monthData.total / monthData.count
  );

  // Prepare chart data
  const chartData = {
    labels,
    datasets: [
      {
        label: "Total",
        data: totals,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
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
        Accounts Data
      </h2>
      <h3 style={{ marginBottom: "60px" }}>
        This is the chart generated based on the migration data during the time.
        This charts consists of blue line that show total number of Accounts.
      </h3>
      {data ? <Line data={chartData} options={options} /> : <p>Loading...</p>}
    </div>
  );
};

export default Accounts;
