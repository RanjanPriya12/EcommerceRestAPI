const express = require("express");
const router = express.Router();
const { isAuthenticate, isAuthorizeRoles } = require("../middlewares/authorization");
const { createProduct } = require("../controllers/product.controller");

router.route("/addProduct/create-product").post(isAuthenticate,isAuthorizeRoles,createProduct);

module.exports=router;