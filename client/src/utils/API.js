import axios from "axios";

// export const API = {
//   saveUser: (user) => axios.post("api/users", user),

//   getUser: (uid) => axios.get("api/users/" + uid),

//   // removeUser: (uid) => axios.delete("api/users/" + uid),
//   removeUser: (uid) => axios.delete(`/api/users/${uid}`),

//   // removeUser: (userData) => axios.delete("/api/users", { data: userData }),

//   getStockByName: (ticker) => axios.get("api/stocks/" + ticker),

//   updateUser: (uid) => axios.put("api/users/", uid),

//   removeStock: (uid) => axios.put("api/users/", uid),

//   uploadPhoto: (formData) => {
//     return axios.post("/upload", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   },
// };

export const API = {
  saveUser: (user) =>
    axios.post(
      "https://stock-prediction-server-edb82b3b4d9b.herokuapp.com/api/users",
      user
    ),

  getUser: (uid) =>
    axios.get(
      "https://stock-prediction-server-edb82b3b4d9b.herokuapp.com/api/users/" +
        uid
    ),
  removeUser: (uid) =>
    axios.delete(
      "https://stock-prediction-server-edb82b3b4d9b.herokuapp.com/api/users/" +
        uid
    ),

  getStockByName: (ticker) =>
    axios.get(
      "https://stock-prediction-server-edb82b3b4d9b.herokuapp.com/api/stocks/" +
        ticker
    ),

  updateUser: (uid) =>
    axios.put(
      "https://stock-prediction-server-edb82b3b4d9b.herokuapp.com/api/users/",
      uid
    ),

  removeStock: (uid) => axios.put("api/users/", uid),

  // uploadPhoto: (formData) => {
  //   return axios.post("https://stockpredictorfrontend-prd-8d9c2d7ae6cf.herokuapp.com//upload", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  // },
};
