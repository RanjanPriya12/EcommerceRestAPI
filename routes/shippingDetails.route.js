const express = require("express");
const { isAuthenticate } = require("../middlewares/authorization");
const ShippingDetails = require("../models/shippingDetails.model");
const router = express.Router();

router.route("/address").post(isAuthenticate,ShippingDetails);

module.exports=router;