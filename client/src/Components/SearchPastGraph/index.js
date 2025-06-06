import React, { useState, useEffect } from "react";
import "./index.css";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SearchPastGraph = () => {
  const { stockData } = useGlobalContext();
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

  const handleMouseEnter = (e, text) => {
    setTooltip({ visible: true, x: e.clientX, y: e.clientY, text });
  };

  const handleMouseMove = (e) => {
    setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, text: "" });
  };

  // Ensure stockData is defined and has the necessary properties
  // const actualPrices =
  //   stockData[0]?.actual?.map((price, index) => ({
  //     index: index,
  //     realPrice: parseFloat(price["$numberDecimal"]),
  //   })) || [];

  // const actualPrices =
  //   stockData.map((entry, index) => ({
  //     index: index,
  //     realPrice: entry.actual !== undefined ? parseFloat(entry.actual) : null, // Directly access the price
  //   })) || [];

  const isDataFiltered =
    Array.isArray(stockData) && stockData.some((entry) => entry.date); //check if filtering happened based on date or similar

  // Use appropriate logic for mapping actualPrices based on whether data is filtered
  const actualPrices = isDataFiltered
    ? stockData.map((entry, index) => ({
        index: index,
        realPrice: entry.actual !== undefined ? parseFloat(entry.actual) : null,
      }))
    : stockData[0]?.actual?.map((price, index) => ({
        index: index,
        realPrice: parseFloat(price["$numberDecimal"]),
      })) || [];

  // console.log("stockData in searchpastgraph: ", stockData);

  // const predictedPrices =
  //   stockData[0]?.predictions?.map((price, index) => ({
  //     index: index,
  //     realPrice: parseFloat(price["$numberDecimal"]),
  //   })) || [];

  // console.log("stockDatasssss: ", stockData);
  const predictedPrices = isDataFiltered
    ? stockData.map((entry, index) => ({
        index: index,
        realPrice:
          entry.predicted !== undefined ? parseFloat(entry.predicted) : null, // Handle filtered data
      }))
    : stockData[0]?.predictions?.map((price, index) => ({
        index: index,
        realPrice: parseFloat(price["$numberDecimal"]),
      })) || []; // Handle unfiltered data

  // console.log("predictedPrices: ", predictedPrices);

  // Check if the last elements exist before trying to access realPrice
  const lastActualPrice =
    actualPrices.length > 0
      ? actualPrices[actualPrices.length - 1].realPrice
      : null;

  // console.log("predictedPricessssss: ", predictedPrices);
  const lastPredictedPrice =
    predictedPrices.length > 0
      ? predictedPrices[predictedPrices.length - 1].realPrice
      : null;

  // console.log("lastPredictedPrice: ", lastPredictedPrice);

  // Calculate percentage difference and determine box colors
  let actualBoxColor = "violet";
  let predictedBoxColor = "violet";

  if (lastActualPrice !== null && lastPredictedPrice !== null) {
    const percentageDifference =
      ((lastPredictedPrice - lastActualPrice) / lastActualPrice) * 100;
    // console.log(
    //   "color: ",
    //   ((lastPredictedPrice - lastActualPrice) / lastActualPrice) * 100
    // );

    if (percentageDifference > 10) {
      predictedBoxColor = "green";
      actualBoxColor = "green";
    } else if (percentageDifference < 0) {
      predictedBoxColor = "red";
      actualBoxColor = "red";
    } else if (percentageDifference < 10) {
      predictedBoxColor = "yellow";
      actualBoxColor = "yellow";
    }
  }

  // useEffect(() => {
  //   if (lastActualPrice !== null && lastPredictedPrice !== null) {
  //     const percentageDifference =
  //       ((lastPredictedPrice - lastActualPrice) / lastActualPrice) * 100;

  //     if (percentageDifference > 10) {
  //       predictedBoxColor = "green";
  //       actualBoxColor = "green";
  //     } else if (percentageDifference < -10) {
  //       predictedBoxColor = "red";
  //       actualBoxColor = "red";
  //     } else if (percentageDifference == 0) {
  //       predictedBoxColor = "yellow";
  //       actualBoxColor = "yellow";
  //     }
  //   }
  // }, [stockData]);

  return (
    <div className="graphs">
      <div className="actualGraphTittle">
        <h3>Actual Price Graph</h3>
        <div
          className="actualPriceTittle"
          style={{
            border: `7px solid ${actualBoxColor}`,
            padding: "5px",
            marginBottom: "10px",
            marginTop: "10px",
          }}
          onMouseEnter={(e) =>
            handleMouseEnter(
              e,
              "The actual price box color indicates its comparison to the predicted price. Violet is Null. Green is to buy. Red is Not to buy. Yellow is to buy with caution. This is based on 10% above or below the predicted value!"
            )
          }
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          Actual Price:{" "}
          {lastActualPrice !== null ? `$${lastActualPrice.toFixed(2)}` : "N/A"}
        </div>
        <div
          className="predictedPriceTittle"
          style={{
            border: `7px solid ${predictedBoxColor}`,
            padding: "5px",
            marginBottom: "10px",
            marginTop: "10px",
          }}
          onMouseEnter={(e) =>
            handleMouseEnter(
              e,
              "The actual price box color indicates its comparison to the predicted price. Green  to buy. Red Not to buy. Yellow with caution. This is based on 10% above or below the predicted value!"
            )
          }
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          Predicted Price:{" "}
          {lastPredictedPrice !== null
            ? `$${lastPredictedPrice.toFixed(2)}`
            : "N/A"}
        </div>
      </div>

      {tooltip.visible && (
        <div
          className="tooltip"
          style={{
            position: "absolute",
            top: tooltip.y + 10 + "px",
            left: tooltip.x + 10 + "px",
            backgroundColor: "white",
            border: "1px solid black",
            padding: "5px",
            borderRadius: "5px",
            zIndex: 1000,
          }}
        >
          {tooltip.text}
        </div>
      )}

      {actualPrices.length > 0 ? (
        <div className="graph real-price-graph">
          <ResponsiveContainer width="100%" height={210}>
            <LineChart
              data={actualPrices}
              margin={{ top: 0, right: 5, left: -60, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="index" tickFormatter={(index) => index + 1} />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toFixed(2)}`]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="realPrice"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="graph real-price-graph"></div>
      )}
    </div>
  );
};

export default SearchPastGraph;
