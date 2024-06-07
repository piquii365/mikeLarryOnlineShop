const { Paynow } = require("paynow");
const integration = async (req, res) => {
  let paynow = new Paynow(18643, "c7bd2623-9f65-48f6-bd77-0819f080cad1");
  paynow.resultUrl = "http://localhost:2000/paynow/update";
  paynow.returnUrl =
    "http://localhost:2000/return?gateway=paynow&merchantReference=1234";
  if (req.body.items) {
    const { items, email } = req.body;
    const invoice = new Date().getTime();
    let payment = paynow.createPayment(`invoice as at ${invoice}`, email);
    items.forEach((item) => {
      payment.add(item.name, item.price, item.quantity);
    });
    await paynow.send(payment).then((result) => {
      console.log(result);
      if (result.success) {
        let link = result.redirectUrl;
        let pollUrl = result.pollUrl;
        res.sta;
      } else {
        res.sendStatus(500);
      }
    });
  }
};
module.exports = { integration };
