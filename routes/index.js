const express = require('express'),
    ordersRouter = require('./orders'),
    productsRouter = require('./products'),
    methodOverride = require('method-override');

const router = express.Router();

router.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}));
router.use('/api/orders', ordersRouter);
router.use('/api/products', productsRouter);

module.exports = router;