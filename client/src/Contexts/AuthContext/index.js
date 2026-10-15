import React, { useContext, useState, useReducer, useEffect } from "react";

import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";

import { API } from "../../utils/API";
import Loading from "../../Components/Loading";

// ============================================================
// INITIAL STATE
// ============================================================

const initialState = {
  loggedIn: false,
};

// ============================================================
// REDUCER
// ============================================================

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

// ============================================================
// AUTH CONTEXT
// ============================================================

export const AuthContext = React.createContext(initialState);

// ============================================================
// AUTH HOOK
// ============================================================

export function useAuth() {
  return useContext(AuthContext);
}

// ============================================================
// AUTH PROVIDER
// ============================================================

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const [currentUser, setCurrentUser] = useState(null);

  /*
   * authLoading:
   *
   * Used only while Firebase determines whether
   * there is currently an authenticated user.
   */
  const [authLoading, setAuthLoading] = useState(true);

  /*
   * actionLoading:
   *
   * Used while login/signup/logout operations
   * are actively running.
   */
  const [actionLoading, setActionLoading] = useState(false);

  const navigate = useNavigate();

  // ==========================================================
  // GOOGLE LOGIN / SIGNUP
  // ==========================================================

  const signupWithGoogle = async () => {
    try {
      setActionLoading(true);

      console.log("Starting Google authentication...");

      // ------------------------------------------------------
      // Authenticate with Firebase
      // ------------------------------------------------------

      const result = await auth.signInWithPopup(provider);

      if (!result || !result.user) {
        throw new Error("Google authentication did not return a user.");
      }

      // ------------------------------------------------------
      // Create app user object
      // ------------------------------------------------------

      const newUser = {
        userName: result.user.displayName || "",
        profileImage: result.user.photoURL ? [result.user.photoURL] : [],
        uid: result.user.uid,
      };

      console.log("Google authentication successful.");

      console.log("Firebase UID:", newUser.uid);

      // ------------------------------------------------------
      // Check whether user already exists in database
      // ------------------------------------------------------

      let existingUser = null;

      try {
        existingUser = await API.getUser(newUser.uid);

        console.log("Existing user response:", existingUser?.data);
      } catch (error) {
        console.error("GET USER REQUEST FAILED");

        console.error("Firebase UID:", newUser.uid);

        console.error("Status:", error.response?.status);

        console.error("Backend response:", error.response?.data);

        console.error("Request URL:", error.config?.url);

        console.error("Message:", error.message);

        /*
         * IMPORTANT:
         *
         * A 404 can mean that the user simply
         * does not exist yet.
         *
         * A 422 means the backend rejected
         * the UID or route input.
         */

        if (error.response?.status === 404) {
          existingUser = null;
        } else {
          throw error;
        }
      }

      // ------------------------------------------------------
      // Save new user if they don't exist
      // ------------------------------------------------------

      const userData = existingUser?.data;

      const userDoesNotExist =
        !userData || (Array.isArray(userData) && userData.length === 0);

      if (userDoesNotExist) {
        console.log("User does not exist. Creating user...");

        try {
          const saveResponse = await API.saveUser(newUser);

          console.log("User successfully saved:", saveResponse?.data);
        } catch (error) {
          console.error("SAVE USER REQUEST FAILED");

          console.error("Status:", error.response?.status);

          console.error("Backend response:", error.response?.data);

          console.error("Message:", error.message);

          throw error;
        }
      } else {
        console.log("User already exists.");
      }

      // ------------------------------------------------------
      // Mark user as logged in
      // ------------------------------------------------------

      dispatch({
        type: "SET_LOGGED_IN",
        payload: true,
      });

      // ------------------------------------------------------
      // Navigate immediately
      // ------------------------------------------------------

      navigate("/dashboard");
    } catch (error) {
      console.error("====================================");

      console.error("GOOGLE LOGIN FAILED");

      console.error("====================================");

      console.error("Message:", error.message);

      console.error("Status:", error.response?.status);

      console.error("Backend response:", error.response?.data);

      console.error("Request URL:", error.config?.url);

      console.error("Full error:", error);

      console.error("====================================");
    } finally {
      /*
       * Always stop loading,
       * regardless of success or failure.
       */

      setActionLoading(false);
    }
  };

  // ==========================================================
  // EMAIL/PASSWORD SIGNUP
  // ==========================================================

  async function signup(name, email, password) {
    try {
      setActionLoading(true);

      // ------------------------------------------------------
      // Create Firebase account
      // ------------------------------------------------------

      const result = await auth.createUserWithEmailAndPassword(email, password);

      if (!result?.user) {
        throw new Error("Firebase did not return a user.");
      }

      // ------------------------------------------------------
      // Update display name
      // ------------------------------------------------------

      await result.user.updateProfile({
        displayName: name,
      });

      // ------------------------------------------------------
      // Send verification email
      // ------------------------------------------------------

      try {
        await result.user.sendEmailVerification();
      } catch (error) {
        console.error("Email verification could not be sent:", error);
      }

      // ------------------------------------------------------
      // Create database user object
      // ------------------------------------------------------

      const newUser = {
        userName: name,
        profileImage: [],
        uid: result.user.uid,
        hasPassword: true,
      };

      console.log("Creating user in application database:", newUser.uid);

      // ------------------------------------------------------
      // Save database user
      // ------------------------------------------------------

      try {
        await API.saveUser(newUser);
      } catch (error) {
        console.error("Could not save user to backend.");

        console.error("Status:", error.response?.status);

        console.error("Backend response:", error.response?.data);

        throw error;
      }

      dispatch({
        type: "SET_LOGGED_IN",
        payload: true,
      });

      return result;
    } catch (error) {
      console.error("Signup failed:", error);

      throw error;
    } finally {
      setActionLoading(false);
    }
  }

  // ==========================================================
  // EMAIL/PASSWORD LOGIN
  // ==========================================================

  async function login(email, password) {
    try {
      setActionLoading(true);

      const result = await auth.signInWithEmailAndPassword(email, password);

      dispatch({
        type: "SET_LOGGED_IN",
        payload: true,
      });

      return result;
    } catch (error) {
      console.error("Login failed:", error);

      throw error;
    } finally {
      setActionLoading(false);
    }
  }

  // ==========================================================
  // LOGOUT
  // ==========================================================

  async function logout() {
    try {
      setActionLoading(true);

      await auth.signOut();

      dispatch({
        type: "SET_LOGGED_IN",
        payload: false,
      });

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);

      throw error;
    } finally {
      setActionLoading(false);
    }
  }

  // ==========================================================
  // RESET PASSWORD
  // ==========================================================

  async function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  // ==========================================================
  // UPDATE EMAIL
  // ==========================================================

  async function updateEmail(email) {
    if (!currentUser) {
      throw new Error("No authenticated user.");
    }

    return currentUser.updateEmail(email);
  }

  // ==========================================================
  // UPDATE PASSWORD
  // ==========================================================

  async function updatePassword(password) {
    if (!currentUser) {
      throw new Error("No authenticated user.");
    }

    return currentUser.updatePassword(password);
  }

  // ==========================================================
  // UPDATE PROFILE PHOTO
  // ==========================================================

  async function updatePhotoURL(image) {
    if (!currentUser) {
      throw new Error("No authenticated user.");
    }

    return currentUser.updateProfile({
      photoURL: image,
    });
  }

  // ==========================================================
  // UPDATE DISPLAY NAME
  // ==========================================================

  async function updateDisplayName(name) {
    if (!currentUser) {
      throw new Error("No authenticated user.");
    }

    return currentUser.updateProfile({
      displayName: name,
    });
  }

  // ==========================================================
  // REAUTHENTICATE
  // ==========================================================

  const reauthenticate = async (currentPassword) => {
    const user = firebase.auth().currentUser;

    if (!user) {
      throw new Error("No authenticated user.");
    }

    if (!user.email) {
      throw new Error("Authenticated user does not have an email.");
    }

    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );

    return user.reauthenticateWithCredential(credential);
  };

  // ==========================================================
  // CHANGE PASSWORD
  // ==========================================================

  const changePassword = async (oldPassword, newPassword) => {
    const user = firebase.auth().currentUser;

    if (!user) {
      throw new Error("No authenticated user.");
    }

    try {
      await reauthenticate(oldPassword);

      await user.updatePassword(newPassword);

      console.log("Password successfully updated.");
    } catch (error) {
      console.error("Password update failed:", error);

      throw error;
    }
  };

  // ==========================================================
  // DELETE ACCOUNT
  // ==========================================================

  async function deleteAccount() {
    const user = firebase.auth().currentUser;

    if (!user) {
      throw new Error("No user is currently logged in.");
    }

    try {
      await user.delete();

      dispatch({
        type: "SET_LOGGED_IN",
        payload: false,
      });

      console.log("Firebase account deleted successfully.");

      navigate("/");
    } catch (error) {
      console.error("Error deleting Firebase account:", error);

      throw error;
    }
  }

  // ==========================================================
  // MANUAL LOGIN STATE UPDATE
  // ==========================================================

  const updatedLoginStatus = (value) => {
    dispatch({
      type: "SET_LOGGED_IN",
      payload: value,
    });
  };

  // ==========================================================
  // FIREBASE AUTH STATE
  // ==========================================================

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        console.log("Firebase auth state changed:", user?.uid || "No user");

        setCurrentUser(user);

        dispatch({
          type: "SET_LOGGED_IN",
          payload: Boolean(user),
        });

        /*
         * Firebase has now finished checking
         * whether the user is logged in.
         */

        setAuthLoading(false);
      },
      (error) => {
        console.error("Firebase auth state error:", error);

        setCurrentUser(null);

        setAuthLoading(false);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // ==========================================================
  // CONTEXT VALUE
  // ==========================================================

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
    updateDisplayName,

    signupWithGoogle,

    changePassword,
    reauthenticate,

    deleteAccount,

    updatedLoginStatus,

    loading: authLoading || actionLoading,
  };

  // ==========================================================
  // LOADING SCREEN
  // ==========================================================

  /*
   * Only block the whole application while Firebase
   * determines the initial authentication state.
   *
   * Do NOT block the entire React tree whenever a login
   * request is running. That was part of the problem with
   * the old implementation.
   */

  if (authLoading) {
    return <Loading />;
  }

  // ==========================================================
  // PROVIDER
  // ==========================================================

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
