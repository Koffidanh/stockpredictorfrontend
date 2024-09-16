import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContent/index"; // Import useAuth
import "./index.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const { logout } = useAuth(); // Access logout function from AuthContext

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from AuthContext
      navigate("/"); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
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
