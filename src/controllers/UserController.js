const catchAsync = require("../middlewares/catchAsync");
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

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
