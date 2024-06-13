import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BlockchainData = () => {
  const [latestBlock, setLatestBlock] = useState(null);
  const [timestamps, setTimestamps] = useState([]);
  const [blockNumbers, setBlockNumbers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlockchainData = async () => {
      try {
        const apiKey = "QXYZ4WDIBBRGSQ2JXAKHTPEDRY7BCFWAYI";
        const baseUrl = "https://api.etherscan.io/api";

        // Initialize data arrays
        const fetchedTimestamps = [];
        const fetchedBlockNumbers = [];

        for (let i = 0; i < 50; i++) {
          // Fetch data for the last 10 blocks
          // Get the latest block number
          let response = await axios.get(
            `${baseUrl}?module=proxy&action=eth_blockNumber&apikey=${apiKey}`
          );
          const latestBlockNumber = parseInt(response.data.result, 16) - i;

          // Get block details
          response = await axios.get(
            `${baseUrl}?module=proxy&action=eth_getBlockByNumber&tag=${latestBlockNumber.toString(
              16
            )}&boolean=true&apikey=${apiKey}`
          );
          const block = response.data.result;

          // Extract and format timestamp
          const blockTimestamp = new Date(block.timestamp * 1000); // Convert to milliseconds
          fetchedTimestamps.push(blockTimestamp.toLocaleString());
          fetchedBlockNumbers.push(latestBlockNumber);

          // Set latest block on first iteration
          if (i === 0) {
            setLatestBlock(latestBlockNumber);
          }
        }

        // Update state with fetched data
        setTimestamps(fetchedTimestamps.reverse());
        setBlockNumbers(fetchedBlockNumbers.reverse());
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBlockchainData();
  }, []);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "Block Numbers",
        data: blockNumbers,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Timestamp",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Block Number",
        },
      },
    },
  };

  return (
    <div>
      <h1>Ethereum Blockchain Data</h1>
      {error && <p>Error: {error}</p>}
      {latestBlock && (
        <div>
          <h2>Latest Block: {latestBlock}</h2>
          <Line data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default BlockchainData;
