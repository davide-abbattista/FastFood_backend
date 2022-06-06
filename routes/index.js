const express = require('express'),
    ordersRouter = require('./orders'),
    productsRouter = require('./products');

const router = express.Router();

router.use('/api/orders', ordersRouter);
router.use('/api/products', productsRouter);

module.exports = router;