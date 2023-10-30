const path = require('path');

const express = require('express');

const router = express.Router();
const products = require('../controllers/products');


// /admin/add-product => GET
router.get('/add-product', products.getAddProducts);

// /admin/add-product => POST
router.post('/add-product', products.postAddProducts);

module.exports = router;

