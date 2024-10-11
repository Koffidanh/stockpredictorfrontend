import axios from "axios";

export const API = {
  saveUser: (user) => axios.post("api/users", user),

  getUser: (uid) => axios.get("api/users/" + uid),

  // getStockByName: (ticker) => axios.get("api/stockPredictions/" + ticker),
  getStockByName: (ticker) => axios.get("api/stocks/" + ticker),

  //   getUserByParam: (uid) => axios.get("api/users/" + uid),

  updateUser: (uid) => axios.put("api/users/", uid),

  //   updatePost: (uid) => axios.put("api/posts/", uid),

  //   savePost: (post) => axios.post("api/posts", post),

  //   getPost: (uid) => axios.get("api/posts/" + uid),

  //   removeUser: (uid) => axios.delete("api/users/", uid),

  //   removePost: (id) => axios.delete("api/posts/", id),

  uploadPhoto: (formData) => {
    return axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

// import axios from "axios";

// export const API = {
//   saveUser: (user) => axios.post("https://voyagrapp.herokuapp.com/api/users", user),

//   getUser: (uid) => axios.get("https://voyagrapp.herokuapp.com/api/users/" + uid),

//   getUserByName: (userName) => axios.get("https://voyagrapp.herokuapp.com/api/users/" + userName),

//   getUserByParam: (uid) => axios.get("https://voyagrapp.herokuapp.com/api/users/" + uid),

//   updateUser: (uid) => axios.put("https://voyagrapp.herokuapp.com/api/users/", uid),

//   updatePost: (uid) => axios.put("https://voyagrapp.herokuapp.com/api/posts/", uid),

//   savePost: (post) => axios.post("https://voyagrapp.herokuapp.com/api/posts", post),

//   getPost: (uid) => axios.get("https://voyagrapp.herokuapp.com/api/posts/" + uid),

//   removeUser: (uid) => axios.delete("https://voyagrapp.herokuapp.com/api/users/", uid),

//   removePost: (id) => axios.delete("https://voyagrapp.herokuapp.com/api/posts/", id),

//   };

// import axios from "axios";

// const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

// console.log("API Base URL:", BASE_URL); // Log the base URL

// export const API = {
//   saveUser: (user) => axios.post(`${BASE_URL}/users`, user),

//   getUser: (uid) => axios.get(`${BASE_URL}/users/${uid}`),

//   updateUser: (uid, userData) =>
//     axios.put(`${BASE_URL}/users/${uid}`, userData),

//   removeUser: (uid) => axios.delete(`${BASE_URL}/users/${uid}`),

//   // Uncomment and implement as needed
//   // getUserByName: (userName) => axios.get(`${BASE_URL}/users/${userName}`),
//   // getPost: (uid) => axios.get(`${BASE_URL}/posts/${uid}`),
//   // savePost: (post) => axios.post(`${BASE_URL}/posts`, post),
//   // removePost: (id) => axios.delete(`${BASE_URL}/posts/${id}`),
// };
