const express = require('express'),
    ordersRouter = require('./orders'),
    productsRouter = require('./products'),
    methodOverride = require('method-override');

const router = express.Router();

router.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}));
router.use('/api/v1/orders', ordersRouter);
router.use('/api/v1/products', productsRouter);
router.use('/', (req, res) => res.status(404).json({error: 'Risorsa non trovata'}));

module.exports = router;