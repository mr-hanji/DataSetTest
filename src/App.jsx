import React, { useEffect } from "react";
import ChartDisplayDeposits from "./components/ChartDisplayDeposits";
import "./App.css";
import EmployeeChart from "./components/EmployeeChart";
import Transactions from "./components/Transactions";
import axios from "axios";
import Markets from "./components/Markets";
import Address from "./components/Address";
import Transfers from "./components/Transfers";
import Preface from "./components/Preface";
// import rawData from "./data/identities-0.json";
// import Identities from "./components/Identities";

function App() {
  return (
    <div className="App">
      <Preface />
      <EmployeeChart />
      <Transactions />
      <Markets />
      {/* <Address /> */}
      <Transfers />
    </div>
  );
}

export default App;
