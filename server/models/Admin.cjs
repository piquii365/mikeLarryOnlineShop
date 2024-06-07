const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, email: true, lowercase: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  refreshToken: {
    token: { type: String },
    createdAt: {
      type: Date,
      default: Date.now(),
      expires: 30 * 8600,
    },
  },
});
module.exports = new mongoose.model("Admin", adminSchema);
