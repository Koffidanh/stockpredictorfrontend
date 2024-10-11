const mongoose = require("mongoose");
const db = require("../models");

console.log("Connecting to database...");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/stockPredictordb"
);

const newStockSeed = [
  {
    ticker: "AAA",
    actual: [],
    last_trained: "2024-10-08T08:56:21.448+00:00",
    loss: 0, // Provide a valid numeric value for loss
    predictions: [],
  },
  {
    ticker: "BBB",
    actual: [],
    last_trained: "2024-10-08T08:56:21.448+00:00",
    loss: 0, // Provide a valid numeric value for loss
    predictions: [],
  },
  {
    ticker: "AABB",
    actual: [497.1, 500.0, 505.3], // Example values
    last_trained: new Date("2024-10-10T19:28:10.497Z"), // Use a Date object
    loss: 497.1004943847656,
    predictions: [500.0, 505.0, 510.0], // Example values
  },
];

console.log("Deleting existing stocks...");
db.Stocks.deleteMany({})
  .then(() => {
    console.log("Inserting new stocks...");
    return db.Stocks.insertMany(newStockSeed); // Corrected to insert stocks
  })
  .then((data) => {
    console.log(`Inserted ${data.length} stocks.`);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error:", err);
    mongoose.disconnect();
  });
