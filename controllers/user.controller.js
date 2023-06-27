const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const cloudinary = require("cloudinary");
require("dotenv").config();
const cookie = require("cookie");

// generate token
const generateToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY);
};

// mail for forget password
const sendResetPasswordMail = async(email,user,url)=>{
  try {
    const tansporter = nodemailer.createTransport({
      host:"",
      port:"",
      secure:false,
      requireTLS:true,
      service: process.env.SMPT_SERVICE,
      auth:{
        user:process.env.SMT_USER,
        pass:process.env.SMT_PASSWORD
      }
    });

    const message = `Your password reset link is ${url}, click this link to reset your password. If you not requested this email then please ignore it`;
    const mailOptions = {
      from:process.env.SMT_USER,
      to:email,
      subject:`E-commerce Password Recovery Link`,
      text:message
    }
    tansporter.sendMail(mailOptions,(error,info)=>{
      if(error){
        console.log("error",error);
      }else{
        console.log("Mail has been sent", info.response);
      }
    })
  } catch (error) {
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    return res.status(500).send({Success:false,error:error.message});
  }
}

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    let user = await User.findOne({ email: req.body.emil }).lean().exec();
    if (user) {
      return res
        .status(400)
        .send({ Success: false, message: "User already exists" });
    } else {
      // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      //   folder: "Avtaar",
      //   width: 150,
      //   crop: "scale",
      // });

      user = await User.create({
        first_name,
        last_name,
        email,
        password,
        // avatar: {
        //   public_id: myCloud.public_id,
        //   url: myCloud.secure_url,
        // },
      });
      const token = generateToken(user);
      const options = {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };
      res.setHeader("Set-Cookie",cookie.serialize("Token", token));
      //.cookie("Token", token, options);
      return res.status(201).send({
        Success: true,
        message: "Account created successfully",
        user,
        token,
      });
    }
  } catch (error) {
    return res.status(500).send({ errors: error.message });
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

exports.logout = async (req, res) => {
  try {
    res.cookie("Token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    return res.status(200).json({Success: true,message: "Logout successfully."});
  } catch (error) {
    return res.status(500).json({Success: false,error: error.message});
  }
};

exports.forgetPassword = async(req,res)=>{
  try {
    const email = req.body.email;
    const user = await User.findOne({email});
    if(user){
        const resetToken = randomstring.generate();
        const resetPasswordExpire = Date.now() + 15 * 60 * 1000;
        await User.updateOne({email:email},{$set:{resetPasswordToken:resetToken,resetPasswordExpire:resetPasswordExpire}});
        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
       // sendResetPasswordMail(email,user,resetPasswordUrl);
        return res.status(200).send({Success:true,message:"Please check your mail, reset password link is send to your mail."});
    }else{
      return res.status(200).send({Success:true, message:"This email does not exists."});
    }
  } catch (error) {
    return res.status(500).send({Success:flase, error:error.message});
  }
}
