import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./index.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Perform logout logic here, e.g., clear user session or token
    // Then redirect to login page
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1>STOCKPREDICTOR LAGOS</h1>
      <div className="navbar-right">
        <div className="navbar-user">Welcome, Name</div>
        <div className="dropdown">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            Menu
          </button>
          {isOpen && (
            <ul className="dropdown-menu">
              <li>
                <a href="#profile">Profile</a>
              </li>
              <li>
                <a href="#settings">Settings</a>
              </li>
              <li>
                <a onClick={handleLogout} className="logout-button">
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
