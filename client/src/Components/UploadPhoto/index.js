import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuth } from "../../Contexts/AuthContext/index"; // Import useAuth
import "./index.css";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import { API } from "../../utils/API";

export default function UploadPhoto() {
  const [photoFile, setPhotoFile] = useState(null);
  const { updatePhotoURL, currentUser } = useAuth();
  const { photoURL } = currentUser;
  const [updateButtonText, setUpdateButtonText] = useState(false);

  const { userProfileImage, updateProfileImage } = useGlobalContext();

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file

    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onloadend = () => {
          // Use the base64 string to update the profile image
          updateProfileImage(reader.result); // Pass the base64 string
          console.log("Base64 Image:", reader.result); // Log the base64 image string (optional)
          setUpdateButtonText(true);
        };

        reader.readAsDataURL(file); // Convert the image to base64
        console.log("Selected file:", file); // Log the image file to the console
      } else {
        console.log("Please select a valid image file.");
      }
    }
  };

  const submitProfileImage = () => {
    API.updateUser({
      // updatingProfileImage: true,
      uid: currentUser.uid,
      profileImage: userProfileImage,
    });
  };

  useEffect(() => {
    console.log("userProfileImage1:", userProfileImage);
    console.log("userProfileImage1lenght:", userProfileImage?.length > 0);
  }, [userProfileImage]);

  return (
    <div className="uploadPopup">
      <div className="profileImage">
        {/* {userProfileImage?.length > 0 ? (
          <img src={userProfileImage[0]?.name} alt="User profile" />
        ) : currentUser?.photoURL ? (
          <img src={currentUser?.photoURL} alt="User profile" />
        ) : (
          <i className="fas fa-portrait"></i>
        )} */}

        {userProfileImage?.length > 0 ? (
          <img src={userProfileImage[0]} alt="User profile" /> // Use base64 string directly
        ) : currentUser?.photoURL ? (
          <img src={currentUser?.photoURL} alt="User profile" />
        ) : (
          <i className="fas fa-portrait"></i>
        )}
      </div>
      {!updateButtonText ? (
        <h4
          className="uploadNewPhoto"
          onClick={() => document.getElementById("file-input").click()}
        >
          Click here to Upload a Profile Picture
        </h4>
      ) : (
        <h4 className="uploadNewPhoto" onClick={() => submitProfileImage()}>
          Submit new Picture
        </h4>
      )}

      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        accept="image/*" // Only allow image file types
        onChange={handleFileChange}
      />
    </div>
  );
}

// import React, { useEffect, useState, useCallback } from "react";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import { useAuth } from "../../Contexts/AuthContext/index";
// import "./index.css";
// import { useGlobalContext } from "../../Contexts/GlobalContext";
// import { API } from "../../utils/API";

// export default function UploadPhoto() {
//   const [photoFile, setPhotoFile] = useState(null);
//   const { updatePhotoURL, currentUser } = useAuth();
//   const {
//     userProfileImage,
//     updateProfileImage,
//     setUpdateProfileImage,
//     isOpenPhotoUpdated,
//   } = useGlobalContext();
//   const [updateButtonText, setUpdateButtonText] = useState(false);
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state

//   const handleFileChange = useCallback(
//     (event) => {
//       const file = event.target.files[0];

//       if (file) {
//         if (file.type.startsWith("image/")) {
//           setPhotoFile(file);
//           const reader = new FileReader();

//           reader.onloadend = () => {
//             updateProfileImage(reader.result);
//             setUpdateButtonText(true);
//           };

//           reader.readAsDataURL(file);
//         } else {
//           console.log("Please select a valid image file.");
//         }
//       }
//     },
//     [updateProfileImage]
//   );

//   const submitProfileImage = async () => {
//     const formData = new FormData();
//     formData.append("file", photoFile);

//     setLoading(true); // Set loading state to true
//     setError(null); // Reset error state

//     try {
//       const response = await API.uploadPhoto(formData);
//       updatePhotoURL(response.data.fileUrl);
//       console.log("File uploaded successfully:", response.data);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setError("Error uploading photo. Please try again."); // Set error message
//     } finally {
//       setLoading(false); // Set loading state to false after the request
//     }
//     setUpdateProfileImage(false);
//   };

//   useEffect(() => {
//     console.log("userProfileImage:", userProfileImage);
//   }, [userProfileImage]);

//   return (
//     <>
//       {isOpenPhotoUpdated && (
//         <div className="uploadPopup">
//           <div className="profileImage">
//             {userProfileImage?.length > 0 ? (
//               <img src={userProfileImage[0]} alt="User profile" />
//             ) : currentUser?.photoURL ? (
//               <img src={currentUser?.photoURL} alt="User profile" />
//             ) : (
//               <i className="fas fa-portrait"></i>
//             )}
//           </div>
//           {!updateButtonText ? (
//             <h4
//               className="uploadNewPhoto"
//               onClick={() => document.getElementById("file-input").click()}
//             >
//               Click here to Upload a Profile Picture
//             </h4>
//           ) : (
//             <h4 className="uploadNewPhoto" onClick={submitProfileImage}>
//               {loading ? "Uploading..." : "Submit new Picture"}
//             </h4>
//           )}
//           {error && <p className="error">{error}</p>}{" "}
//           {/* Display error message */}
//           <input
//             type="file"
//             id="file-input"
//             style={{ display: "none" }}
//             accept="image/*"
//             onChange={handleFileChange}
//           />
//         </div>
//       )}
//     </>
//   );
// }
