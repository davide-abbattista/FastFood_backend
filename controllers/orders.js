const Order = require('../models/order');
const Product = require("../models/product");

module.exports = {
    getOrders: (req, res, next) => {
        Order.find({isConcluded: false}).populate('products').exec()
            .then(orders => {
                res.status(200).json(orders);
            })
            .catch(error => res.status(500).json(error))
    },

    addOrder: (req, res, next) => {
        Order.create(req.body, (error, savedOrder) => {
            if (error) {
                res.status(500).json(error);
            } else {
                console.log(`${savedOrder} inserito`);
                res.status(200).json(`L'ordine con id: ${savedOrder.orderId} è stato inserito`);
            }
        });
    },

    findIdOfOrder: (req, res, next) => {
        Order.findOne({orderId: req.params.id}).exec()
            .then(order => {
                res.locals.id = order._id;
                next();
            })
            .catch(error => res.status(500).json(error))
    },

    // deleteOrder: (req, res, next) => {
    //     Order.findByIdAndDelete(res.locals.id).exec()
    //         .then(deletedOrder => {
    //             console.log(`${deletedOrder} rimosso`);
    //             res.status(200).json(`L'ordine con id: ${deletedOrder.orderId} è stato rimosso`);
    //         })
    //         .catch(error => res.status(500).json(error));
    // },

    concludeOrder: (req,res, next) => {
        Order.findByIdAndUpdate(res.locals.id, {
            $set: {isConcluded: true}
        },{new: true}).exec()
            .then(oldOrder => {
                console.log(`${oldOrder} concluso`);
                res.status(200).json(`L'ordine con id: ${oldOrder.orderId} è stato concluso`);
            })
            .catch(error => res.status(500).json(error))
    }
}