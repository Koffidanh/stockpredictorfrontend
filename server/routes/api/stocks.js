const router = require("express").Router();
// const usersController = require("../../controllers/usersController");
const stoksController = require("../../controllers/stocksController");

// Matches with "/api/users"
router
  .route("/:ticker")

  .get(stoksController.findByName);

module.exports = router;
