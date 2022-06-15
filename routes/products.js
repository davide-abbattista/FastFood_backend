const express = require('express'),
    productController = require('../controllers/products'),
    orderController = require('../controllers/orders');

productsRouter = express.Router();

productsRouter.route('/')
    .get(productController.getProducts)
    .post(productController.addProduct);

productsRouter.route('/:_id')
    .put(productController.updateProduct)
    .delete(productController.deleteProduct, orderController.deleteProductFromOrders);

module.exports = productsRouter;