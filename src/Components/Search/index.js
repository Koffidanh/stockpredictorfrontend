import React, { useState } from "react";
import "./index.css";

const Search = () => {
  const [stockName, setStockName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pastDrop, setPastDrop] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Stock Name:",
      stockName,
      "Start Date:",
      startDate,
      "End Date:",
      endDate,
      "Past Drop:",
      pastDrop
    );
  };

  return (
    <div className="search-container">
      <h2>Search Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Stock Name:
          <input
            type="text"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
          />
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
            <option value="10">10%</option>
            <option value="20">20%</option>
            <option value="30">30%</option>
            <option value="40">40%</option>
            <option value="50">50%</option>
            <option value="60">60%</option>
            <option value="70">70%</option>
            <option value="80">80%</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Search;
