import React from "react";
import "./index.css";

const ViewListPredict = () => (
  <div className="graphs">
    <h3>Name of the Stock Selected</h3>
    <div className="graph real-price-graph">Real Price Graph</div>
    <div className="graph predicted-price-graph">Predicted Price Graph</div>
    <div className="graph price-trend-graph">Price Trend Prediction</div>
  </div>
);

export default ViewListPredict;
