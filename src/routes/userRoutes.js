const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const router = express.Router();

router
  .route("/")
  .get(auth, userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/account-number/:accountNumber")
  .get(auth, userController.getUserByAccountNumber);

router
  .route("/registration-number/:registrationNumber")
  .get(auth, userController.getUserByRegistrationNumber);

router
  .route("/:id")
  .get(auth, userController.getUser)
  .patch(auth, userController.updateUser)
  .delete(auth, userController.deleteUser);

module.exports = router;
