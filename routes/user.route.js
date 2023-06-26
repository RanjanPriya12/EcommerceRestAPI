const express = require("express");
const { isValidate } = require("../middlewares/validationForReg");
const { register, login, forgetPassword, logout } = require("../controllers/user.controller");
const { isAuthenticate } = require("../middlewares/authorization");
const router = express.Router();

router.route("/register").post(isValidate, register);
router.route("/login").post(login);
router.route("/forget-password").post(forgetPassword);
router.route("/logout").post(isAuthenticate,logout);
module.exports=router;