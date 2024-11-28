const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(200).json({ Error: "you not authenticated" });
  } else {
    jwt.verify(token, "your_secret_key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "token not key" });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};

module.exports = { verifyUser };
