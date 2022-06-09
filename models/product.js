const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    // productId: mongoose.Schema.Types.ObjectId,
    type: {
        type: String,
        enum: {
            values: ['Panino', 'Bibita', 'Contorno']
        },
        required: true
    },
    name: {
        type: String,
        required: true
    },
    ingredients: String,
    price: {
        type: Number,
        required: true
    },
    img: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;