import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContent/index";
import "./index.css";

export default function Loggin() {
  const navigate = useNavigate();
  const { login, signupWithGoogle } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.username.value;
    const password = event.target.password.value;

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signupWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during Google login:", error);
    }
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
        <div className="loginWithFirebase">
          <button type="button" onClick={handleGoogleLogin}>
            Login with Google
          </button>
        </div>
      </form>

      <div className="newUserText">
        For new users, create an account!
        <Link to="/signup"> Sign Up</Link>
      </div>
    </div>
  );
}
