const db = require("../models");

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
    const { userName, profileImage, uid } = req.body;
    const isNewUser = true;

    const newUser = new db.User({
      userName,
      profileImage,
      uid,
      // joinedDate,
      // lastLogin,
      // typeOfSusbcription,
      // susbcriptionStatus,
      // susbcriptionStartDate,
      // susbcriptionEndDate,
      // susbcriptionRenewalDate,
      isNewUser,
    });

    newUser
      .save()
      .then((user) => {
        // console.log("creating a new account: ", user);
        res.status(201).json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(422).json(err);
      });
  },
  update: function (req, res) {
    const {
      uid,
      profileImage,
      updateUsername,
      username,
      hasPassword,
      listOfStocks,
      deleteStock,
      stockTicker,
      // joinedDate,
      // lastLogin,
      // typeOfSusbcription,
      // susbcriptionStatus,
      // susbcriptionStartDate,
      // susbcriptionEndDate,
      // susbcriptionRenewalDate,
    } = req.body;
    let updateFields = {};

    // Profile image update
    if (profileImage) {
      updateFields.profileImage = profileImage;
    }

    // Username update
    if (updateUsername) {
      updateFields.userName = username;
    }

    // Password update
    if (hasPassword) {
      updateFields.hasPassword = true;
    }

    // Adding stocks
    if (listOfStocks) {
      updateFields.$addToSet = { listOfStocks: { $each: listOfStocks } };
    }

    // Removing a stock if deleteStock and stockTicker are provided
    if (deleteStock && stockTicker) {
      updateFields.$pull = { listOfStocks: stockTicker };
    }

    if (Object.keys(updateFields).length > 0) {
      db.User.findOneAndUpdate({ uid: uid }, updateFields, { new: true })
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
    } else {
      res.status(400).json({ message: "No fields to update." });
    }
  },

  // remove: function (req, res) {
  //   console.log("delete me: " + req.body.uid);

  //   db.User.deleteOne({ uid: req.body.uid })
  //     .then((dbModel) => res.json(dbModel))
  //     .catch((err) => res.status(422).json(err));
  // },
  deleteUser: function (req, res) {
    console.log("delete me: " + req.body.uid);
    db.User.findOneAndDelete({ uid: req.body.uid }) // Match based on UID
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
