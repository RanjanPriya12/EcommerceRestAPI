const express = require("express");
const { addNewCartItem } = require("../controllers/cart.controller");
const router = express.Router();

router.route("/add-new-cartItem").post(addNewCartItem);


module.exports=router;