const mongoose = require("mongoose");
const userScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    startMerbership: {
      type: Date,
    },
    endMerbership: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);

const usersModel = new mongoose.model("usersOTT", userScheme);

module.exports = usersModel;
