const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  fullName: { type: String, required: true },
  email: {
    type: String,
    email: true,
    required: true,
    lowercase: true,
    unique: true,
  },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  subscription: { type: Boolean, default: false },
  recentPurchases: [
    {
      items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      date: { type: Date, default: Date.now() },
      receipt: { type: mongoose.Schema.Types.ObjectId, ref: "Payments" },
    },
  ],
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
