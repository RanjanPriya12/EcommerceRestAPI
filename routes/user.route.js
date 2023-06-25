const express = require("express");
const { isValidate } = require("../middlewares/validation");
const { register } = require("../controllers/user.controller");
const router = express.Router();

router.route("/register").post(isValidate, register);
module.exports=router;