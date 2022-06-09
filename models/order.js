const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    // orderId: mongoose.Schema.Types.ObjectId,
    clientName: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    total: {
        type: Number,
        required: true
    },
    isConcluded: {
        type: Boolean,
        default: false
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;