import React from "react";
import ChartDisplayDeposits from "./components/ChartDisplayDeposits";
import "./App.css";
import depositsLatestData from "./data/deposits-latest.json";
import depositsData from "./data/deposits-0.json";
import Accounts0 from "./components/Accounts-0";
import Account0Data from "./data/accounts-0.json";
import AccountLatestData from "./data/accounts-latest.json";
import KtonAccounts from "./components/KtonAccounts";
import KtonAccountsData from "./data/kton-accounts-0.json";
import KtonAccountsLatestData from "./data/kton-accounts-latest.json";
import Ledgers from "./components/Ledgers";
import LedgersData from "./data/ledgers-0.json";
import LedgersLatestData from "./data/ledgers-0.json";
import EmployeeChart from "./components/EmployeeChart";
// import rawData from "./data/identities-0.json";
// import Identities from "./components/Identities";

function App() {
  // // Transform data
  // const transformedData = Object.keys(rawData).map((key) => {
  //   const {
  //     deposit,
  //     info: {
  //       display: { Raw: displayName },
  //     },
  //   } = rawData[key];
  //   return {
  //     address: key,
  //     deposit: parseFloat(deposit.replace(/,/g, "")),
  //     displayName,
  //   };
  // });
  return (
    <div className="App">
      {/* <ChartDisplayDeposits data={depositsLatestData} title="deposits Latest" />
      <ChartDisplayDeposits data={depositsData} title="deposits-0" />
      <Accounts0 data={Account0Data} title="Account0" />
      <Accounts0 data={AccountLatestData} title="Account Latest" /> */}
      {/* <Identities data={transformedData} /> */}
      {/* <KtonAccounts data={KtonAccountsData} title="Kton Accounts" />
      <KtonAccounts data={KtonAccountsLatestData} title="Kton Accounts Lates" />
      <Ledgers data={LedgersData} title="Ledgers-0" />
      <Ledgers data={LedgersLatestData} title="Ledgers Latest" /> */}
      <EmployeeChart />
    </div>
  );
}

export default App;
