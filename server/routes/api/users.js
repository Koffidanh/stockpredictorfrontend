// const router = require("express").Router();
// const usersController = require("../../controllers/usersController");
// const stoksController = require("../../controllers/stocksController");

// // Matches with "/api/users"
// router
//   .route("/")
//   .get(usersController.findAll)
//   // .get(usersController.findByUser)
//   .post(usersController.create)
//   .put(usersController.update)
//   // .put(usersController.updateImage)
//   .delete(usersController.remove);
// // .put(usersController.updatePending)
// //.get(usersController.findByName)
// // .get(usersController.exists);

// // Matches with "/api/users/:id"
// router
//   .route("/:id")
//   .get(stoksController.findByName)
//   .get(usersController.findById);
// // .put(usersController.update)
// // .delete(usersController.remove)
// //.put(usersController.updatePending)

// module.exports = router;

const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const stoksController = require("../../controllers/stocksController");

// Matches with "/api/users"
router
  .route("/")
  .get(usersController.findAll)
  // .get(usersController.findByUser)
  .post(usersController.create)
  .put(usersController.update)
  // .put(usersController.updateImage)
  .delete(usersController.remove)
  // .put(usersController.updatePending)
  .get(usersController.findByName);

router
  .route("/:id")
  // .get(usersController.findByName)
  .get(usersController.findById);
// .put(usersController.update)
// .delete(usersController.remove)
//.put(usersController.updatePending)

module.exports = router;
