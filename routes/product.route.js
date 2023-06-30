const express = require("express");
const router = express.Router();
const { isAuthenticate, isAuthorizeRoles } = require("../middlewares/authorization");
const { createProduct, getAllProducts, getProductsByAdmin, updateProduct, deleteProduct } = require("../controllers/product.controller");

router.route("/admin/addProduct").post(isAuthenticate,isAuthorizeRoles("admin"),createProduct);
router.route("/").get(getAllProducts);
router.route("admin-products").get(isAuthenticate,isAuthorizeRoles("admin"),getProductsByAdmin);
router.route("/admin/update-product/:id").put(isAuthenticate, isAuthorizeRoles("admin"), updateProduct);
router.route("/admin/delete-product/:id").delete(isAuthenticate, isAuthorizeRoles("admin"),deleteProduct);

module.exports=router;