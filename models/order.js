const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderId: {
        type: Number,
        required: true,
        unique: true
    },
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    total: Number,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;