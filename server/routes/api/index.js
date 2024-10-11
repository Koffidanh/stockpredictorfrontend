const router = require("express").Router();
const stockRoutes = require("./stocks");
const userRoutes = require("./users");
//const updatePendingRoutes = require("./pending");

// Post routes
router.use("/users", userRoutes);
router.use("/stocks", stockRoutes);
// router.use("/search", userRoutes);
//router.use("/users", updatePendingRoutes);
// router.use("/dashboard", postRoutes);

module.exports = router;
