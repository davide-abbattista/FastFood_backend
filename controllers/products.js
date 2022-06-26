const Product = require('../models/product');

module.exports = {
    getProducts: (req, res, next) => {
        Product.find({}).sort({type: -1}).exec()
            .then(products => {
                console.log('Getting products');
                res.status(200).json(products);
            })
            .catch(error => res.status(500).json({error: error}))
    },

    addProduct: (req, res, next) => {
        Product.create(req.body, (error, savedProduct) => {
            if (error) {
                res.status(500).json({error: error});
            } else {
                console.log(`${savedProduct} inserito`);
                res.status(200).json({message: `Il prodotto con id: ${savedProduct._id} è stato inserito`});
            }
        });
    },

    updateProduct: (req, res, next) => {
        Product.findByIdAndUpdate(req.params._id, {
            $set: req.body
        },{new: true}).exec()
            .then(oldProduct => {
                console.log(`${oldProduct} aggiornato`);
                res.status(200).json({message: `Il prodotto con id: ${oldProduct._id} è stato aggiornato`});
            })
            .catch(error => res.status(500).json({error: error}))
        },

    deleteProduct: (req, res, next) => {
        Product.findByIdAndDelete(req.params._id).exec()
            .then(deletedProduct => {
                console.log(`${deletedProduct} rimosso`);
                // res.status(200).json({message: `Il prodotto con id: ${deletedProduct._id} è stato rimosso`});
                res.locals.idCancelled = deletedProduct._id;
                res.locals.deletedProductPrice = deletedProduct.price;
                next();
            })
            .catch(error => res.status(500).json({error: error}));
    }
}