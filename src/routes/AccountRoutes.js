const express = require("express");
const accountController = require("../controllers/accountController");
const auth = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .get(auth, accountController.getAllAccounts)
  .post(auth, accountController.createAccount);

router
    .route("/last-login-date-time")
    .get(auth, accountController.getAccountLoginByLastLoginDateTime);

router
    .route("/login")
    .post(accountController.loginAccount);

router
  .route("/:id")
  .get(auth, accountController.getAccount)
  .patch(auth, accountController.updateAccount)
  .delete(auth, accountController.deleteAccount);


  
module.exports = router;
