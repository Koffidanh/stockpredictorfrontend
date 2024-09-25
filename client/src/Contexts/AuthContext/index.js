import React, { useContext, useState, useReducer, useEffect } from "react";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
// import firebase from "firebase/app";
import firebase from "firebase/compat/app";

import { API } from "../../utils/API";
// import { getAuth, deleteUser } from "firebase/compat/app";
import { useGlobalContext } from "../GlobalContext";

const initialState = {
  loggedIn: false,
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGGED_IN":
      return {
        ...state,
        loggedIn: action.payload,
      };

    default:
      return state;
  }
};

export const AuthContext = React.createContext(initialState);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const delay = 5;
  useEffect(() => {
    console.log("LOGGEDIN: " + state.loggedIn);
  }, [state.loggedIn]);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow("Time has passed"), 10000);
    console.log("TIMER: " + show);
  }, [show]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkVerified = async () => {
  //     if (currentUser && currentUser.emailVerified) {
  //       history.push("/dashboard");
  //     } else {
  //       auth.signOut();
  //     }
  //   };

  //   checkVerified();
  // }, [currentUser]);

  // const signupWithGoogle = async () => {
  //   // Your existing signup logic...
  //   const result = await auth.signInWithPopup(provider);

  //   if (result) {
  //     const newUser = {
  //       userName: result.user.displayName,
  //       profileImage: [],
  //       uid: result.user.uid,
  //     };

  //     console.log(newUser);
  //     await API.saveUser(newUser);
  //     // Directly use navigate
  //     setTimeout(() => navigate("/dashboard"), 3000);
  //   } else {
  //     console.log("I'm Sorry, I'm afraid I can't do that.");
  //   }
  // };

  const signupWithGoogle = async () => {
    try {
      // Sign in with Google
      const result = await auth.signInWithPopup(provider);

      if (result) {
        const newUser = {
          userName: result.user.displayName,
          profileImage: [],
          uid: result.user.uid,
        };

        console.log(newUser);

        // Check if the user exists in the database
        const existingUser = await API.getUser(newUser.uid); // Ensure this is awaited

        console.log("existingUser.lenght: ", existingUser.data.length);

        if (!existingUser || existingUser.data.length === 0) {
          // User does not exist, save new user
          await API.saveUser(newUser);
          console.log("New user saved to the database:", newUser);
          // Navigate to the dashboard after a short delay
          setTimeout(() => navigate("/dashboard"), 3000);
        } else {
          // User exists, you may want to do something with existingUser
          console.log("User already exists. Fetched user data:", existingUser);
          // Navigate to the dashboard after a short delay
          setTimeout(() => navigate("/dashboard"), 3000);
        }
      } else {
        console.log("I'm Sorry, I'm afraid I can't do that.");
      }
    } catch (error) {
      console.error("Error during signup with Google:", error);
    }
  };

  function signup(name, email, password) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => (result.additionalUserInfo.isNewUser ? result : false))
      .then((result) => {
        if (result) {
          result.user.updateProfile({ displayName: name });
          result.user.sendEmailVerification();

          const newUser = {
            userName: name,
            profileImage: [],
            uid: result.user.uid,
            hasPassword: true,
          };

          console.log(newUser);
          API.saveUser(newUser);
        } else {
          console.log("I'm Sorry, I'm afraid I can't do that.");
        }
      });
  }

  const updatedLoginStatus = (value) => {
    dispatch({
      type: "SET_LOGGED_IN",
      payload: value,
    });
  };

  async function login(email, password) {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(() => dispatch({ type: "SET_LOGGED_IN", payload: true }));
  }

  function logout() {
    return auth
      .signOut()
      .then(() => dispatch({ type: "SET_LOGGED_IN", payload: false }));
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    console.log("update password function");
    return currentUser.updatePassword(password);
  }

  function updatePhotoURL(image) {
    return currentUser.updateProfile({ photoURL: image });
  }

  function updateDisplayName(name) {
    return currentUser.updateProfile({ displayName: name });
  }

  const reauthenticate = (currentPassword) => {
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  const changePassword = async (oldPassword, newPassword) => {
    const user = firebase.auth().currentUser;
    try {
      // reauthenticating
      await reauthenticate(oldPassword);
      // updating password
      await user.updatePassword(newPassword);
    } catch (err) {
      console.log(err);
      // logout()
    }
  };

  function deleteAccount() {
    console.log("delete function");
    // const auth = getAuth();
    // const user = auth.currentUser;

    // deleteUser(user).then(() => {
    //   // User deleted.
    // }).catch((error) => {
    //   // An error ocurred
    //   // ...
    // });

    const user = firebase.auth().currentUser;

    user
      .delete()
      .then(() => {
        // User deleted.
      })
      .catch((error) => {
        // alert(error)
        // An error ocurred
        // ...
      });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    ...state,
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updatePhotoURL,
    signupWithGoogle,
    changePassword,
    reauthenticate,
    updateDisplayName,
    deleteAccount,
    updatedLoginStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
