const express = require('express'),
    productController = require('../controllers/products');

productsRouter = express.Router();

productsRouter.route('/')
    .get(productController.getProducts)
    .post(productController.addProduct);

productsRouter.route('/:_id')
    .put(productController.updateProduct)
    .delete(productController.deleteProduct)

module.exports = productsRouter;