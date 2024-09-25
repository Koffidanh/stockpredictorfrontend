const mongoose = require("mongoose");
const db = require("../models");

console.log("Connecting to database...");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/stockPredictordb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const newUserSeed = [
  { userName: "Tom", profileImage: [], uid: "1", listSelectedStocks: [] },
  { userName: "Jerry", profileImage: [], uid: "2", listSelectedStocks: [] },
  { userName: "Bill", profileImage: [], uid: "3", listSelectedStocks: [] },
  { userName: "James", profileImage: [], uid: "4", listSelectedStocks: [] },
  { userName: "Smith", profileImage: [], uid: "5", listSelectedStocks: [] },
  { userName: "Phillip", profileImage: [], uid: "6", listSelectedStocks: [] },
  { userName: "Kim", profileImage: [], uid: "7", listSelectedStocks: [] },
];

console.log("Deleting existing users...");
db.User.deleteMany({})
  .then(() => {
    console.log("Inserting new users...");
    return db.User.insertMany(newUserSeed);
  })
  .then((data) => {
    console.log(`Inserted ${data.length} users.`);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error:", err);
    mongoose.disconnect();
  });
