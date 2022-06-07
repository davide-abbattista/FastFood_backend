const Product = require('../models/product');

module.exports = {
    addProduct: (req, res, next) => {
        Product.create(req.body, (error, savedProduct) => {
            if (error) {
                console.log(error);
                res.status(500).json(error);
            } else {
                console.log(`${savedProduct} inserito`);
                res.status(200).json(savedProduct);
            }
        });
    },

    findIdOfProduct: (req, res, next) => {
        Product.findOne({productId: req.params.id}).exec()
            .then(product => {
                res.locals.id = product._id;
                next();
            })
            .catch(error => {
                res.status(500).json(error);
            })
    },

    updateProduct: (req, res, next) => {
        Product.findByIdAndUpdate(res.locals.id, {
            $set: req.body
        },null).exec()
            .then(updatedProduct => {
                console.log(`${updatedProduct} aggiornato`);
                res.status(200).json(updatedProduct);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json(error);
            })
        },

    deleteProduct: (req, res, next) => {
        Product.findByIdAndDelete(res.locals.id).exec()
            .then(() => res.status(200).json("Il prodotto è stato rimosso"))
            .catch(error => res.status(500).json(error));
    }
}