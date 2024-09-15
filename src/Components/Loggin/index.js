import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.css"; // Import the CSS file for styling

export default function Loggin() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Assume login is successful for now
    navigate("/dashboard");
  };

  return (
    <div id="logginContainer">
      <div id="logoTitle">Welcome to Stock Predictor</div>
      <form onSubmit={handleLogin} className="logginComponentContainer">
        <div className="usernameClass">
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" name="username" />
          <br />
          <br />
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" />
          <br />
          <br />
          <input type="submit" value="Submit" />
        </div>
      </form>
      <div className="newUserText">
        For new users, create an account!
        <Link to="/signup"> Sign Up</Link>
      </div>
    </div>
  );
}
