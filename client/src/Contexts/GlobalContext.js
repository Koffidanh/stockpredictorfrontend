import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useAuth, AuthProvider } from "./AuthContext";
// import { post } from "superagent";
import { useParams } from "react-router-dom";

// import { ParamsContextProvider } from "../Contexts/ParamsContext";
// import { useParamsId } from "../Contexts/ParamsContext";

// initial state
const initialState = {
  // user: [{}],
  // fetchingUser: true,
  // posts: [],
  // fetchingPosts: true,
  // userFriend: [],
  // userFriendUid: [],
  // pendingFriend: [],
  // requestedFriend: [],
  // fetchingFriendData: true,
  // editMode: false,
  // editUuid: "",
  // concatImages: [],
  // sourceImages: [],
  // inputs: [],
  // feedUid: [],
  // concatVideos: [],
  // userProfileImage: [],
  // replyBoxUuid: "",
  // postDropdownOpen: false,
  // viewport: {
  //   width: "100vw",
  //   height: "60vh",
  //   latitude: 37.6,
  //   longitude: -95.665,
  //   zoom: 2,
  // },
};

// reducer
const globalReducer = (state, action) => {
  switch (action.type) {
    // case "SET_USER":
    //   return {
    //     ...state,
    //     user: action.payload,
    //     fetchingUser: false,
    //   };
    // case "SET_FEED_UID":
    //   return {
    //     ...state,
    //     feedUid: action.payload,
    //   };
    // case "SET_POSTS":
    //   return {
    //     ...state,
    //     posts: action.payload,
    //     fetchingPosts: false,
    //   };
    // case "SET_UPDATE_POSTS":
    //   return {
    //     ...state,
    //     posts: action.payload,
    //   };
    // case "SET_CONCAT_IMAGES":
    //   return {
    //     ...state,
    //     concatImages: action.payload,
    //   };
    // case "ADD_CONCAT_IMAGES":
    //   return {
    //     ...state,
    //     concatImages: action.payload,
    //   };
    // case "REMOVE_CONCAT_IMAGES":
    //   return {
    //     ...state,
    //     concatImages: action.payload,
    //   };
    // case "SET_SOURCE_IMAGES":
    //   return {
    //     ...state,
    //     sourceImages: action.payload,
    //   };
    // case "SET_INPUTS":
    //   return {
    //     ...state,
    //     inputs: action.payload,
    //   };
    // case "SET_EDIT_MODE":
    //   return {
    //     ...state,
    //     editMode: action.payload,
    //   };
    // case "SET_EDIT_UUID":
    //   return {
    //     ...state,
    //     editUuid: action.payload,
    //   };
    // case "RESET_USER":
    //   return {
    //     ...state,
    //     user: null,
    //     posts: [],
    //     fetchingUser: false,
    //   };

    // case "SET_FRIEND_DATA":
    //   return {
    //     ...state,
    //     userFriend: action.payload,
    //     fetchingFriendData: false,
    //   };
    // case "SET_PENDING_FRIEND_DATA":
    //   return {
    //     ...state,
    //     pendingFriend: action.payload,
    //   };
    // case "SET_REQUESTED_FRIEND_DATA":
    //   return {
    //     ...state,
    //     requestedFriend: action.payload,
    //   };

    // case "SET_CONCAT_VIDEOS":
    //   return {
    //     ...state,
    //     concatVideos: action.payload,
    //   };
    // case "ADD_CONCAT_VIDEOS":
    //   return {
    //     ...state,
    //     concatVideos: action.payload,
    //   };
    // case "REMOVE_CONCAT_VIDEOS":
    //   return {
    //     ...state,
    //     concatVideos: action.payload,
    //   };
    // case "SET_PROFILE_IMAGE":
    //   return {
    //     ...state,
    //     userProfileImage: action.payload,
    //   };

    // case "SET_REPLY_BOX_UUID":
    //   return {
    //     ...state,
    //     replyBoxUuid: action.payload,
    //   };
    // case "SET_POST_DROPDOWN":
    //   return {
    //     ...state,
    //     postDropdownOpen: action.payload,
    //   };
    // case "SET_VIEWPORT":
    //   return {
    //     ...state,
    //     viewport: action.payload,
    //   };

    default:
      return state;
  }
};

// create the context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = (props) => {
  const { id } = useParams();

  // const [params, setParams] = useParamsId();

  const [state, dispatch] = useReducer(globalReducer, initialState);
  const { updatePhotoURL, currentUser, userName } = useAuth();
  // const { uid, displayName, photoURL } = currentUser;

  // useEffect(() => {
  //   if (!currentUser) {
  //     return;
  //   }

  //   console.log("GET CURRENT USER");
  //   setTimeout(() => getCurrentUser(currentUser.uid), 1500);
  // }, [currentUser]);

  // useEffect(() => {
  //   console.log("feed state: " + state.feedUid);

  //   console.log("pending ffriends: " + JSON.stringify(state.pendingFriend));

  //   console.log("requested ffriend: " + JSON.stringify(state.requestedFriend));

  //   console.log("all ffriends: " + JSON.stringify(state.userFriend));
  // }, [state.requestedFriend]);

  // useEffect(() => {

  //     console.log("feed state initial: " + JSON.stringify(state.user[0].addToFeedUid))

  // }, []);

  // action: get current user
  // const getCurrentUser = async (uid) => {
  //   try {
  //     const res = await axios.get("/api/users/" + uid);

  //     if (res.data) {
  //       const posts = await axios.get("/api/posts/" + uid);

  //       let userFriends = [];
  //       for (let i = 0; i < res.data[0].friendUid.length; i++) {
  //         const friend = await axios.get(
  //           "/api/users/" + res.data[0].friendUid[i]
  //         );
  //         userFriends.push(friend.data);
  //       }

  //       // let pendingFriends = [];
  //       // for (let i = 0; i < res.data[0].pendingFriendUid.length; i++) {
  //       //     const pendingFriend = await axios.get("/api/users/" + res.data[0].pendingFriendUid[i])
  //       //     pendingFriends.push(pendingFriend.data)

  //       // }

  //       // let requestedFriends = [];
  //       // for (let i = 0; i < res.data[0].requestFriendUid.length; i++) {
  //       //     const requestedFriend = await axios.get("/api/users/" + res.data[0].requestFriendUid[i])
  //       //     requestedFriends.push(requestedFriend.data)

  //       // }

  //       if (posts.data) {
  //         dispatch({ type: "SET_USER", payload: res.data });
  //         dispatch({ type: "SET_FEED_UID", payload: res.data[0].addToFeedUid });
  //         dispatch({ type: "SET_FRIEND_DATA", payload: userFriends });
  //         dispatch({
  //           type: "SET_PENDING_FRIEND_DATA",
  //           payload: res.data[0].pendingFriendUid,
  //         });
  //         dispatch({
  //           type: "SET_REQUESTED_FRIEND_DATA",
  //           payload: res.data[0].requestFriendUid,
  //         });
  //         dispatch({
  //           type: "SET_PROFILE_IMAGE",
  //           payload: res.data[0].profileImage,
  //         });
  //         dispatch({
  //           type: "SET_POSTS",
  //           payload: posts.data,
  //         });
  //       }
  //     } else if (currentUser.uid) {
  //       dispatch({
  //         type: "SET_USER",
  //         payload: { ...state.user, userName: userName, uid: currentUser.uid },
  //       });
  //     } else {
  //       dispatch({ type: "RESET_USER" });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     dispatch({ type: "RESET_USER" });
  //   }
  // };

  // <------------------------------------------>

  // const updateProfileImage = (imageUrl) => {
  //   dispatch({
  //     type: "SET_PROFILE_IMAGE",
  //     payload: imageUrl,
  //   });
  // };

  // const addPost = (post) => {
  //   dispatch({
  //     type: "SET_POSTS",
  //     payload: [post, ...state.posts],
  //   });
  // };

  // const removePost = (postId) => {
  //   console.log("postId: " + postId);
  //   // if (post.complete) {
  //   dispatch({
  //     type: "SET_POSTS",
  //     payload: state.posts.filter((posts) => posts.uuid !== postId),
  //   });
  // };

  // const updatePost = (postId, editPost) => {
  //   console.log("CONTEXT postId: " + postId);
  //   dispatch({
  //     type: "SET_UPDATE_POSTS",
  //     payload: state.posts.map((post) =>
  //       post.uuid === postId
  //         ? {
  //             ...post,
  //             title: editPost.title,
  //             description: editPost.description,
  //             image: editPost.image,
  //             source: editPost.source,
  //             video: editPost.video,
  //             latitude: editPost.latitude,
  //             longitude: editPost.longitude,
  //             visitDate: editPost.visitDate,
  //           }
  //         : post
  //     ),
  //   });
  // };

  // const appendToFeed = (friendUid) => {
  //   dispatch({
  //     type: "SET_FEED_UID",
  //     payload: [...state.feedUid, friendUid],
  //   });
  // };
  // const deleteFromFeed = (friendUid) => {
  //   dispatch({
  //     type: "SET_FEED_UID",
  //     payload: state.feedUid.filter((uid) => uid !== friendUid),
  //   });
  // };

  // const appendToPending = (friendUid) => {
  //   dispatch({
  //     type: "SET_PENDING_FRIEND_DATA",
  //     payload: [...state.pendingFriend, friendUid],
  //   });
  // };
  // const deleteFromPending = (friendUid) => {
  //   dispatch({
  //     type: "SET_PENDING_FRIEND_DATA",
  //     payload: state.pendingFriend.filter((uid) => uid !== friendUid),
  //   });
  // };

  // const appendToRequested = (friendUid) => {
  //   dispatch({
  //     type: "SET_REQUESTED_FRIEND_DATA",
  //     payload: [...state.requestedFriend, friendUid],
  //   });
  // };
  // const deleteFromRequested = (friendUid) => {
  //   dispatch({
  //     type: "SET_REQUESTED_FRIEND_DATA",
  //     payload: state.requestedFriend.filter((uid) => uid !== friendUid),
  //   });
  // };

  // const updateReplyBoxUuid = (uuid) => {
  //   dispatch({
  //     type: "SET_REPLY_BOX_UUID",
  //     payload: uuid,
  //   });
  // };

  // const setPostDropdownOpen = (boolean) => {
  //   dispatch({
  //     type: "SET_POST_DROPDOWN",
  //     payload: boolean,
  //   });
  // };

  // const setViewport = (value) => {
  //   dispatch({
  //     type: "SET_VIEWPORT",
  //     payload: value,
  //   });
  // };
  // const appendToFeed = (friendUid) => {

  //     dispatch({
  //         type: "UPDATE_USER",
  //         payload:
  //             { ...state.user, addToFeedUid: [friendUid, ...state.user[0].addToFeedUid] }

  //     });
  //     console.log("feed State: " + JSON.stringify(state.user[0].addToFeedUid))
  // };
  // const deleteFromFeed = (friendUid) => {

  //     dispatch({
  //         type: "UPDATE_USER",
  //         payload: state.user.filter(
  //             (feed) => feed.addToFeedUid !== friendUid
  //         ),
  //     });
  //     console.log("feed State: " + JSON.stringify(state.user[0].addToFeedUid))

  // };

  // const addComment = (postId, newComment) => {
  //   console.log("ADDCOMMENT postId: " + postId);
  //   console.log("ADDCOMMENT: " + newComment);
  //   dispatch({
  //     type: "SET_UPDATE_POSTS",
  //     payload: state.posts.map((post) =>
  //       post.uuid === postId
  //         ? {
  //             ...post,
  //             comments: [...post.comments, newComment],
  //           }
  //         : post
  //     ),
  //   });
  // };

  // const updateComment = (postId, commentId, updatedComment) => {
  //   console.log("CONTEXT updatedComment: " + updatedComment.commentDescription);
  //   dispatch({
  //     type: "SET_UPDATE_POSTS",
  //     payload: state.posts.map((post) =>
  //       post.uuid === postId
  //         ? {
  //             ...post,
  //             comments: post.comments.map((comment) =>
  //               comment.commentUuid === commentId
  //                 ? {
  //                     ...comment,
  //                     commentDescription: updatedComment.commentDescription,
  //                     commentImage: updatedComment.commentImage,
  //                     commentVideo: updatedComment.commentVideo,
  //                   }
  //                 : comment
  //             ),
  //           }
  //         : post
  //     ),
  //   });
  // };

  // const removeComment = (postId, commentId) => {
  //   console.log("postId: " + postId);
  //   // if (post.complete) {
  //   dispatch({
  //     type: "SET_UPDATE_POSTS",
  //     payload: state.posts.map((post) =>
  //       post.uuid === postId
  //         ? {
  //             ...post,
  //             comments: post.comments.filter(
  //               (comment) => comment.commentUuid !== commentId
  //             ),
  //           }
  //         : post
  //     ),
  //   });
  // };

  // const addReply = (postId, commentId, newReply) => {
  //   console.log("ADDREPLY postId: " + postId);
  //   console.log("ADDREPLY commentId: " + commentId);
  //   console.log("ADDREPLY: " + JSON.stringify(newReply));
  //   dispatch({
  //     type: "SET_UPDATE_POSTS",
  //     payload: state.posts.map((post) =>
  //       post.uuid === postId
  //         ? {
  //             ...post,
  //             comments: post.comments.map((comment) =>
  //               comment.commentUuid === commentId
  //                 ? {
  //                     ...comment,
  //                     replies: [...comment.replies, newReply],
  //                   }
  //                 : comment
  //             ),
  //           }
  //         : post
  //     ),
  //   });
  // };

  // const updateReply = (postId, commentId, replyId, updatedReply) => {
  //   console.log("CONTEXT updatedReply: " + updatedReply.replyDescription);
  //   dispatch({
  //     type: "SET_UPDATE_POSTS",
  //     payload: state.posts.map((post) =>
  //       post.uuid === postId
  //         ? {
  //             ...post,
  //             comments: post.comments.map((comment) =>
  //               comment.commentUuid === commentId
  //                 ? {
  //                     ...comment,
  //                     replies: comment.replies.map((reply) =>
  //                       reply.replyUuid === replyId
  //                         ? {
  //                             ...reply,
  //                             replyDescription: updatedReply.replyDescription,
  //                             replyImage: updatedReply.replyImage,
  //                             replyVideo: updatedReply.replyVideo,
  //                           }
  //                         : reply
  //                     ),
  //                   }
  //                 : comment
  //             ),
  //           }
  //         : post
  //     ),
  //   });
  // };

  // const removeReply = (postId, commentId, replyId) => {
  //   console.log("postId: " + postId);
  //   // if (post.complete) {
  //   dispatch({
  //     type: "SET_UPDATE_POSTS",
  //     payload: state.posts.map((post) =>
  //       post.uuid === postId
  //         ? {
  //             ...post,
  //             comments: post.comments.map((comment) =>
  //               comment.commentUuid === commentId
  //                 ? {
  //                     ...comment,
  //                     replies: comment.replies.filter(
  //                       (reply) => reply.replyUuid !== replyId
  //                     ),
  //                   }
  //                 : comment
  //             ),
  //           }
  //         : post
  //     ),
  //   });
  // };

  // //<------------------------------------------------>

  // const setConcatVideos = (videos) => {
  //   console.log("setConcatVideos: " + videos);
  //   dispatch({
  //     type: "SET_CONCAT_VIDEOS",
  //     payload: videos,
  //   });
  // };

  // //<------------------------------------------------>

  // const setConcatImages = (images) => {
  //   console.log("setConcatImages: " + images);
  //   dispatch({
  //     type: "SET_CONCAT_IMAGES",
  //     payload: images,
  //   });
  // };

  // const setInputs = (inputs) => {
  //   console.log("inputs: " + inputs);
  //   dispatch({
  //     type: "SET_INPUTS",
  //     payload: inputs,
  //   });
  // };

  // const setSourceImages = (images) => {
  //   console.log("setSourceImages: " + images);
  //   // if (post.complete) {
  //   dispatch({
  //     type: "SET_SOURCE_IMAGES",
  //     payload: images,
  //   });
  // };

  // dispatch({
  //     type: "SET_POSTS",
  //     payload:
  //         (posts) => posts.map((post) => post.uuid === postId ? {
  //             ...post,
  //             editStr
  //         } : post)

  // });

  // dispatch({
  //     type: "SET_POSTS",
  //     payload:
  //         (posts) => posts.map((post) => post.uuid === postId ? {
  //             ...post,
  //             title: editPost.title,
  //             description: editPost.description,
  //             image: editPost.image,
  //             source: editPost.source,
  //             latitude: editPost.latitude,
  //             longitude: editPost.longitude,
  //             visitDate: editPost.visitDate,

  //         } : post)

  // });

  // const updateEditMode = (boolean, uuid) => {
  //   console.log("updateEditMode boolean: " + boolean);
  //   console.log("updateEditMode uuid: " + uuid);
  //   dispatch({
  //     type: "SET_EDIT_MODE",
  //     payload: boolean,
  //   });
  //   dispatch({
  //     type: "SET_EDIT_UUID",
  //     payload: uuid,
  //   });
  // };

  // const updateToDo = (toDo) => {
  //     if (toDo.complete) {
  //         const newCompleteToDos = state.completeToDos.map((completeToDo) =>
  //             completeToDo._id !== toDo._id ? completeToDo : toDo
  //         );

  //         dispatch({
  //             type: "SET_COMPLETE_TODOS",
  //             payload: newCompleteToDos,
  //         });
  //     } else {
  //         const newIncompleteToDos = state.incompleteToDos.map((incompleteToDo) =>
  //             incompleteToDo._id !== toDo._id ? incompleteToDo : toDo
  //         );

  //         dispatch({
  //             type: "SET_INCOMPLETE_TODOS",
  //             payload: newIncompleteToDos,
  //         });
  //     }
  // };

  const value = {
    // ...state,
    // getCurrentUser,
    // setConcatImages,
    // setSourceImages,
    // setInputs,
    // // logout,
    // addPost,
    // removePost,
    // updateEditMode,
    // updatePost,
    // addComment,
    // updateComment,
    // removeComment,
    // addReply,
    // updateReply,
    // removeReply,
    // appendToFeed,
    // deleteFromFeed,
    // appendToPending,
    // deleteFromPending,
    // appendToRequested,
    // deleteFromRequested,
    // setConcatVideos,
    // updateProfileImage,
    // updateReplyBoxUuid,
    // setPostDropdownOpen,
    // setViewport,
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
