import React from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../../utils/API";
import { useAuth } from "../../../Contexts/AuthContext/index"; // Import useAuth
import "./index.css"; // Import the CSS file for styling
// import { events } from "../../../../../server/models/user";

export default function Profiles() {
  const navigate = useNavigate();
  const { updatePhotoURL, currentUser } = useAuth();

  const handleUpdatedProfile = (event) => {
    event.preventDefault();
    submitProfileUpdated(event);
  };

  const submitProfileUpdated = (event) => {
    // Get the new username from the form
    const updatedUsername = event.target.UpdatedUsername.value;

    // Call the API to update the user profile
    API.updateUser({
      updateUsername: true,
      profileImage: [],
      uid: currentUser.uid, // User's unique ID
      username: updatedUsername, // Updated username from form
    })
      .then(() => {
        console.log("Profile updated successfully");
        navigate("/dashboard"); // Redirect to dashboard after success
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div id="profileUpdatedContainer">
      <div id="logoTitle">Sign up to Stock Predictor</div>
      <form
        onSubmit={handleUpdatedProfile}
        className="profileUpdatedComponentContainer"
      >
        <label htmlFor="UpdatedUsername">New Username: </label>
        <input type="text" id="UpdatedUsername" name="UpdatedUsername" />
        <br />
        <br />
        {/* <label htmlFor="UpdatedPassword">New Password: </label> */}
        {/* <input
          type="UpdatedPassword"
          id="UpdatedPassword"
          name="UpdatedPassword"
        /> */}
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
