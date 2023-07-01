const express = require("express");
const { addNewCartItem, getCartItems, updateCartItem, delteCartItem } = require("../controllers/cart.controller");
const router = express.Router();

router.route("/add-new-cartItem").post(addNewCartItem);
router.route("/all-cart-items").get(getCartItems);
router.route("/update/cart-item/:id").put(updateCartItem);
router.route("delete-cart-item").delete(delteCartItem);


module.exports=router;