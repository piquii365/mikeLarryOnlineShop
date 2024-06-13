const { Paynow } = require("paynow");
const { v4: refrence } = require("uuid");
const MultiOrder = require("../models/multpleOrders.cjs");
const INTEGRATION_ID = process.env.PAYNOW_INTERGRATION_ID;
const INTEGRATION_KEY = process.env.PAYNOW_INTERGRATION_KEY;
const resultUrl = process.env.RESULT_URL;
const returnUrl = process.env.RETURN_URL;

const multiplePayments = async (req, res) => {
  try {
    const { cartItems, customerInfo } = req.body;
    if (cartItems && customerInfo) {
      const ref = refrence();
      let paynow = new Paynow(INTEGRATION_ID, INTEGRATION_KEY);
      paynow.resultUrl = resultUrl;
      paynow.returnUrl = returnUrl;
      let payment = paynow.createPayment(ref, customerInfo.email);
      await cartItems.forEach((item) => {
        payment.add(
          item.name,
          item.discount === 0 ? item.price : item.discount,
          item.quantity
        );
      });
      const result = await paynow.send(payment);
      const order = cartItems.map((item) => {
        return { item: item.name, quantity: item.quantity };
      });
      const values = {
        customerEmail: customerInfo.email,
        customerPhoneNumber: customerInfo.phoneNumber,
        customerFullName: customerInfo.fullName,
        customerAddress: customerInfo.address,
        order: order,
        paymentReference: ref,
      };
      await MultiOrder.insertMany([values]);
      res.status(203).json(result);
    } else {
      res.status(200).json({ error: true, Result: "No Items Provided" });
    }
  } catch (error) {
    res.status(404);
  }
};
const deleteMultiOrder = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Multi-Order delete ID: " + id);
    const result = await MultiOrder.find({ _id: id });
    if (result) {
      res.status(200).json({ status: true });
    } else {
      res.status(203).json({ status: false, result: "Order does not exist" });
    }
  } catch (error) {
    res.status(404).json({ status: false, error: "Internal Server Error" });
    console.error(error);
  }
};
module.exports = { multiplePayments, deleteMultiOrder };
