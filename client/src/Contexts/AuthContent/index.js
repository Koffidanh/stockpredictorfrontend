import React, { useContext, useState, useEffect } from "react";
import { auth, provider } from "../../firebase";
import firebase from "firebase/compat/app";
// import { API } from "../../utils/API";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signupWithGoogle = async () => {
    try {
      const result = await auth.signInWithPopup(provider);
      if (result.additionalUserInfo.isNewUser) {
        const newUser = {
          userName: result.user.displayName,
          profileImage: [], // Consider updating to include the profile image if available
          uid: result.user.uid,
          hasPassword: false,
        };

        console.log(newUser);
        // API.saveUser(newUser); // Uncomment if you want to save new user details
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  const value = {
    currentUser,
    login: (email, password) =>
      auth.signInWithEmailAndPassword(email, password),
    signup: (name, email, password) =>
      auth.createUserWithEmailAndPassword(email, password).then((result) => {
        if (result.additionalUserInfo.isNewUser) {
          return result.user.updateProfile({ displayName: name });
        }
        return result;
      }),
    signupWithGoogle,
    logout: () => auth.signOut(),
    resetPassword: (email) => auth.sendPasswordResetEmail(email),
    updateEmail: (email) => currentUser.updateEmail(email),
    updatePassword: (password) => currentUser.updatePassword(password),
    updatePhotoURL: (image) => currentUser.updateProfile({ photoURL: image }),
    updateDisplayName: (name) =>
      currentUser.updateProfile({ displayName: name }),
    changePassword: async (oldPassword, newPassword) => {
      const user = firebase.auth().currentUser;
      const cred = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldPassword
      );
      await user.reauthenticateWithCredential(cred);
      await user.updatePassword(newPassword);
    },
    deleteAccount: async () => {
      const user = firebase.auth().currentUser;
      await user.delete();
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
