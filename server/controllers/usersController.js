const db = require("../models");
// const cloudinary = require("cloudinary").v2;
// Defining methods for the usersController

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   upload_preset: process.env.UPLOAD_PRESET,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

module.exports = {
  findAll: function (req, res) {
    db.User.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findByUser: function (req, res) {
    db.User.find({ uid: req.body.uid })
      .sort({ timestamp: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findByName: function (req, res) {
    db.User.find({
      userName: req.body.userName,
    })
      .sort({ timestamp: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User.find({ uid: req.params.id })
      .sort({ timestamp: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: (req, res) => {
    const userName = req.body.userName;
    const profileImage = req.body.profileImage;
    const uid = req.body.uid;
    const isNewUser = true;
    // const hasPassword = req.body.hasPassword;
    const newUser = new db.User({
      userName,
      profileImage,
      uid,
      isNewUser,
    });
    newUser
      .save()
      .then((user) => {
        console.log("creating a new account: ", user);
        res.status(201).json(user); // Send a successful response
      })
      .catch((err) => {
        console.error(err);
        res.status(422).json(err); // Handle errors
      });
  },
  update: function (req, res) {
    console.log(req.body);
    let params = {
      profileImage: req.body.profileImage,
    };
    // for (let prop in params) if (!params[prop]) delete params[prop];
    let params2 = {
      pendingFriendUid: req.body.pendingFriendUid,
    };
    // for (let prop in params2) if (!params2[prop]) delete params2[prop];
    let params3 = {
      friendUid: req.body.friendUid,
    };
    let params4 = {
      removedUid: req.body.removedUid,
    };
    // for (let prop in params2) if (!params2[prop]) delete params2[prop];
    let params5 = {
      requestFriendUid: req.body.uid,
    };
    // for (let prop in params2) if (!params2[prop]) delete params2[prop];
    let params6 = {
      friendUid: req.body.uid,
    };
    let params7 = {
      pendingFriendUid: req.body.uid,
    };
    let params8 = {
      requestFriendUid: req.body.requestFriendUid,
    };
    let params9 = {
      blockedUid: req.body.blockedUid,
    };
    let params10 = {
      addToFeedUid: req.body.addToFeedUid,
    };
    let params11 = {
      sent: req.body.sent,
    };

    let params12 = {
      imageCache: req.body.imageCache,
      videoCache: req.body.videoCache,
    };

    let params13 = {
      clear: req.body.clear,
    };

    let params14 = {
      publicIds: req.body.publicIds,
    };

    let params15 = {
      updateUsername: req.body.updateUsername,
    };

    let params16 = {
      hasPassword: req.body.hasPassword,
    };

    // console.log("params: " + params.profileImage)
    // console.log("params2: " + params2.pendingFriendUid)
    // console.log("params3: " + params3.friendUid)
    // console.log("params4: " + params4.removedUid)
    // console.log("params5: " + params5.requestFriendUid)
    // console.log("params6: " + params6.friendUid)
    // console.log("params7: " + params7.pendingFriendUid)
    // console.log("params8: " + params8.requestFriendUid)
    // console.log("params9: " + params9.blockedUid)
    // console.log("params10: " + params10.addToFeedUid)
    // console.log("params11: " + params11.sent)
    // console.log("params12: " + params12.cache)
    // console.log("params13: " + params13.clear)
    // console.log("params15: " + params15.updateUsername)
    // console.log("params16: " + params16.hasPassword)
    // clears the cache and removes publicIds from cloudinary
    if (params13.clear === true) {
      cloudinary.api.delete_resources(req.body.imagePublicIds);
      cloudinary.api.delete_resources(
        req.body.videoPublicIds,
        { resource_type: "video" },
        async (result) => {
          await db.User.findOneAndUpdate(
            { uid: req.body.uid },
            { $pullAll: params12 },
            { new: true }
          )
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
        }
      );
    } else if (params16.hasPassword === true) {
      db.User.findOneAndUpdate(
        { uid: req.body.uid },
        { $set: { hasPassword: true } },
        { new: true }
      )
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
    } else if (params15.updateUsername === true) {
      db.User.findOneAndUpdate(
        { uid: req.body.uid },
        { $set: { userName: req.body.username } },
        { new: true }
      )
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
    }
    // adds imageurls to cache
    else if (
      (typeof params12.imageCache !== "undefined" ||
        typeof params12.videoCache !== "undefined") &&
      params11.sent === false
    ) {
      db.User.findOneAndUpdate(
        { uid: req.body.uid },
        {
          $addToSet: {
            imageCache: req.body.imageCache,
            videoCache: req.body.videoCache,
          },
        },
        { new: true }
      )
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
    }
    // removes image urls from cache
    else if (
      (typeof params12.imageCache !== "undefined" ||
        typeof params12.videoCache !== "undefined") &&
      params11.sent === true
    ) {
      db.User.findOneAndUpdate(
        { uid: req.body.uid },
        {
          $pullAll: {
            imageCache: req.body.imageCache,
            videoCache: req.body.videoCache,
          },
        }
      )
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
    }

    // updating image
    if (typeof params.profileImage !== "undefined") {
      db.User.findOneAndUpdate({ uid: req.body.uid }, params, { new: true })
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
      // Adding friend to pending
    } else if (
      typeof params2.pendingFriendUid !== "undefined" &&
      typeof params3.friendUid === "undefined" &&
      typeof params4.removedUid === "undefined"
    ) {
      const userPromise = db.User.findOneAndUpdate(
        { uid: req.body.uid },
        {
          $addToSet: params2,
        },
        { new: true }
      );
      const targetPromise = db.User.findOneAndUpdate(
        { uid: req.body.pendingFriendUid },
        {
          $addToSet: params5,
        },
        { new: true }
      );
      Promise.all([userPromise, targetPromise])
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
    }
    // friend request accepted
    else if (
      typeof params3.friendUid !== "undefined" &&
      typeof params9.blockedUid === "undefined"
    ) {
      const userPromise = db.User.findOneAndUpdate(
        { uid: req.body.uid },
        {
          $addToSet: params3,
          $pull: params8,
        },
        { new: true }
      );
      const targetPromise = db.User.findOneAndUpdate(
        { uid: req.body.pendingFriendUid },
        {
          $addToSet: params6,
          $pull: params7,
        },
        { new: true }
      );
      Promise.all([userPromise, targetPromise])
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
    }
    // friend request cancelled
    else if (
      typeof params4.removedUid !== "undefined" &&
      typeof params9.blockedUid === "undefined" &&
      typeof params8.requestFriendUid === "undefined"
    ) {
      const userPromise = db.User.findOneAndUpdate(
        { uid: req.body.uid },
        {
          $pull: params2,
        },
        { new: true }
      );
      const targetPromise = db.User.findOneAndUpdate(
        { uid: req.body.pendingFriendUid },
        {
          $pull: params5,
        },
        { new: true }
      );
      Promise.all([userPromise, targetPromise])
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
    }
    // friend request denied
    else if (
      typeof params4.removedUid !== "undefined" &&
      typeof params9.blockedUid === "undefined" &&
      typeof params8.requestFriendUid !== "undefined"
    ) {
      const userPromise = db.User.findOneAndUpdate(
        { uid: req.body.uid },
        {
          $pull: params8,
        },
        { new: true }
      );
      const targetPromise = db.User.findOneAndUpdate(
        { uid: req.body.pendingFriendUid },
        {
          $pull: params7,
        },
        { new: true }
      );
      Promise.all([userPromise, targetPromise])
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
    }

    // friend removed
    else if (
      typeof params9.blockedUid !== "undefined" &&
      typeof params4.removedUid === "undefined"
    ) {
      const userPromise = db.User.findOneAndUpdate(
        { uid: req.body.uid },
        {
          $pull: params3,
        },
        { new: true }
      );
      const targetPromise = db.User.findOneAndUpdate(
        { uid: req.body.pendingFriendUid },
        {
          $pull: params6,
        },
        { new: true }
      );
      Promise.all([userPromise, targetPromise])
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
    }

    // user block
    else if (
      typeof params9.blockedUid !== "undefined" &&
      typeof params4.removedUid !== "undefined"
    ) {
      const userPromise = db.User.findOneAndUpdate(
        { uid: req.body.uid },
        {
          $pull: params3,
          $addToSet: params9,
        },
        { new: true }
      );
      const targetPromise = db.User.findOneAndUpdate(
        { uid: req.body.pendingFriendUid },
        {
          $pull: params6,
        },
        { new: true }
      );
      Promise.all([userPromise, targetPromise])
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
    }

    // add ids to feed
    else if (
      typeof params10.addToFeedUid !== "undefined" &&
      req.body.addToFeedTrue
    ) {
      console.log("add to feed function");
      const userPromise = db.User.findOneAndUpdate(
        { uid: req.body.uid },
        {
          $addToSet: params10,
        },
        { new: true }
      );
      Promise.all([userPromise])
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
    }

    // remove from feed
    else if (
      params10.addToFeedUid !== "undefined" &&
      req.body.removeFromFeedTrue
    ) {
      console.log("remove from feed function");
      const userPromise = db.User.findOneAndUpdate(
        { uid: req.body.uid },
        {
          $pull: params10,
        },
        { new: true }
      );
      Promise.all([userPromise])
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
    }
  },

  remove: function (req, res) {
    // let id = req.body.uid
    console.log("delete me: " + req.body.uid);

    db.User
      // .deleteOne({ "_id": id })
      // .deleteOne({ "_id": ObjectId(id) })
      .deleteOne({ uid: req.body.uid })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
