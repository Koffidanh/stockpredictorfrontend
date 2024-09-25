import { useAuth } from "../AuthContext";
import React, { createContext, useContext, useEffect, useState } from "react";
import { API } from "../../utils/API";

const initialState = [];
const PhotoURLContext = createContext();
export const usePhotoURL = () => useContext(PhotoURLContext);
export const PhotoURLContextProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const [photoURLImage, setphotoURLimage] = useState(initialState);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    API.getUser(currentUser.uid)
      .then((res) => setphotoURLimage(res.data))
      .catch((err) => console.log(err));
  }, [currentUser?.uid]);

  return (
    <PhotoURLContext.Provider value={[photoURLImage, setphotoURLimage]}>
      {children}
    </PhotoURLContext.Provider>
  );
};
