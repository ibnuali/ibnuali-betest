const catchAsync = require("../middlewares/catchAsync");
const Account = require("../models/Account");
const User = require("../models/User");
const factory = require("./handlerFactory");

exports.getUserByAccountNumber = catchAsync(async (req, res, next) => {
  const accountNumber = req.params.accountNumber;
  const doc = await User.find({ accountNumber: accountNumber });

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: doc,
  });
});

exports.getUserByRegistrationNumber = catchAsync(async (req, res, next) => {
  const registrationNumber = req.params.registrationNumber;
  const doc = await User.find({ registrationNumber: registrationNumber });

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: doc,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { userName, password} = req.body;
  
  const doc = await User.create({
    fullName: req.body.fullName,
    emailAddress: req.body.email,
    accountNumber: req.body.accountNumber,
    registrationNumber: req.body.registrationNumber,
  });
  if (!doc) {
    return next(new AppError("failed to create document", 400));
  }

  const accountData = Account.create({
    userName: userName,
    password: password,
    lastLoginDateTime: Date.now(),
    userId: doc._id,
  });

  if (!accountData) {
    return next(new AppError("failed to create document", 400));
  }

  res.status(201).json({
    status: "success",
    data: doc,
  });
});

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
