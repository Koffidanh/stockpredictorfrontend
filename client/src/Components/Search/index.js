import React, { useState, useEffect } from "react";
import { API } from "../../utils/API";
import { useAuth } from "../../Contexts/AuthContext/index"; // Import useAuth
import { useGlobalContext } from "../../Contexts/GlobalContext";
import "./index.css";

const Search = () => {
  const [stockName, setStockName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pastDrop, setPastDrop] = useState("");
  const [error, setError] = useState("");
  // const [stockData, setStockData] = useState();
  const { updatePhotoURL, currentUser } = useAuth();
  const { stockData, updateStockData, appendToList } = useGlobalContext();

  useEffect(() => {
    updateStockData(stockData);
  }, [stockData]);

  useEffect(() => {
    console.log("stockData from search: ", stockData);
  }, [stockData]);

  // combine filtered_actual_Predictions
  function combineDataWithStockData(filtered_actual_Predictions) {
    return filtered_actual_Predictions
      .map((entry, index) => {
        // Ensure entry.actual exists and has the $numberDecimal property
        const actualPrice = entry.actual?.$numberDecimal
          ? parseFloat(entry.actual.$numberDecimal)
          : null;

        // Ensure entry.predicted exists and has the $numberDecimal property
        const predictedPrice = entry.predicted?.$numberDecimal
          ? parseFloat(entry.predicted.$numberDecimal)
          : null;

        return {
          index: index, // Index from the filtered data
          date: entry.date, // Include date for reference
          actual: actualPrice, // Parsed actual price
          predicted: predictedPrice, // Parsed predicted price
        };
      })
      .filter((entry) => entry.realPrice !== null); // Filter out entries with no valid price
  }

  // useEffect(() => {
  //   console.log("Combined Actual Prices:", combinedActualPrices);
  // }, [combineDataWithStockData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stockName) {
      setError("Please select a stock.");
      return;
    }

    try {
      setError(null); // Clear previous errors

      // Get stock data by name
      const response = await API.getStockByName(stockName);

      let stockData = response.data;

      appendToList(stockData);

      // If startDate and endDate are provided, filter the data between those dates
      if (startDate && endDate) {
        const dbStartDate = new Date(stockData[0].startDate);
        const dbEndDate = new Date(stockData[0].endDate);

        const userStartDate = new Date(startDate);
        userStartDate.setDate(userStartDate.getDate() + 1);
        // console.log("Type of startDate1: ", typeof startDate);
        // console.log("Type of dbStartDate: ", typeof dbStartDate);

        const userEndDate = new Date(endDate);
        userEndDate.setDate(userEndDate.getDate() + 1);

        console.log("userStartDate:", userStartDate);
        console.log("type userStartDate:", typeof userStartDate);
        console.log("userEndDate:", userEndDate);
        console.log("type userEndDate:", typeof userEndDate);
        console.log("dbStartDate:", dbStartDate);
        console.log("type dbStartDate:", typeof dbStartDate);
        console.log("dbEndDate:", dbEndDate);
        console.log("type dbEndDate:", typeof dbEndDate);
        console.log("stockData:", stockData);
        console.log("typenstockData:", typeof stockData);

        console.log(
          "true: ",
          userStartDate >= dbStartDate && userEndDate <= dbEndDate
        );

        if (userStartDate >= dbStartDate && userEndDate <= dbEndDate) {
          console.log("Date features");
          // Check if actual_predictions_2D exists in stockData
          if (stockData[0].actual_predictions_2D) {
            const filtered_actual_Predictions =
              stockData[0].actual_predictions_2D.filter((entry) => {
                const entryDate = new Date(entry.date); // Convert entry date to Date object
                return entryDate >= userStartDate && entryDate <= userEndDate;
              });

            console.log("Filtered Predictions:", filtered_actual_Predictions);
            // combinedActualPrices(filtered_actual_Predictions);
            // updateStockData(filtered_actual_Predictions);
            updateStockData(
              combineDataWithStockData(filtered_actual_Predictions)
            );
            console.log(
              "Combined Actual Prices:",
              combineDataWithStockData(filtered_actual_Predictions)
            );
            // return filteredPredictions;
          } else {
            throw new Error("actual_predictions_2D not found in stockData.");
          }
        } else {
          console.log("Full Stock Data:", stockData);
        }
      } else if (!startDate && !endDate) {
        // Update the stock data in the frontend
        updateStockData(stockData);
      }

      // Get the current user's data from the database
      const userResponse = await API.getUser(currentUser.uid);
      const { listOfStocks = [] } = userResponse.data;

      // Check if the stock is already in the user's list
      if (!listOfStocks.includes(stockName)) {
        // Add the new stock to the list
        const updatedStocks = [...listOfStocks, stockName]; // Create a new array with the new stock
        await API.updateUser({
          uid: currentUser.uid,
          listOfStocks: updatedStocks, // Update with the new array
        });
        console.log("Added Stock to database:", stockName);
      } else {
        setError("Stock already in your list.");
      }
    } catch (err) {
      console.error("Error updating user data:", err);
      setError("Failed to update your stock list. Please try again.");
    }
  };

  useEffect(() => {
    if (pastDrop === "") {
      setStartDate("");
      setEndDate("");
    } else {
      switch (pastDrop) {
        case "10":
          setStartDate("2000-03-02");
          setEndDate("2002-10-01");
          break;
        case "20":
          setStartDate("2007-12-01");
          setEndDate("2009-06-01");
          break;
        case "30":
          setStartDate("2020-02-01");
          setEndDate("2021-01-01");
          break;
        default:
          setStartDate("");
          setEndDate("");
      }
    }
  }, [pastDrop]);

  return (
    <div className="search-container">
      <h2>Search Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Stock Name:
          <select
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
          >
            <option value="">Pick a Stock</option>
            {[
              { ticker: "AAPL", name: "APPLE" },
              { ticker: "MSFT", name: "MICROSOFT" },
              { ticker: "GOOGL", name: "GOOGLE" },
              { ticker: "AMZN", name: "AMAZON" },
              { ticker: "BRK-A", name: "BERKSHIRE HATHAWAY" },
              { ticker: "V", name: "VISA" },
              { ticker: "WMT", name: "WALMART" },
              { ticker: "SPY", name: "S&P 500 TRUST ETF" },
              { ticker: "AAL", name: "AMERICAN AIRLINES" },
              { ticker: "AAT", name: "AMERICAN ASSETS TRUST" },
              { ticker: "ABNB", name: "AIRBNB" },
              { ticker: "ACM", name: "AECOM" },
              { ticker: "ADBE", name: "ADOBE" },
              { ticker: "ALV", name: "ALLIANZ" },
              { ticker: "ALVO", name: "ALVOPETRO" },
              { ticker: "TROX", name: "TRONOX" },
              { ticker: "NTDOY", name: "NINTENDO" },
              { ticker: "SONY", name: "SONY" },
              { ticker: "AMD", name: "ADVANCED MICRO DEVICES" },
              { ticker: "DAL", name: "DELTA AIRLINES" },
              { ticker: "ORCL", name: "ORACLE" },
              { ticker: "MU", name: "MICRON TECHNOLOGY" },
              { ticker: "SFTBY", name: "SOFTBANK" },
              { ticker: "GPRO", name: "GOPRO" },
              { ticker: "RCL", name: "ROYAL CARIBBEAN" },
              { ticker: "AIV", name: "AMERICAN INDUST" },
              { ticker: "RSKD", name: "RISKED" },
              { ticker: "BAC", name: "BANK OF AMERICA" },
              { ticker: "METV", name: "METLIFE" },
              { ticker: "META", name: "META PLATFORMS" },
              { ticker: "NLY", name: "ANNALY CAPITAL MANAGEMENT" },
              { ticker: "XOM", name: "EXXON MOBIL" },
              { ticker: "IJR", name: "ISHARES RUSSELL 2000 ETF" },
              { ticker: "VWO", name: "VANGUARD EMERGING MARKETS ETF" },
              { ticker: "STIP", name: "ISHARES 0-5 YEAR TIPS BOND ETF" },
              { ticker: "SPMO", name: "SPDR S&P 500 MOMENTUM ETF" },
              { ticker: "VEA", name: "VANGUARD DEVELOPED MARKETS ETF" },
              { ticker: "SPHQ", name: "S&P 500 HIGH QUALITY ETF" },
              { ticker: "IVV", name: "ISHARES CORE S&P 500 ETF" },
              { ticker: "BND", name: "VANGUARD TOTAL BOND MARKET ETF" },
              { ticker: "DIS", name: "WALT DISNEY" },
              { ticker: "NFLX", name: "NETFLIX" },
              { ticker: "NVDA", name: "NVIDIA" },
              { ticker: "QQQ", name: "INVESCO QQQ TRUST" },
              { ticker: "TSLA", name: "TESLA" },
              { ticker: "BTC-USD", name: "BITCOIN" },
              { ticker: "ETH-USD", name: "ETHEREUM" },
            ]
              .sort((a, b) => a.name.localeCompare(b.name)) // Sorting alphabetically by name
              .map((stock) => (
                <option key={stock.ticker} value={stock.ticker}>
                  {stock.name}
                </option>
              ))}
          </select>
        </label>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        {/* <label>
          Past Recessions:
          <select
            value={pastDrop}
            onChange={(e) => setPastDrop(e.target.value)}
          >
            <option value="">Select Past Recessions</option>
            <option value="10">DOT_COM_BUBBLE</option>
            <option value="20">GREAT_RECESSION</option>
            <option value="30">COVID_RECESSION</option>
          </select>
        </label> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Search;
