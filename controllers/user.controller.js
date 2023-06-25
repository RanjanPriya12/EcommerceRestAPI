const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken=(user)=>{
    return jwt.sign({user},process.env.SECRET_KEY);
}

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
      return res
        .status(201)
        .send({
          Success: true,
          message: "Account created successfully",
          user,
          token,
        });
    }
  } catch (error) {
    return res.status(400).send({errors:error.message});
  }
};
