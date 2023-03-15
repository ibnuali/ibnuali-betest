const express = require("express");
const router = express.Router();

const cache = require("../middlewares/cache");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router
  .route("/")
  .get(auth, cache, userController.getAllUsers)
  .post(cache, userController.createUser);

router
  .route("/account-number/:accountNumber")
  .get(auth, userController.getUserByAccountNumber);

router
  .route("/registration-number/:registrationNumber")
  .get(auth, userController.getUserByRegistrationNumber);

router
  .route("/:id")
  .get(auth, cache, userController.getUser)
  .patch(auth, cache, userController.updateUser)
  .delete(auth, cache, userController.deleteUser);

module.exports = router;
