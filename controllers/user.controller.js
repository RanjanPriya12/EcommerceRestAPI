const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// generate token
const generateToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY);
};

exports.register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.emil }).lean().exec();
    if (user) {
      return res.status(400).send("User already exists");
    } else {
      user = await User.create(req.body);
      const token = generateToken(user);
      const options = {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };
      res.cookie("Token", token, options);
      return res.status(201).send({
        Success: true,
        message: "Account created successfully",
        user,
        token,
      });
    }
  } catch (error) {
    return res.status(400).send({ errors: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Please Enter Your Email and Password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ message: "Incorrect email or password" });
  } else {
    const match = await user.comparePassword(password);

    if (!match) {
      return res.status(400).send({ message: "Incorrect email or password" });
    } else {
      let token = generateToken(user);
      const options = {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };
      res.cookie("Token", token, options);
      return res.status(200).send({
        Success: true,
        message: "User login successfully",
        user,
        token,
      });
    }
  }
};

