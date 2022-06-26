const express = require('express'),
    orderController = require('../controllers/orders');

ordersRouter = express.Router();

ordersRouter.route('/')
    .get(orderController.getOrders)
    .post(orderController.addOrder);

ordersRouter.route('/:_id')
    .put(orderController.concludeOrder);

module.exports = ordersRouter;

