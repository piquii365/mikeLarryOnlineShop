const mongoose = require("mongoose");
const paymentsSchema = new mongoose.Schema({
  paynowReference: { type: String, required: true },
  customerName: { type: String },
  customerEmail: { type: String },
  customerPhone: { type: String },
  transactionAmount: { type: Number },
  amountPaid: { type: Number },
});
module.exports = new mongoose("Payments", paymentsSchema);
