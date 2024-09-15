import React, { useState } from "react";
import "./index.css";

const ListStock = () => {
  const stocks = [
    { name: "AMZ", realPrice: "3000", predictedPrice: "3200" },
    { name: "APPL", realPrice: "3000", predictedPrice: "3200" },
  ];

  // Store dropdown state for each stock
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    // Toggle the dropdown for the specific stock
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleStockClick = (stock) => {
    // Handle the stock click event
    alert(`Clicked on stock: ${stock.name}`);
  };

  return (
    <div className="stock-list">
      <h3>List of Selected Stocks</h3>
      {stocks.map((stock, index) => (
        <div key={index} className="stock-item">
          <a
            href="#"
            onClick={() => handleStockClick(stock)}
            className="stockName-link"
          >
            <div>{stock.name}</div>
            <div>Real: {stock.realPrice}</div>
            <div>Predicted: {stock.predictedPrice}</div>
          </a>

          <div className="stock-menu">
            <div className="dropdown">
              <button
                onClick={() => toggleDropdown(index)}
                className="dropdown-toggle"
              >
                ...
              </button>
              {openDropdownIndex === index && (
                <ul className="dropdown-menu">
                  <li>
                    <a href="#delete">Delete</a>
                  </li>
                  <li>
                    <a href="#settings">Update</a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListStock;
