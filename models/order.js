const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
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
    },
    createdAt: Date
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;