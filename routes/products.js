const express = require('express'),
    productController = require('../controllers/products');

productsRouter = express.Router();

productsRouter.route('/')
    .get(productController.getProducts)
    .post(productController.addProduct);

productsRouter.route('/:id')
    .put(productController.findIdOfProduct, productController.updateProduct)
    .delete(productController.findIdOfProduct, productController.deleteProduct)

module.exports = productsRouter;