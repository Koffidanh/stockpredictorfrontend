import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuth } from "../../Contexts/AuthContext/index"; // Import useAuth
import "./index.css";
import { useGlobalContext } from "../../Contexts/GlobalContext";

export default function UploadPhoto() {
  const [photoFile, setPhotoFile] = useState(null);
  const { updatePhotoURL, currentUser } = useAuth();
  const { photoURL } = currentUser;

  const { userProfileImage, updateProfileImage } = useGlobalContext();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Update photoURL with the base64 image string
        updatePhotoURL(reader.result);
      };
      reader.readAsDataURL(file);
      setPhotoFile(file);
    }
  };

  return (
    <div className="uploadPopup">
      <div className="profileImage">
        {photoURL ? (
          <img src={photoURL} alt="User profile" />
        ) : (
          <i className="fas fa-portrait"></i>
        )}
      </div>
      <h4
        className="uploadNewPhoto"
        onClick={() => document.getElementById("file-input").click()}
      >
        Click here to Upload a Profile Picture
      </h4>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        style={{ display: "none" }} // Hide the default file input
        onChange={handleFileChange}
      />
    </div>
  );
}
