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
            values: ['Panino', 'Bibita', 'Contorno']
        }
    },
    name: {
        type: String,
        required: true
    },
    ingredients: String,
    price: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;