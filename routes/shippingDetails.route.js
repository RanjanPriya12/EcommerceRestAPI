const express = require("express");
const { isAuthenticate } = require("../middlewares/authorization");
const ShippingDetails = require("../models/shippingDetails.model");
const router = express.Router();

const { shippingInfo, updateShippingInfo, deleteShippingInfo } = require("../controllers/shippingDetail.controller");
const router = express.Router();

router.route("/address").post(isAuthenticate,shippingInfo);
router.route("update-info/:id").put(isAuthenticate,updateShippingInfo);
router.route("delete-info/:id").put(isAuthenticate,deleteShippingInfo);

module.exports=router;