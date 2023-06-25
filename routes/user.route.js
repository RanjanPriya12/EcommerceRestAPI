const express = require("express");
const { isValidate } = require("../middlewares/validationForReg");
const { register, login } = require("../controllers/user.controller");
const router = express.Router();

router.route("/register").post(isValidate, register);
router.route("/login").post(login);
module.exports=router;