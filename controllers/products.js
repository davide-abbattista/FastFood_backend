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

    updateProduct: (req, res, next) => {
        Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new: true}).exec()
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
        Product.findByIdAndDelete(req.params.id).exec()
            .then(() => res.status(200).json("L'utente è stato rimosso"))
            .catch(error => res.status(500).json(error));
    }
}