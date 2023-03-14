const express = require("express");
const UserController = require("../controllers/UserController");
// const middleware = require('../middleware/validator');

const router = express.Router();

router
  .route("/")
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

router
  .route("/:id")
  .get(UserController.getUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);
  
module.exports = router;
