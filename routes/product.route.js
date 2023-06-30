const express = require("express");
const router = express.Router();
const { isAuthenticate, isAuthorizeRoles } = require("../middlewares/authorization");
const { createProduct, getAllProducts, getProductsByAdmin, updateProduct } = require("../controllers/product.controller");

router.route("/admin/addProduct/create-product").post(isAuthenticate,isAuthorizeRoles("admin"),createProduct);
router.route("/").get(getAllProducts);
router.route("admin-products").get(isAuthenticate,isAuthorizeRoles("admin"),getProductsByAdmin);
router.route("/admin/update-product/:id").put(isAuthenticate, isAuthorizeRoles("admin"), updateProduct);

module.exports=router;