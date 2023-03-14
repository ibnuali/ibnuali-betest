const express = require("express");
const AccountLogin = require("../controllers/AccountLogin");
// const middleware = require('../middleware/validator');

const router = express.Router();

router
  .route("/")
  .get(AccountLogin.getAllAccounts)
  .post(AccountLogin.createAccount);

router
  .route("/:id")
  .get(AccountLogin.getAccount)
  .patch(AccountLogin.updateAccount)
  .delete(AccountLogin.deleteAccount);
  
module.exports = router;
