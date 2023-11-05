const path = require("path");

const express = require("express");

const router = express.Router();
const adminController = require("../controllers/admin");

router.get("/products", adminController.getAdminProducts);

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProducts);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete/", adminController.deleteProduct);

module.exports = router;
