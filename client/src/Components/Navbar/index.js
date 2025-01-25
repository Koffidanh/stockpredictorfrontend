import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext/index"; // Import useAuth
import { useGlobalContext } from "../../Contexts/GlobalContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import UploadPhoto from "../UploadPhoto";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isOpenPhotoUpdated, setIsOpenPhotoUpdated] = useState(false);
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

  const goToSetting = () => {
    navigate("/settings"); // Navigate to profile page
  };

  // useEffect(() => {
  //   if (!currentUser) {
  //     navigate("/");
  //   }
  // }, [currentUser]);
  console.log("usernameNavbar: ", user[0].userName);

  // useEffect(() => {
  //   if (!isOpenPhotoUpdated) {
  //     setUpdateProfileImage(false); // Close the UploadPhoto component
  //   }
  // }, [isOpenPhotoUpdated, setUpdateProfileImage]);
  // console.log("usernameNavbar: ", user[0].userName);

  //////////////////////////////////

  // useEffect(() => {
  //   if (user) {
  //     console.log("User global updated in Navbar: ", JSON.stringify(user));
  //   } else {
  //     console.log("User is undefined in Navbar");
  //   }
  // }, [user]);

  ///////////////////////////////////

  return (
    <>
      <nav className="navbar">
        <h1>STOCKPREDICTOR</h1>
        <div className="navbar-right">
          <div className="profileImage" onClick={togglePhotoUpload}>
            {userProfileImage?.length > 0 ? (
              <img src={userProfileImage[0]} alt="User profile" />
            ) : currentUser?.photoURL ? (
              <img src={currentUser?.photoURL} alt="User profile" />
            ) : (
              <i className="fas fa-portrait"></i>
            )}
          </div>
          <div className="navbar-user">
            Welcome,{" "}
            {user?.length > 0 ? user[0]?.userName : currentUser?.displayName}
          </div>
          <div className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              Menu
            </button>
            {isOpen && (
              <ul className="dropdown-menu">
                {/* <li>
                  <a href="#profile" onClick={goToProfile}>
                    Profile
                  </a>
                </li> */}
                <li>
                  <a href="#settings" onClick={goToSetting}>
                    Settings
                  </a>
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
      {isOpenPhotoUpdated ? <UploadPhoto /> : null}
    </>
  );
};

export default Navbar;
