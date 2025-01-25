import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext/index"; // Import useAuth
import { useGlobalContext } from "../../../Contexts/GlobalContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import UploadPhoto from "../../UploadPhoto";
import Navbar from "../../Navbar";

export default function Settings() {
  // Renamed to uppercase "Settings"
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const { logout } = useAuth(); // Access logout function from AuthContext
  const {
    userProfileImage,
    updateProfileImage,
    setUpdateProfileImage,
    isOpenPhotoUpdated,
    user,
  } = useGlobalContext();

  const { updatePhotoURL, currentUser } = useAuth();
  const { uid, displayName, photoURL } = currentUser;
  const userID = uid;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const togglePhotoUpload = () => {
    setUpdateProfileImage(true); // Toggle the photo upload popup
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from AuthContext
      navigate("/"); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const goToProfile = () => {
    navigate("/profile"); // Navigate to profile page
  };

  const goToDelete = () => {
    navigate("/delete"); // Navigate to delete page
  };

  return (
    <div id="settingsContainer">
      <Navbar />
      <div id="logoTitle">Settings Page</div>
      <br />
      <div id="editTitle" onClick={goToProfile}>
        Edit Profile
      </div>
      <br />
      <div id="deleteProfile" onClick={goToDelete}>
        Delete Profile
      </div>
    </div>
  );
}
