// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { API } from "../../../utils/API";
// import { useAuth } from "../../../Contexts/AuthContext/index"; // Import useAuth
// import "./index.css"; // Import the CSS file for styling
// import Navbar from "../../Navbar";

// export default function Delete() {
//   const navigate = useNavigate();
//   const { currentUser, deleteAccount } = useAuth();

//   const handleDeleteProfile = (event) => {
//     console.log("Attempting Deleting ...");
//     event.preventDefault();
//     // deleteAccount();
//     deleteProfile();
//   };

//   const deleteProfile = () => {
//     // Call the API to delete the user profile
//     if (window.confirm("Are you sure you want to delete your account?")) {
//       console.log("deleteing from delete: ", currentUser.uid);
//       API.removeUser({
//         uid: currentUser.uid, // User's unique ID
//       })
//         .then(() => {
//           deleteAccount();
//         })
//         .then(() => {
//           console.log("Profile deleted successfully");
//           alert("Your account has been deleted.");
//           navigate("/"); // Redirect to home/login page after success
//         })
//         .catch((error) => {
//           console.error("Error deleting profile:", error);
//           alert("There was an error deleting your account. Please try again.");
//         });
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div id="profileUpdatedContainer">
//         <div id="logoTitle">Delete Account</div>
//         <form
//           onSubmit={handleDeleteProfile}
//           // onSubmit={deleteProfile}
//           className="profileUpdatedComponentContainer"
//         >
//           <label>
//             Are you sure you want to delete your account? This action cannot be
//             undone.
//           </label>
//           <br />
//           <br />
//           <button type="submit">Delete Account</button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../../utils/API";
import { useAuth } from "../../../Contexts/AuthContext";
import Navbar from "../../Navbar";
import "./index.css";

export default function Delete() {
  const navigate = useNavigate();
  const { currentUser, deleteAccount } = useAuth();

  const handleDeleteProfile = async (event) => {
    event.preventDefault();

    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        console.log("Deleting account for UID:", currentUser.uid);

        // First, delete the user profile from the database
        await API.removeUser({ uid: currentUser.uid });
        console.log("Profile deleted from database.");

        // Then, delete the Firebase account
        // await deleteAccount();
        console.log("Firebase account deleted successfully.");

        alert("Your account has been deleted.");
        navigate("/"); // Redirect to home/login page after success
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("There was an error deleting your account. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div id="profileUpdatedContainer">
        <div id="logoTitle">Delete Account</div>
        <form
          onSubmit={handleDeleteProfile}
          className="profileUpdatedComponentContainer"
        >
          <label>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </label>
          <br />
          <br />
          <button type="submit">Delete Account</button>
        </form>
      </div>
    </div>
  );
}
