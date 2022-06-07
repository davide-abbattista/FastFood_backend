const Product = require('../models/product');

module.exports = {
    getProducts: (req, res, next) => {
        Product.find({}).exec()
            .then(products => {
                res.status(200).json(products);
            })
            .catch(error => res.status(500).json(error))
    },

    addProduct: (req, res, next) => {
        Product.create(req.body, (error, savedProduct) => {
            if (error) {
                res.status(500).json(error);
            } else {
                console.log(`${savedProduct} inserito`);
                res.status(200).json(`Il prodotto con id: ${savedProduct.productId} è stato inserito`);
            }
        });
    },

    findIdOfProduct: (req, res, next) => {
        Product.findOne({productId: req.params.id}).exec()
            .then(product => {
                res.locals.id = product._id;
                next();
            })
            .catch(error => res.status(500).json(error))
    },

    updateProduct: (req, res, next) => {
        Product.findByIdAndUpdate(res.locals.id, {
            $set: req.body
        },null).exec()
            .then(oldProduct => {
                console.log(`${oldProduct} aggiornato`);
                res.status(200).json(`Il prodotto con id: ${oldProduct.productId} è stato aggiornato`);
            })
            .catch(error => res.status(500).json(error))
        },

    deleteProduct: (req, res, next) => {
        Product.findByIdAndDelete(res.locals.id).exec()
            .then(deletedProduct => {
                console.log(`${deletedProduct} rimosso`);
                res.status(200).json(`Il prodotto con id: ${deletedProduct.productId} è stato rimosso`);
            })
            .catch(error => res.status(500).json(error));
    }
}