const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();



// /admin/add-product =>GET

router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);



// /admin/add-product =>POST

router.post('/add-product', adminController.postAddProduct);

//routa para editar productos en Admin

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

// route for delete products

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;