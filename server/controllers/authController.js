const { User } = require("../models/userModel");
const { UserDetails } = require("../models/UserDetails");

const { validationResult } = require("express-validator");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;
    const isExistUser = await User.findOne({ email });

    if (isExistUser) {
      return res.status(200).json({
        success: false,
        msg: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const userdata = await user.save();

    const objforuserdetails=new UserDetails({
      userId:userdata._id,
      name,
      email
    })

    await objforuserdetails.save();
  
    return res.status(200).json({
      success: true,
      msg: "Registered user successfully",
      data: userdata,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

const generateAccessToken = async (user) => {
  const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: "2h",
  });
  return token;
};

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    const userdata = await User.findOne({ email });
    if (!userdata) {
      return res.status(400).json({
        success: false,
        msg: "email and password is incorrect",
      });
    }

    const isPasswordmatch = await bcrypt.compare(password, userdata.password);
    if (!isPasswordmatch) {
      return res.status(400).json({
        success: false,
        msg: "email and password is incorrect",
      });
    }

    const accesstoken = await generateAccessToken({ user: userdata });

    return res.status(200).json({
      success: true,
      accesstoken: accesstoken,
      type: "Bearer",
      msg: "Login user successfully",
      data: userdata,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

const getProfile = async (req, res) => {

  const id=req.user._id;

  const profile=await UserDetails.findOne({userId:id});
  try {
    return res.status(200).json({
      success: true,
      msg: "Profile fetched successfully",
      data:profile,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

const updateprofile = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }

    const id=req.user._id;
    const {branch,year, cgpa, backlogs, tenth, twelth } =
      req.body;

    var updateprofile = {
      year,
      branch,
      cgpa,
      backlogs,
      tenth,
      twelth,
    };

    const isExist = await UserDetails.findOne({ userId: id });

    if (!isExist) {
      return res.status(400).json({
        success: false,
        msg: "User not exist or not registered",
      });
    }

    const updatedprofile = await UserDetails.findOneAndUpdate(
      { userId: id },
      {
        $set: updateprofile,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      msg: "profile updated successfully",
      data: updatedprofile,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};




module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateprofile,
};
