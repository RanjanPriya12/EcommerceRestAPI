const express = require("express");
const { isAuthenticate } = require("../middlewares/authorization");
const { addWishListProduct, getAllWishListItems } = require("../controllers/wishList.controller");

const router = express.Router();

router.route("/add-item").post(isAuthenticate,addWishListProduct);
router.route("/all-items").get(isAuthenticate,getAllWishListItems);

module.exports=router;