const express = require("express");
const { addNewCartItem, getCartItems, updateCartItem } = require("../controllers/cart.controller");
const router = express.Router();

router.route("/add-new-cartItem").post(addNewCartItem);
router.route("/all-cart-items").get(getCartItems);
router.route("/update/cart-item/:id").put(updateCartItem);


module.exports=router;