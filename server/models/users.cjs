const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    email: true,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: { type: String, required: true },
  refreshToken: {
    token: { type: String },
    createdAt: {
      type: Date,
      default: Date.now(),
      expires: 30 * 8600,
    },
  },
});
module.exports = new mongoose.model("Users", userSchema);
