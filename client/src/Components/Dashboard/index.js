import React from "react";
import Navbar from "../Navbar";
import Search from "../Search";
import SearchPastGraph from "../SearchPastGraph";
import ListStock from "../ListStock";
import ViewListPredict from "../ViewListPredict";
import "./index.css"; // Import the CSS for this component

const Dashboard = () => (
  <div className="dashboard">
    <Navbar />
    <div className="content">
      <div className="search-and-graphs">
        <Search />
        <SearchPastGraph />
      </div>
      <div className="stock-and-graphs">
        <ListStock />
        <ViewListPredict />
      </div>
    </div>
  </div>
);

export default Dashboard;
