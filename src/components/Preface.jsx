import React from "react";

const Preface = () => {
  return (
    <div
      style={{
        backgroundColor: "#2C2C2C",
        color: "#FFF",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h1>Preface</h1>
      <h4>
        in this project we search about the darwinia data and we found some data
        that can show as chart and you can see them in after sections
      </h4>
      <h4>Technologys</h4>
      <p>React Js , Chart.js , React-chartjs-2</p>
      <h4>First Chart</h4>
      <p>
        in the first chart you will see data of Migration we use the data from{" "}
        <a href="https://darwinia.subscan.io/extrinsic?page=1&time_dimension=date&signed=all&module=accountmigration">
          Darwinia Data
        </a>{" "}
        and we have two number in Y first number is about Cumulative Migration
        and the Numeric range is 0 to 700. the second number is about Migration
        Count and the Numeric range is 0 to 100
      </p>
      <p>for X we have date That show data per Month</p>
      <h4>Second Chart</h4>
      <p>
        in the second Chart you will see data of Transaction we use data from{" "}
        <a href="https://explorer.darwinia.network/api-docs">Darwinia Api</a> in
        Y you can see Number of Transaction and in X you can see date
      </p>
      <h4>Third Chart</h4>
      <p>
        in the third chart you will see data of Markets we use data from{" "}
        <a href="https://explorer.darwinia.network/api-docs">Darwinia Api</a> in
        Y you can see number of Closing Price and in X you can see date{" "}
      </p>
      <h4>Forth Chart </h4>
      <p>
        in the forth chart you will see data of Transfers we use data from{" "}
        <a href="https://darwinia.subscan.io/transfer">Darwinia Transfer</a>
        and we have two number in Y first one is Transfer Amount that is located
        in the left and the second one is Total number that is located in the
        right{" "}
      </p>
      <p>for X we have date That show data per Month</p>
    </div>
  );
};

export default Preface;
