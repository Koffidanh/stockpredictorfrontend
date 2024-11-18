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
  const { stockData, updateStockData } = useGlobalContext();

  useEffect(() => {
    updateStockData(stockData);
  }, [stockData]);

  // // Handle form submission to make API call
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!stockName) {
  //     setError("Please select a stock.");
  //     return;
  //   }

  //   try {
  //     setError(null); // Clear previous errors

  //     // Get stock data by name
  //     const response = await API.getStockByName(stockName);

  //     let stockData = response.data;

  //     // If startDate and endDate are provided, filter the data between those dates
  //     if (startDate && endDate && stockData["starDate"] <= startDate && stockData["endDate"] >= stockData) {
  //       const start = new Date(startDate);
  //       const end = new Date(endDate);

  //       stockData = stockData.filter((entry) => {
  //         const entryDate = new Date(entry.date); // Assuming `entry.date` holds the stock's date
  //         return entryDate >= start && entryDate <= end;
  //       });

  //       console.log("Filtered Stock Data:", stockData);
  //     } else {
  //       console.log("Full Stock Data:", stockData);
  //     }

  //     // Update the stock data
  //     updateStockData(stockData);

  //     // Get the current user's data from the database
  //     const userResponse = await API.getUser(currentUser.uid);
  //     const { listOfStocks = [] } = userResponse.data;

  //     // Check if the stock is already in the user's list
  //     if (!listOfStocks.includes(stockName)) {
  //       // Add the new stock to the list
  //       const updatedStocks = [...listOfStocks, stockName]; // Create a new array with the new stock
  //       await API.updateUser({
  //         uid: currentUser.uid,
  //         listOfStocks: updatedStocks, // Update with the new array
  //       });
  //       console.log("Added Stock to database:", stockName);
  //     } else {
  //       setError("Stock already in your list.");
  //     }
  //   } catch (err) {
  //     console.error("Error updating user data:", err);
  //     setError("Failed to update your stock list. Please try again.");
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!stockName) {
  //     setError("Please select a stock.");
  //     return;
  //   }

  //   try {
  //     setError(null); // Clear previous errors

  //     // Get stock data by name
  //     const response = await API.getStockByName(stockName);

  //     let stockData = response.data;

  //     // If startDate and endDate are provided, filter the data between those dates
  //     if (startDate && endDate) {
  //       const dbStartDate = new Date(stockData["startDate"]);
  //       const dbEndDate = new Date(stockData["endDate"]);

  //       const userStartDate = new Date(startDate);
  //       userStartDate.setDate(userStartDate.getDate() + 1);

  //       const userEndDate = new Date(endDate);
  //       userEndDate.setDate(userEndDate.getDate() + 1);

  //       //
  //       console.log("userStartDate:", userStartDate);
  //       console.log("userEndDate:", userEndDate);
  //       console.log("stockData:", stockData);

  //       // Ensure the provided dates fall within the database range
  //       // if (userStartDate >= dbStartDate && userEndDate <= dbEndDate) {
  //       //   stockData = stockData.filter((entry) => {
  //       //     const entryDate = new Date(entry.date);
  //       //     return entryDate >= userStartDate && entryDate <= userEndDate;
  //       //   });

  //       //   console.log("Filtered Stock Data:", stockData);
  //       // } else {
  //       //   setError(
  //       //     "The selected dates are outside the available range in the database."
  //       //   );
  //       //   return;
  //       // }
  //       if (userStartDate >= dbStartDate && userEndDate <= dbEndDate) {
  //         // Check if actual_predictions_2D exists in stockData
  //         if (stockData.actual_predictions_2D) {
  //           const filteredPredictions = stockData.actual_predictions_2D.filter(
  //             (entry) => {
  //               const entryDate = new Date(entry.date); // Convert entry date to Date object
  //               return entryDate >= userStartDate && entryDate <= userEndDate;
  //             }
  //           );

  //           console.log("Filtered Predictions:", filteredPredictions);
  //           return filteredPredictions;
  //         } else {
  //           throw new Error("actual_predictions_2D not found in stockData.");
  //         }

  //     } else {
  //       console.log("Full Stock Data:", stockData);
  //     }

  //     // Update the stock data in the frontend
  //     updateStockData(stockData);

  //     // Get the current user's data from the database
  //     const userResponse = await API.getUser(currentUser.uid);
  //     const { listOfStocks = [] } = userResponse.data;

  //     // Check if the stock is already in the user's list
  //     if (!listOfStocks.includes(stockName)) {
  //       // Add the new stock to the list
  //       const updatedStocks = [...listOfStocks, stockName]; // Create a new array with the new stock
  //       await API.updateUser({
  //         uid: currentUser.uid,
  //         listOfStocks: updatedStocks, // Update with the new array
  //       });
  //       console.log("Added Stock to database:", stockName);
  //     } else {
  //       setError("Stock already in your list.");
  //     }
  //   } catch (err) {
  //     console.error("Error updating user data:", err);
  //     setError("Failed to update your stock list. Please try again.");
  //   }
  // };

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

      // If startDate and endDate are provided, filter the data between those dates
      if (startDate && endDate) {
        const dbStartDate = new Date(stockData[0].startDate);
        const dbEndDate = new Date(stockData[0].endDate);

        const userStartDate = new Date(startDate);
        userStartDate.setDate(userStartDate.getDate() + 1);

        const userEndDate = new Date(endDate);
        userEndDate.setDate(userEndDate.getDate() + 1);

        console.log("userStartDate:", userStartDate);
        console.log("userEndDate:", userEndDate);
        console.log("dbStartDate:", dbStartDate);
        console.log("dbEndDate:", dbEndDate);
        console.log("stockData:", stockData);

        if (userStartDate >= dbStartDate && userEndDate <= dbEndDate) {
          console.log("Date features");
          // Check if actual_predictions_2D exists in stockData
          if (stockData[0].actual_predictions_2D) {
            const filteredPredictions =
              stockData[0].actual_predictions_2D.filter((entry) => {
                const entryDate = new Date(entry.date); // Convert entry date to Date object
                return entryDate >= userStartDate && entryDate <= userEndDate;
              });

            console.log("Filtered Predictions:", filteredPredictions);
            updateStockData(filteredPredictions);
            // return filteredPredictions;
          } else {
            throw new Error("actual_predictions_2D not found in stockData.");
          }
        } else {
          console.log("Full Stock Data:", stockData);
        }
      }

      // Update the stock data in the frontend
      updateStockData(stockData);

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
        <label>
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
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Search;
