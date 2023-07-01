const express = require("express");
const { isAuthenticate } = require("../middlewares/authorization");
const { getOrderedItems, createOrder } = require("../controllers/order.controller");
const router= express.Router();

router.route("/all-ordered-items").get(isAuthenticate,getOrderedItems);
router.route("/order-your-product").post(isAuthenticate,createOrder);

module.exports = router;