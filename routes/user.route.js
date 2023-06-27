const express = require("express");
const { isValidate } = require("../middlewares/validationForReg");
const { register, login, forgetPassword, logout, resetPassword, getUserDetails, updatePassword, updateProfile } = require("../controllers/user.controller");
const { isAuthenticate } = require("../middlewares/authorization");
const router = express.Router();

router.route("/register").post(isValidate, register);
router.route("/login").post(login);
router.route("/forget-password").post(forgetPassword);
router.route("/logout").post(isAuthenticate,logout);
router.route("/reset-password").put(isAuthenticate,resetPassword);
// router.route("/me").get(isAuthenticate, getUserDetails);
// router.route("/update-password").put(isAuthenticate, updatePassword);
// router.route("/me/updateprofile").put(isAuthenticate, updateProfile);
module.exports=router;