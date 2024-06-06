import React from "react";
import ChartDisplay from "./components/ChartDisplay";
import "./App.css";
import data from "./deposits-latest.json";

function App() {
  return (
    <div className="App">
      <ChartDisplay data={data} />
    </div>
  );
}

export default App;
