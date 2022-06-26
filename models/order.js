const mongoose = require('mongoose');

// let current = new Date();
// const timeStamp = new Date(Date.UTC(current.getFullYear(),
//     current.getMonth(),current.getDate(),current.getHours(),
//     current.getMinutes(),current.getSeconds()));

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
    createdAt: {
        type: Date,
        default: new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()))
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;