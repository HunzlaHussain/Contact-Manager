const errorHandler = require("express-async-handler");
const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createuser = errorHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(404);
    throw new Error("Please fill all the field");
  }
  const userexist = await User.findOne({ email });
  if (userexist) {
    res.status(500);
    throw new Error("User already exist");
  }

  const salt = await bcrypt.genSalt(10);
  // Hashing our password with a salt
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });
  res.status(201).json({
    message: "creation done",
    user,
  });
});

const loginuser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404);
    throw new Error("please provide all filed");
  }
  const userlogin = await User.findOne({ email });
  if (!userlogin) {
    res.status(404);
    throw new Error("User Not found");
  }
  const ispasswordMatch = await bcrypt.compare(password, userlogin.password);
  if (!ispasswordMatch) {
    res.status(404);
    throw new Error("User password not match");
  }
  const token = jwt.sign(
    {
      user: {
        username: userlogin.name,
        id: userlogin._id,
      },
    },
    process.env.private_token
  );
  res.status(201).json({
    message: "creation done",
    token,
  });
};

const currentuser = async (req, res) => {
  res.status(201).json({
    message: "creation done",
  });
};

module.exports = {
  createuser,
  loginuser,
  currentuser,
};
