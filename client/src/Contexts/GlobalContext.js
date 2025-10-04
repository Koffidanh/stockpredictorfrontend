import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useAuth, AuthProvider } from "./AuthContext";
// import { post } from "superagent";
import { useParams } from "react-router-dom";
import { API } from "../utils/API";

// initial state
const initialState = {
  user: [{}],
  fetchingUser: true,
  isOpenPhotoUpdated: false,
  listOfStocksName: [],
  listOfChoosenStocksObjects: [],
  userProfileImage: [],
  selectedStock: [],
  stockData: [],
  objectDatas: [],
};

// reducer
const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        fetchingUser: false,
      };

    case "SET_LIST_CHOOSEN_STOCK":
      const newStocks = action.payload.filter(
        (newStock) =>
          !state.listOfChoosenStocksObjects.some(
            (existingStock) => existingStock.ticker === newStock.ticker
          )
      );
      return {
        ...state,
        listOfChoosenStocksObjects: [
          ...state.listOfChoosenStocksObjects,
          ...newStocks,
        ],
      };

    case "RESET_USER":
      return {
        ...state,
        user: null,
        // posts: [],
        fetchingUser: false,
      };

    case "SET_PROFILE_IMAGE":
      return {
        ...state,
        userProfileImage: [action.payload],
      };

    case "SET_PROFILE_USERNAME":
      return {
        ...state,
        userProfileUserName: [action.payload],
      };

    case "SET_ISOPENPHOTOUPDATED":
      return {
        ...state,
        isOpenPhotoUpdated: [action.payload],
      };

    case "SET_STOCK_NAME":
      return {
        ...state,
        listOfStocksName: [action.payload],
      };

    case "SET_SELECTED_STOCKS":
      return {
        ...state,
        selectedStock: [action.payload],
      };

    case "SET_DATA_STOCK":
      return {
        ...state,
        stockData: action.payload,
      };
    case "SET_OBJECT_DATA":
      return {
        ...state,
        objectDatas: action.payload,
      };

    default:
      return state;
  }
};

// create the context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = (props) => {
  const { id } = useParams();

  const [state, dispatch] = useReducer(globalReducer, initialState);
  const { updatePhotoURL, currentUser, userName } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    // console.log("GET CURRENT USER");
    setTimeout(() => getCurrentUser(currentUser.uid), 1500);
    // setTimeout(() => getStock(), 1500);
  }, [currentUser]);

  // useEffect(() => {
  //   console.log(
  //     "listOfChoosenStocksObjects in global: " +
  //       JSON.stringify(state.listOfChoosenStocksObjects)
  //   );
  // }, [state.listOfChoosenStocksObjects]);

  // useEffect(() => {
  //   console.log(
  //     "listOfChoosenStocksObjects in global: " +
  //       JSON.stringify(state.listOfChoosenStocksObjects)
  //   );
  // }, [state.listOfChoosenStocksObjects]);

  // action: get current user
  const getCurrentUser = async (uid) => {
    try {
      //Local Call
      // const res = await axios.get("/api/users/" + uid);

      //Online Call
      const res = await axios.get(
        "https://stock-prediction-server-edb82b3b4d9b.herokuapp.com/api/users/" +
          uid
      );

      if (res.data && res.data[0]) {
        dispatch({ type: "SET_USER", payload: res.data });
        // console.log("ListOfStockInList: ", res.data[0].listOfStocks);
      } else {
        console.error(
          "No data returned from API or the response format is invalid."
        );
      }

      if (
        res.data &&
        res.data[0] &&
        res.data[0].listOfStocks &&
        res.data[0].listOfStocks.length > 0
      ) {
        const stocksData = [];

        for (let i = 0; i < res.data[0].listOfStocks.length; i++) {
          const stockTicker = res.data[0].listOfStocks[i];
          try {
            //Local Call
            // const response = await axios.get(`/api/stocks/${stockTicker}`);

            //Online call
            const response = await axios.get(
              `https://stock-prediction-server-edb82b3b4d9b.herokuapp.com/api/stocks/${stockTicker}`
            );
            // console.log("request from Global: ", response.data);

            // Assuming the response data is an array of stock objects, push each stock object
            stocksData.push(...response.data); // Use spread operator to flatten
          } catch (error) {
            console.error("Error fetching stock data:", error);
          }
        }

        // Dispatch the flattened array of stocks data
        dispatch({
          type: "SET_LIST_CHOOSEN_STOCK",
          payload: stocksData, // This will be a flat array of stock objects
        });
        dispatch({
          type: "SET_OBJECT_DATA",
          payload: stocksData, // This will be a flat array of stock objects
        });
      } else {
        console.error(
          "No data returned from API or the response format is invalid."
        );
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "RESET_USER" });
    }
  };

  // <------------------------------------------>

  const updateProfileImage = (imageUrl) => {
    dispatch({
      type: "SET_PROFILE_IMAGE",
      payload: imageUrl,
    });
  };
  const updateStockSelected = (data) => {
    dispatch({
      type: "SET_SELECTED_STOCKS",
      payload: data,
    });
  };

  const updateStockData = (data) => {
    dispatch({
      type: "SET_DATA_STOCK",
      payload: data,
    });
  };

  const deleteStockData = (data) => {
    // console.log("stock to deleteStockData from context: ", data);
    dispatch({
      type: "SET_DATA_STOCK",
      payload: (prevData) => prevData.filter((stock) => stock.id !== data.id),
    });
  };

  const setUpdateProfileImage = (input) => {
    dispatch({
      type: "SET_ISOPENPHOTOUPDATED",
      payload: input,
    });
  };

  const appendToList = (name) => {
    dispatch({
      type: "SET_STOCK_NAME",
      payload: [...state.listOfStocksName, name],
    });
  };

  const appendToPastList = (data) => {
    dispatch({
      type: "SET_OBJECT_DATA",
      payload: [...state.objectDatas, data],
    });
  };

  const removeFromPastList = (data) => {
    // console.log("stock to remove from context: ", data);
    dispatch({
      type: "SET_OBJECT_DATA",
      payload: state.objectDatas.filter((item) => item.ticker !== data.ticker),
    });
  };

  const value = {
    ...state,
    getCurrentUser,
    updateProfileImage,
    setUpdateProfileImage,
    appendToList,
    updateStockSelected,
    updateStockData,
    deleteStockData,
    appendToPastList,
    removeFromPastList,
  };

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}
