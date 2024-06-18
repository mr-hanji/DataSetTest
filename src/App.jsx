import React, { useEffect } from "react";
import ChartDisplayDeposits from "./components/ChartDisplayDeposits";
import "./App.css";
import EmployeeChart from "./components/EmployeeChart";
import Transactions from "./components/Transactions";
import axios from "axios";
import Markets from "./components/Markets";
import Address from "./components/Address";
// import rawData from "./data/identities-0.json";
// import Identities from "./components/Identities";

function App() {
  useEffect(() => {
    axios
      .get("https://darwinia-evm.subscan.io/api/v2/addresses")
      .then((res) => {
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="App">
      <EmployeeChart />
      <Transactions />
      <Markets />
      <Address />
    </div>
  );
}

export default App;
