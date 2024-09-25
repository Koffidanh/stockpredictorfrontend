import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext/index"; // Import useAuth
import { useGlobalContext } from "../../Contexts/GlobalContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import UploadPhoto from "../UploadPhoto";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPhotoUpdated, setIsOpenPhotoUpdated] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const { logout } = useAuth(); // Access logout function from AuthContext
  const { userProfileImage, updateProfileImage } = useGlobalContext();

  const { updatePhotoURL, currentUser } = useAuth();
  const { uid, displayName, photoURL } = currentUser;
  const userID = uid;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const togglePhotoUpload = () => {
    setIsOpenPhotoUpdated(!isOpenPhotoUpdated); // Toggle the photo upload popup
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
    <>
      <nav className="navbar">
        <h1>STOCKPREDICTOR LAGOS</h1>
        <div className="navbar-right">
          {/* <div className="profileImage" onClick={togglePhotoUpload}>
            {userProfileImage ? (
              <img src={userProfileImage} alt="User profile" />
            ) : (
              <i className="fas fa-portrait"></i>
            )}
          </div> */}
          <div className="profileImage" onClick={togglePhotoUpload}>
            {currentUser?.photoURL ? (
              <img src={currentUser?.photoURL} alt="User profile" />
            ) : (
              <i className="fas fa-portrait"></i>
            )}
          </div>
          <div className="navbar-user">Welcome, {currentUser?.displayName}</div>
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
      {isOpenPhotoUpdated && <UploadPhoto />}
    </>
  );
};

export default Navbar;
