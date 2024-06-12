const { Paynow } = require("paynow");
const { v4: refrence } = require("uuid");
const Order = require("../models/oders.cjs");
const INTEGRATION_ID = process.env.PAYNOW_INTERGRATION_ID;
const INTEGRATION_KEY = process.env.PAYNOW_INTERGRATION_KEY;
const resultUrl = process.env.RESULT_URL;
const returnUrl = process.env.RETURN_URL;
const integration = async (req, res) => {
  const ref = refrence();
  let paynow = new Paynow(INTEGRATION_ID, INTEGRATION_KEY);
  paynow.resultUrl = resultUrl;
  paynow.returnUrl = returnUrl;
  try {
    if (req.body) {
      const { email } = req.params;
      const { item, price, quantity, color, address, phoneNumber } = req.body;
      let payment = paynow.createPayment(ref, email);
      payment.add(item, price, quantity);
      const result = await paynow.send(payment);
      if (result.success) {
        const order = new Order({
          items: [{ item: item, color: color, quantity }],
          buyer: email,
          location: address,
          paymentReference: ref,
          phoneNumber: phoneNumber,
        });
        let pollUrl = result.pollUrl;
        let status = paynow.pollTransaction(pollUrl);
        console.log(status);
        await order.save();
        res.status(200).json(result);
      } else {
        res.status(200).json({ error: "Payment failure" });
      }
    } else {
      res.status(200).json({ error: "Body cannot be empty" });
    }
  } catch (error) {
    res.status(404).json({ error: "Internal Server Error" });
    console.error(error);
  }
};
const multiplePayments = async (req, res) => {
  try {
    const cartItems = req.body;
    const { email } = req.params;
    if (cartItems) {
      const ref = refrence();
      let paynow = new Paynow(INTEGRATION_ID, INTEGRATION_KEY);
      paynow.resultUrl = resultUrl;
      paynow.returnUrl = returnUrl;
      let payment = paynow.createPayment(ref, email);
      await cartItems.forEach((item) => {
        payment.add(
          item.name,
          item.discount === 0 ? item.price : item.discount,
          item.quantity
        );
      });
      const result = await paynow.send(payment);
      res.status(203).json(result);
    } else {
      res.status(200).json({ error: true, Result: "No Items Provided" });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Internal Server Error" });
  }
};
const mobilePayment = async (req, res) => {
  try {
    const cartItems = req.body;
    const { email, phoneNumber } = req.params;
    console.log(email, phoneNumber);
    if (cartItems) {
      const ref = refrence();
      let paynow = new Paynow(INTEGRATION_ID, INTEGRATION_KEY);
      paynow.resultUrl = resultUrl;
      paynow.returnUrl = returnUrl;
      let payment = paynow.createPayment(ref, email);
      await cartItems.forEach((item) => {
        payment.add(
          item.name,
          item.discount === 0 ? item.price : item.discount,
          item.quantity
        );
      });
      const result = await paynow.sendMobile(payment, phoneNumber, "ecocash");
      res.status(203).json(result);
    } else {
      res.status(200).json({ error: true, Result: "No Items Provided" });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Internal Server Error" });
  }
};
const notification = (req, res) => {
  console.log(req.body);
  res.status(200).json({ Result: "OK" });
};
const status = (req, res) => {
  console.log("Status send here");
  console.log(req.body);
};
module.exports = {
  integration,
  notification,
  status,
  multiplePayments,
  mobilePayment,
};
