const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productId: {
        type: Number,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: {
            values: ['Panino', 'Bevanda', 'Contorno']
        }
    },
    name: String,
    ingredients: String,
    price: Number
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;