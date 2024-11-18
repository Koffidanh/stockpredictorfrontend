import React from "react";
import Navbar from "../Navbar";
import Search from "../Search";
import SearchPastGraph from "../SearchPastGraph";
import ListStock from "../ListStock";
import ViewListPredict from "../ViewListPredict";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import "./index.css"; // Import the CSS for this component

const Dashboard = () => {
  const { selectedStock } =
    useGlobalContext();

  return (
    // Add return statement here
    <div className="dashboard">
      <Navbar />
      <div className="content">
        <div className="search-and-graphs">
          <Search />
          <SearchPastGraph />
        </div>
        <div className="stock-and-graphs">
          <ListStock />

          {selectedStock && <ViewListPredict selectedStock={selectedStock} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
