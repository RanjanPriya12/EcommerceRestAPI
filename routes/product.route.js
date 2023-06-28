const express = require("express");
const { isAuthorizeRoles } = require("../middlewares/authorization");
const { createProduct } = require("../controllers/product.controller");
const router = express.Router();

router.route("/addProduct/create-product").post(isAuthenticate,isAuthorizeRoles,createProduct);
module.exports=router;