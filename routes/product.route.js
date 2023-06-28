const express = require("express");
const router = express.Router();
const { isAuthenticate, isAuthorizeRoles } = require("../middlewares/authorization");
const { createProduct, getAllProducts } = require("../controllers/product.controller");

router.route("/admin/addProduct/create-product").post(isAuthenticate,isAuthorizeRoles,createProduct);
router.route("/").get(getAllProducts);

module.exports=router;