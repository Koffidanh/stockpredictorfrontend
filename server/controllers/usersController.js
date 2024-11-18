// const db = require("../models");

// module.exports = {
//   findAll: function (req, res) {
//     db.User.find(req.query)
//       .sort({ date: -1 })
//       .then((dbModel) => res.json(dbModel))
//       .catch((err) => res.status(422).json(err));
//   },
//   findByUser: function (req, res) {
//     db.User.find({ uid: req.body.uid })
//       .sort({ timestamp: -1 })
//       .then((dbModel) => res.json(dbModel))
//       .catch((err) => res.status(422).json(err));
//   },
//   findByName: function (req, res) {
//     db.User.find({
//       userName: req.body.userName,
//     })
//       .sort({ timestamp: -1 })
//       .then((dbModel) => res.json(dbModel))
//       .catch((err) => res.status(422).json(err));
//   },
//   findById: function (req, res) {
//     db.User.find({ uid: req.params.id })
//       .sort({ timestamp: -1 })
//       .then((dbModel) => res.json(dbModel))
//       .catch((err) => res.status(422).json(err));
//   },
//   create: (req, res) => {
//     const userName = req.body.userName;
//     const profileImage = req.body.profileImage;
//     const uid = req.body.uid;
//     const isNewUser = true;

//     const newUser = new db.User({
//       userName,
//       profileImage,
//       uid,
//       isNewUser,
//     });

//     newUser
//       .save()
//       .then((user) => {
//         console.log("creating a new account: ", user);
//         res.status(201).json(user); // Send a successful response
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(422).json(err); // Handle errors
//       });
//   },
//   update: function (req, res) {
//     console.log(req.body);
//     let updateFields = {}; // Use a single object to hold update fields

//     // Check if there's a new profile image
//     if (req.body.profileImage) {
//       updateFields.profileImage = req.body.profileImage;
//     }

//     // Check if removing a stock
//     if (req.body.deleteStock) {
//       updateFields.listOfStocks = req.body.deleteStock;
//     }

//     // Update username if necessary
//     if (req.body.updateUsername === true) {
//       updateFields.userName = req.body.username;
//     }

//     // Prepare to update the listOfStocks if provided
//     let updateListOfStocks = false;
//     if (req.body.listOfStocks) {
//       updateListOfStocks = req.body.listOfStocks; // Get the new stock to be added
//     }

//     // Update hasPassword if necessary
//     if (req.body.hasPassword === true) {
//       updateFields.hasPassword = true;
//     }

//     // Perform the update only if there are fields to update
//     const updates = {};

//     // Set the update fields
//     if (Object.keys(updateFields).length > 0) {
//       updates.$set = updateFields;
//     }

//     // Handle adding to the listOfStocks
//     if (updateListOfStocks) {
//       updates.$addToSet = { listOfStocks: { $each: updateListOfStocks } }; // Add new stocks
//     }

//     // Handle removing to the listOfStocks
//     if (deleteaStocksFromList) {
//       updates.$pullToSet = { listOfStocks: { $each: updateListOfStocks } }; // remove  stocks
//     }

//     if (Object.keys(updates).length > 0) {
//       db.User.findOneAndUpdate({ uid: req.body.uid }, updates, { new: true })
//         .then((dbModel) => res.json(dbModel))
//         .catch((err) => res.status(422).json(err));
//     } else {
//       res.status(400).json({ message: "No fields to update." }); // Respond with a message if nothing to update
//     }
//   },

//   // removeStock: function (req, res) {
//   //   const { uid, stockTicker } = req.body;

//   //   db.User.findOneAndUpdate(
//   //     { uid },
//   //     { $pull: { listOfStocks: stockTicker } },
//   //     { new: true }
//   //   )
//   //     .then((dbModel) => res.json(dbModel))
//   //     .catch((err) => res.status(422).json(err));
//   // },

//   remove: function (req, res) {
//     console.log("delete me: " + req.body.uid);

//     db.User.deleteOne({ uid: req.body.uid })
//       .then((dbModel) => res.json(dbModel))
//       .catch((err) => res.status(422).json(err));
//   },
// };

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
      isNewUser,
    });

    newUser
      .save()
      .then((user) => {
        console.log("creating a new account: ", user);
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

  remove: function (req, res) {
    console.log("delete me: " + req.body.uid);

    db.User.deleteOne({ uid: req.body.uid })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
