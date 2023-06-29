const express = require("express");
const { addNewCartItem, getCartItems } = require("../controllers/cart.controller");
const router = express.Router();

router.route("/add-new-cartItem").post(addNewCartItem);
router.route("/all-cart-items").get(getCartItems);


module.exports=router;