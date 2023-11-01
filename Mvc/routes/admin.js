const path = require('path');

const express = require('express');

const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/products', adminController.getAdminProducts);

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProducts);

module.exports = router;

