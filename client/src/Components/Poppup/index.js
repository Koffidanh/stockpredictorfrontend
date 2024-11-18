import React, { useState } from "react";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import ViewListPredict from "../ViewListPredict"; // Import the graph component
import "./index.css";

const Poppup = () => {
  return (
    <div className="stock-list">
      <h3>List of Selected Stocks</h3>
      <p>Trained on: {listOfChoosenStocksObjects[0]?.last_trained}</p>
      <hr />
      {listOfChoosenStocksObjects?.map((stock, index) => {
        const actualPrices = stock.actual.map((price) =>
          parseFloat(price.$numberDecimal)
        );
        const predictedPrices = stock.predictions.map((price) =>
          parseFloat(price.$numberDecimal)
        );

        const buyPrices = stock.buy_signals.map(
          (price) => parseFloat(price.$numberDecimal).toFixed(3) // Format to 3 decimal places
        );

        const sellPrices = stock.sell_signals.map(
          (price) => parseFloat(price.$numberDecimal).toFixed(3) // Format to 3 decimal places
        );

        const lastBuyPrice = buyPrices[buyPrices.length - 1]; // Last buy price
        const lastSellPrice = sellPrices[sellPrices.length - 1]; // Last sell price
        // Get the last predicted price
        const lastPredictedPrice = predictedPrices[predictedPrices.length - 1];

        const { high, low } = getHighLowPrices(stock.actual);

        return (
          <div key={index} className="stock-item">
            <a
              href="#"
              onClick={() => handleStockClick(stock)} // Set selected stock on click
              className="stockName-link"
            >
              <div>Ticker: {stock.ticker}</div>
              <div>Real: {actualPrices[actualPrices.length - 1]}</div>
              <div>Predicted: {lastPredictedPrice}</div>
              <div>High: {high}</div>
              <div>Low: {low}</div>
              <div>
                Buy:
                {lastBuyPrice}
              </div>
              <div>Sell: {lastSellPrice}</div>
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
        );
      })}

      {/* Render the ViewListPredict component when a stock is selected */}
      {/* {selectedStock && <ViewListPredict selectedStock={selectedStock} />} */}
    </div>
  );
};

export default Poppup;
