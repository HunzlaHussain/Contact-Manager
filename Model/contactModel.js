const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "please enter the name"],
  },
  email: {
    type: String,
    required: [true, "please enter the email"],
  },
  phone: {
    type: String,
    required: [true, "please enter the phone"],
  },
});
module.exports = mongoose.model("Contact", contactSchema);