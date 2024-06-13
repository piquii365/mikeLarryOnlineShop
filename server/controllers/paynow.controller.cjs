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
      const { item, price, quantity, color, address, phoneNumber, fullName } =
        req.body;
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
          fullName: fullName,
        });
        let pollUrl = result.pollUrl;
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
  }
};

module.exports = {
  integration,
};
