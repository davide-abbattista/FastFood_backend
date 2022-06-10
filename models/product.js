const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    type: {
        type: String,
        enum: {
            values: ['Panino', 'Bibita', 'Contorno']
        },
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    ingredients: String,
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;