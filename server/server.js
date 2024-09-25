// const express = require("express");
// const path = require("path");
// const session = require("express-session");
// const morgan = require("morgan");
// const helmet = require("helmet");
// const cors = require("cors");
// const mongoose = require("mongoose");
// // const middlewares = require("././middleware/middlewares");

// require("dotenv").config();

// const routes = require("./routes");
// const app = express();
// const PORT = process.env.PORT || 3001;

// // Required to rate limits by Client IP
// app.enable("trust proxy");

// // Define middleware here
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(morgan("common"));
// app.use(helmet());
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//   })
// );
// app.use(cors());
// app.options("*", cors());

// app.use(
//   session({ secret: "stockPredictor", resave: true, saveUninitialized: true })
// );

// app.use(routes);

// // Connect to the Mongo DB
// mongoose
//   .connect(process.env.MONGODB_URI || "mongodb://localhost/stockPredictordb", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected!"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // if (process.env.NODE_ENV === "production") {
// //   app.use(express.static("client/build"));
// // }
// // app.get("*", function (req, res) {
// //   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// // });

// // Add routes, both API and view
// // app.use(middlewares.notFound);
// // app.use(middlewares.errorHandler);

// // if (process.env.NODE_ENV === "production") {
// //   // app.use(express.static("client/build"));
// //   app.use(express.static("client/build"));
// //   app.get("*", (req, res) => {
// //     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// //   })
// // }

// // For production
// // app.listen(process.env.PORT, function () {
// //   console.log(`🌎  ==> API Server now running!`);
// // });

// app.listen(PORT, function () {
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
// });

// // const express = require("express");
// // const usersRoutes = require("./routes/api/users");

// // const app = express();

// // // Middleware
// // app.use(express.json());

// // // Routes
// // app.use("/api", usersRoutes);

// // const PORT = process.env.PORT || 3001;
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });

const express = require("express");
const path = require("path");
const session = require("express-session");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
// const middlewares = require("././middleware/middlewares");

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

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

// Add routes, both API and view
// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

// if (process.env.NODE_ENV === "production") {
//   // app.use(express.static("client/build"));
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   })
// }

// For production
// app.listen(process.env.PORT, function () {
//   console.log(`🌎  ==> API Server now running!`);
// });

app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

// const express = require("express");
// const usersRoutes = require("./routes/api/users");

// const app = express();

// // Middleware
// app.use(express.json());

// // Routes
// app.use("/api", usersRoutes);

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
