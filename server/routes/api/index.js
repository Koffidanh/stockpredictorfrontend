const router = require("express").Router();
// const postRoutes = require("./posts");
const userRoutes = require("./users");
//const updatePendingRoutes = require("./pending");

// Post routes
router.use("/users", userRoutes);
// router.use("/posts", postRoutes);
// router.use("/search", userRoutes);
//router.use("/users", updatePendingRoutes);
// router.use("/dashboard", postRoutes);

module.exports = router;
