import React, { useEffect } from "react";
import "./index.css";
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

const ViewListPredict = ({ selectedStock }) => {
  useEffect(() => {
    console.log("selectedStock in the viewListPredict:", selectedStock);
  }, [selectedStock]);

  // // Ensure selectedStock is defined and has the necessary properties
  // if (!selectedStock) {
  //   return <div>No stock selected</div>; // Fallback if no stock is selected
  // }

  const actualPrices =
    selectedStock[0]?.actual?.map((price, index) => ({
      index: index, // X-axis: Index of the price
      realPrice: parseFloat(price["$numberDecimal"]), // Y-axis: Actual price
    })) || []; // Fallback to empty array if undefined

  const predictedPrices =
    selectedStock[0]?.predictions?.map((price, index) => ({
      index: index, // X-axis: Index of the price
      predictedPrice: parseFloat(price["$numberDecimal"]),
    })) || []; // Fallback to empty array if undefined

  const highPrices =
    selectedStock[0]?.High?.map((price, index) => ({
      index: index,
      High: parseFloat(price["$numberDecimal"]),
    })) || []; // Fallback to empty array if undefined

  const lowPrices =
    selectedStock[0]?.Low?.map((price, index) => ({
      index: index,
      Low: parseFloat(price["$numberDecimal"]),
    })) || []; // Fallback to empty array if undefined

  // Combine data for price trend prediction
  const combinedTrendData = actualPrices.map((actual, index) => ({
    index,
    realPrice: actual.realPrice,
    predictedPrice: predictedPrices[index]?.predictedPrice || null,
    High: highPrices[index]?.High || null,
    Low: lowPrices[index]?.Low || null,
  }));

  // useEffect(() => {
  //   console.log("combinedTrendData: ", combinedTrendData);
  // }, [combinedTrendData]);

  return (
    <div className="graphs">
      <h3>{selectedStock[0]?.ticker}</h3>{" "}
      {/* Show the selected stock's ticker */}
      {/* Real Price Graph */}
      <div className="graph real-price-graph">
        {/* <h4>Real Price Graph</h4> */}
        <ResponsiveContainer width="100%" height={210}>
          <LineChart
            data={actualPrices}
            margin={{ top: 0, right: 5, left: -55, bottom: 5 }}
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
      {/* Predicted Price Graph */}
      <div className="graph predicted-price-graph">
        {/* <h4>Predicted Price Graph</h4> */}
        <ResponsiveContainer width="100%" height={210}>
          <LineChart
            data={predictedPrices}
            margin={{ top: 0, right: 5, left: -55, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" tickFormatter={(index) => index + 1} />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value.toFixed(2)}`]} />
            <Legend />
            <Line
              type="monotone"
              dataKey="predictedPrice"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Price Trend Prediction */}
      {/* <div className="graph price-trend-graph">
        <h4>Price Trend Prediction</h4>
        <ResponsiveContainer width="100%" height={210}>
          <LineChart
            data={combinedTrendData}
            margin={{ top: 0, right: 5, left: -55, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" tickFormatter={(index) => index + 1} />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
            />
            <Legend />
            {combinedTrendData.some((data) => data.High !== null) && (
              <Line
                type="monotone"
                dataKey="High"
                stroke="#ff7300"
                activeDot={{ r: 8 }}
              />
            )}
            {combinedTrendData.some((data) => data.Low !== null) && (
              <Line
                type="monotone"
                dataKey="Low"
                stroke="#387908"
                activeDot={{ r: 8 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
};

export default ViewListPredict;
