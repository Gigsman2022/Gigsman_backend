const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { JWT_SECRET } = require("../env");
module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in!!" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "Session is Expired or You must be logged in!!" });
    }
    const { _id } = payload;
    const user = await User.findById(_id);
    if (user) {
      req.user = user;
      next();
      return;
    } else {
      return res
        .status(401)
        .json({ error: "No user with these credentials exist" });
    }
  });
};
