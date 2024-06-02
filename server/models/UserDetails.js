const mongoose = require("mongoose");

const userdetailsSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  email: {
    type: String,
    default:"",
    required: [true, "email field is required"],
  },
  year: {
    type: Number,
    default:""
  },
  branch: {
    type: String,
    default:"",
  },
  cgpa: {
    type: Number,
    default:"",
  },
  backlogs: {
    type: Number,
    default:"",
  },
  tenth: {
    type: Number,
    default:"",
  },
  twelth: {
    type: Number,
    default:"",
  },
});

const UserDetails = mongoose.model("userDetails", userdetailsSchema);
module.exports = {
  UserDetails,
};
