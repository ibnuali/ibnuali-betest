const express = require("express");
const AccountLogin = require("../controllers/accountController");
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route("/")
  .get(auth, AccountLogin.getAllAccounts)
  .post(auth, AccountLogin.createAccount);

router
    .route("/last-login-date-time")
    .get(auth, AccountLogin.getAccountLoginByLastLoginDateTime);

router
    .route("/login")
    .post(AccountLogin.loginAccount);

router
  .route("/:id")
  .get(auth, AccountLogin.getAccount)
  .patch(auth, AccountLogin.updateAccount)
  .delete(auth, AccountLogin.deleteAccount);


  
module.exports = router;
