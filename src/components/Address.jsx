import React, { useEffect, useState } from "react";
import axios from "axios";

const AddressList = () => {
  const [addressData, setAddressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get("https://darwinia-evm.subscan.io/api/v2/addresses") // Replace with the correct API endpoint for addresses
      .then((res) => {
        setAddressData(res.data.items);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = addressData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(addressData.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        Address Data
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: "#FFF",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#444" }}>
                <th style={{ padding: "10px", color: "#FFF" }}>Hash</th>
                <th style={{ padding: "10px", color: "#FFF" }}>Coin Balance</th>
                <th style={{ padding: "10px", color: "#FFF" }}>
                  Transaction Count
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#333" : "#2C2C2C",
                    borderBottom: "1px solid #444",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#555")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      index % 2 === 0 ? "#333" : "#2C2C2C")
                  }
                >
                  <td style={{ padding: "10px", color: "#FFF" }}>
                    {item.hash}
                  </td>
                  <td style={{ padding: "10px", color: "#FFF" }}>
                    {item.coin_balance}
                  </td>
                  <td style={{ padding: "10px", color: "#FFF" }}>
                    {item.tx_count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handleClick(index + 1)}
                style={{
                  padding: "10px",
                  margin: "0 5px",
                  backgroundColor: currentPage === index + 1 ? "#555" : "#444",
                  color: "#FFF",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AddressList;
