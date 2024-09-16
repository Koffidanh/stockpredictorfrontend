import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"; // Import the CSS file for styling

export default function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();
    // Assume sign up is successful for now
    navigate("/dashboard");
  };

  return (
    <div id="signUpContainer">
      <div id="logoTitle">Sign up to Stock Predictor</div>
      <form onSubmit={handleSignUp} className="signUpComponentContainer">
        <label htmlFor="SignupUsername">Username: </label>
        <input type="text" id="SignupUsername" name="SignupUsername" />
        <br />
        <br />
        <label htmlFor="SignupPassword">Password: </label>
        <input type="password" id="SignupPassword" name="SignupPassword" />
        <br />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
