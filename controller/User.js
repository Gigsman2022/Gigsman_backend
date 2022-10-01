const UserSchema = require("../models/User");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../env");
const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");
module.exports.SignUpUser = async (req, res, next) => {
  const {
    name,
    phone,
    email,
    password,
    isAdmin,
    isVerified,
    gigs_posted,
    gigs_applied,
    friends_list,
    ratings,
    location,
  } = req.body;
  try {
    const hashedPassword = await bcryptjs.hash(password, 12);
    const data = new UserSchema({
      name,
      phone,
      email,
      password: hashedPassword,
      isAdmin,
      isVerified,
      gigs_posted,
      gigs_applied,
      friends_list,
      ratings,
      location,
    });
    const token = jwt.sign({ _id: data._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    await data.save();
    res.json({ success: true, token });
  } catch {
    (err) => {
      console.log("Error while creating the new user", err);
      res.status(422).json(err);
    };
  }
};

module.exports.SignInUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UserSchema.findOne({ email });
    const isMatched = await bcryptjs.compare(password, user.password);

    if (user != null && isMatched == true) {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      user.lastLogin = Date.now();
      await user.save();
      res.json({ success: true, token });
    } else {
      res.json({
        success: false,
        error: "User not Found with this email!!",
      });
    }
  } catch {
    console.log("Error while Signing the User");
    res.status(302).json({ success: false, error: "User not Found!" });
  }
};
module.exports.ProfileData = async (req, res, next) => {
  try {
    const user = req.user;
    if (user) {
      res.json({ user: user });
    } else {
      res.status(422).json({ error: "User Doesn't Exist with this Email" });
    }
  } catch {
    (err) => {
      console.log("Error while fetching the Profile Data", err);
      res.status(422).json({ error: err });
    };
  }
};
