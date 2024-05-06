const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the name"],
  },
  email: {
    type: String,
    required: [true, "please provide the email"],
  },
  password: {
    type: String,
    required: [true, "please provide the Password"],
  },
});

module.exports = mongoose.model("User", userSchema);
