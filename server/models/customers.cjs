const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number },
  phoneNumber: { type: String, required: true },
  zone: { type: String, required: true },
});
module.exports = new mongoose.model("Customer", customerSchema);
