const express = require("express");
const { isValidate } = require("../middlewares/validationForReg");
const { register, login, forgetPassword } = require("../controllers/user.controller");
const router = express.Router();

router.route("/register").post(isValidate, register);
router.route("/login").post(login);
router.route("/forget-password").post(forgetPassword);
module.exports=router;