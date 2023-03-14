const express = require("express");
const UserController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const router = express.Router();

router
  .route("/")
  .get(auth, UserController.getAllUsers)
  .post(UserController.createUser);

router
  .route("/account-number/:accountNumber")
  .get(auth, UserController.getUserByAccountNumber);

router
  .route("/registration-number/:registrationNumber")
  .get(auth, UserController.getUserByRegistrationNumber);

router
  .route("/:id")
  .get(auth, UserController.getUser)
  .patch(auth, UserController.updateUser)
  .delete(auth, UserController.deleteUser);

module.exports = router;
