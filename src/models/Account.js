const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const accountLoginSchema = mongoose.Schema(
  {
    accountId: {
        type: String,
        unique: true,
    },
    userName: { 
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    lastLoginDateTime: {
        type: Date,
    },
    // userId: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // }
  },
  {
    timestamps: false,
  }
);

accountLoginSchema.pre("save", async function (next) {
  const accountLogin = this;
  if (accountLogin.isModified("password")) {
    accountLogin.password = await bcrypt.hash(accountLogin.password, 8);
  }
  
  next();
});

// auto fill the userId field with the _id field
accountLoginSchema.pre("save", function (next) {
  this.accountId = this._id;
  next();
});

// remove the _id and __v fields from the response
accountLoginSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model("AccountLogin", accountLoginSchema);
