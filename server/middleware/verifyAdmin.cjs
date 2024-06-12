const jwt = require("jsonwebtoken");
const verifyAdmin = (req, res, next) => {
  const headers = req.headers?.authorization;
  if (headers) {
    const token = headers.split(" ")[1];
    jwt.verify(token, process.env.SECRETE_ACCESS_TOKEN, (err, user) => {
      if (err) {
        res.status(403).json({ error: "Invalid token " });
      } else {
        req.user = user.username;
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ error: "You are not authorized to access this resource" });
  }
};

module.exports = verifyAdmin;
