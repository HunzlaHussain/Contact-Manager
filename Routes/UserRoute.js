const express = require("express");
const {
  createuser,
  loginuser,
  currentuser,
} = require("../Controller/userController");
const validationUser = require("../Middleware/validationUser");
const userRoute = express.Router();

userRoute.route("/register").post(createuser);
userRoute.route("/login").post(loginuser);
userRoute.route("/current").get(validationUser, currentuser);
module.exports = userRoute;
