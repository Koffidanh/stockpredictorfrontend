// export default ListStock;

import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import ViewListPredict from "../ViewListPredict"; // Import the graph component
import { useAuth } from "../../Contexts/AuthContext/index"; // Import useAuth
import "./index.css";
import { API } from "../../utils/API";

const ListStock = () => {
  const [error, setError] = useState("");
  const { updatePhotoURL, currentUser } = useAuth();
  const {
    listOfChoosenStocksObjects,
    updateStockSelected,
    selectedStock,
    deleteStockData,
    objectDatas,
    removeFromPastList,
  } = useGlobalContext();

  // Store dropdown state for each stock
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    // Toggle the dropdown for the specific stock
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  // useEffect(() => {
  //   console.log("stockDataobjectDatas:", objectDatas);
  // }, [objectDatas]);

  const handleStockClick = (stock) => {
    // Handle the stock click event and set selected stock
    updateStockSelected(stock); // Set the selected stock to display its graph
  };

  const getHighLowPrices = (actualPrices) => {
    const prices = actualPrices?.map((price) =>
      parseFloat(price.$numberDecimal)
    );
    const high = Math.max(...prices);
    const low = Math.min(...prices);
    return { high, low };
  };

  const deleteStock = async (selectedStock) => {
    if (!selectedStock) {
      setError("Please select a stock.");
      return;
    }

    try {
      // console.log("selectedtodelete: ", selectedStock);
      // Remove the stock from the local state
      await removeFromPastList(selectedStock);
      await deleteStockData(selectedStock);

      // Call the backend API to remove the stock from the database
      const response = await API.updateUser({
        deleteStock: true,
        uid: currentUser.uid,
        stockTicker: selectedStock.ticker,
      });

      if (response.status === 200) {
        // console.log("Stock removed from user list in database:", selectedStock);
      } else {
        setError("Failed to remove stock from the database.");
      }
    } catch (err) {
      console.error("Error updating user data:", err);
      setError("Failed to delete stock.");
    }
  };

  return (
    <div className="stock-list">
      <h3>List of Selected Stocks</h3>
      <p>Trained on: {objectDatas[0]?.last_trained}</p>
      <hr />
      {objectDatas?.map((stock, index) => {
        const actualPrices = stock.actual?.map((price) =>
          parseFloat(price.$numberDecimal)
        );
        const predictedPrices = stock.predictions?.map((price) =>
          parseFloat(price.$numberDecimal)
        );

        const buyPrices = stock.buy_signals?.map(
          (price) => parseFloat(price.$numberDecimal).toFixed(3) // Format to 3 decimal places
        );

        const sellPrices = stock.sell_signals?.map(
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
                      <a href="#delete" onClick={() => deleteStock(stock)}>
                        Delete
                      </a>
                    </li>
                    {/* <li>
                      <a href="#settings">Update</a>
                    </li> */}
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

export default ListStock;
