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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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

accountLoginSchema.pre("save", function (next) {
  this.accountId = this._id;
  next();
});

accountLoginSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
};

const AccountLogin = mongoose.model("AccountLogin", accountLoginSchema);

module.exports = AccountLogin;
