require("dotenv").config();
const express = require("express");
const cors = require("cors");
const verifyAdmin = require("./middleware/verifyAdmin.cjs");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const conn = require("./config/dbConn.config.cjs");
const path = require("path");
const app = express();
conn();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://www.paynow.co.zw"],
    method: ["GET", "PUT", "POST", "OPTIONS", "DELETE"],
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "Options",
    ],
  })
);
//routes
app.use("/auth", require("./routes/auth.route.cjs"));
app.use("/user", require("./routes/users.route.cjs"));
app.use("/orders", require("./routes/orders.routes.cjs"));
app.use("/products", require("./routes/products.route.cjs"));
app.use(require("./routes/paynow.routes.cjs"));
app.use("/multiple", require("./routes/multiOrderPayment.cjs"));
//server initiation
const PORT = process.env.PORT;
const HOST = process.env.HOST;
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
});
