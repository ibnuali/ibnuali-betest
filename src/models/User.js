const mongoose = require("mongoose");
const validator = require('validator')

const userSchema = mongoose.Schema(
  {
    userId: {
        type: String,
        unique: true,
    },
    fullName: { 
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
    },
  },
  {
    timestamps: false,
  }
);

userSchema.pre("save", function (next) {
  this.userId = this._id;
  next();
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
};
  

module.exports = mongoose.model("User", userSchema);
