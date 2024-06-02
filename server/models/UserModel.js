const mongoose = require("mongoose");

//CREATING SCHEMA FOR USERS
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0, //0-NormalUser, 1-Admin
    },
  },
  { timestamps: true }
);

//CREATING COLLECTION
const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};
