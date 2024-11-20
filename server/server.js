const express = require("express");
const path = require("path");
const session = require("express-session");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
// const middlewares = require("././middleware/middlewares");

const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

require("dotenv").config();

const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Required to rate limits by Client IP
app.enable("trust proxy");

// Define middleware here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(cors());
app.options("*", cors());

// Set Cross-Origin-Opener-Policy header
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use(
  session({ secret: "stockPredictor", resave: true, saveUninitialized: true })
);

app.use(routes);

// Connect to the Mongo DB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/stockPredictordb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
