const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderId: {
        type: Number,
        unique: true
    },
    burgers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Burger'
    },
    sides: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Side'
    },
    drinks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drink'
    },
    total: Number,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;