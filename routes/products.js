const express = require('express'),
    productController = require('../controllers/products');

productsRouter = express.Router();

productsRouter.route('/')
.post(productController.addProduct)