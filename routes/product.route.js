const express = require("express");
const router = express.Router();
const { isAuthenticate, isAuthorizeRoles } = require("../middlewares/authorization");
const { createProduct, getAllProducts, getProductsByAdmin } = require("../controllers/product.controller");

router.route("/admin/addProduct/create-product").post(isAuthenticate,isAuthorizeRoles("admin"),createProduct);
router.route("/").get(getAllProducts);
router.route("admin-products").get(isAuthenticate,isAuthorizeRoles("admin"),getProductsByAdmin);

module.exports=router;