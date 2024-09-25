// const mongoose = require("mongoose");
// const { Schema } = mongoose;
// const requiredNumber = { type: Number, required: true };
// const UserSchema = new Schema({
//   userName: {
//     type: String,
//   },
//   profileImage: [{ type: String }],
//   uid: { type: String },

//   isNewUser: {
//     type: Boolean,
//   },
//   // post: [
//   //   {
//   //     type: Schema.Types.ObjectId,
//   //     ref: "newPost",
//   //   },
//   // ],
// });
// const User = mongoose.model("user", UserSchema);
// module.exports = User;

const mongoose = require("mongoose");
const { Schema } = mongoose;
const requiredNumber = { type: Number, required: true };
const UserSchema = new Schema({
  userName: {
    type: String,
  },
  profileImage: [{ type: String }],
  uid: { type: String },
  // pendingFriendUid: [{ type: String }],
  // friendUid: [{ type: String }],
  // requestFriendUid: [{ type: String }],
  // removedUid: [{ type: String }],
  // blockedUid: [{ type: String }],
  // addToFeedUid: [{ type: String }],
  // imageCache: [{ type: String }],
  // videoCache: [{ type: String }],
  isNewUser: {
    type: Boolean,
  },
  post: [
    {
      type: Schema.Types.ObjectId,
      ref: "newPost",
    },
  ],
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
