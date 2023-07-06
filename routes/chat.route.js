const express = require("express");
const { accessChat } = require("../controllers/chat.controller");
const { isAuthenticate } = require("../middlewares/authorization");
const router = express.Router();

router.route("/").post(isAuthenticate,accessChat)

module.exports=router;