const Account = require("../models/Account");
const User = require("../models/User");
const factory = require("./handlerFactory");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const catchAsync = require("../middlewares/catchAsync");

// create get account login by lastLoginDateTime > 3 days
exports.getAccountLoginByLastLoginDateTime = async (req, res, next) => {
  const limit3Days = 3 * 24 * 60 * 60 * 1000;
  const doc = await Account.find({
    lastLoginDateTime: { $lt: new Date(Date.now() - limit3Days) },
  });
  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: doc,
  });
};

exports.loginAccount = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  const accountData = await Account.findOne({ userName: username });
  if (!accountData) {
    return next(new AppError("No document found with that ID", 404));
  }

  if (accountData && (await bcrypt.compare(password, accountData.password))) {
    // update data account to fill lastLoginDateTime
    await Account.findByIdAndUpdate(
      accountData._id,
      { lastLoginDateTime: Date.now() },
      { new: true, runValidators: true }
    );

    const token = jwt.sign(
      { user_id: accountData._id, username },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    console.log(token);
    res.status(200).json({
      status: "success",
      token: token,
    });
  } else {
    res.status(400).json({ message: "Username or password is incorrect" });
  }
});

exports.getAllAccounts = factory.getAll(Account);
exports.getAccount = factory.getOne(Account);
exports.createAccount = factory.createOne(Account);
exports.updateAccount = factory.updateOne(Account);
exports.deleteAccount = factory.deleteOne(Account);
