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
  // .delete(usersController.remove)
  // .put(usersController.updatePending)
  .get(usersController.findByName);

router
  .route("/:id")
  // .get(usersController.findByName)
  .get(usersController.findById)
  // .put(usersController.update)
  .delete(usersController.deleteUser);
//.put(usersController.updatePending)
// router.route("/users").delete(userController.deleteUser);

module.exports = router;

///////////////////////////////////////////////////////

// const router = require("express").Router();
// const usersController = require("../../controllers/usersController");
// const stoksController = require("../../controllers/stocksController");

// // Matches with "/api/users"
// router
//   .route("/")
//   .get(usersController.findAll)
//   .post(usersController.create)
//   .put(usersController.update)
//   .delete(usersController.remove);

// // Matches with "/api/users/:id"
// router
//   .route("/:id")
//   .get(usersController.findById)
//   .delete(usersController.remove);

// // Matches with "/api/users/find-by-name"
// router.route("/find-by-name").get(usersController.findByName);

// // Matches with "/api/stocks/find-by-name"
// router.route("/stocks/find-by-name").get(stoksController.findByName);

// module.exports = router;
