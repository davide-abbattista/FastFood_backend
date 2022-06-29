const Order = require('../models/order');

module.exports = {
    getOrders: (req, res, next) => {
        Order.find({isConcluded: false}).populate('products').sort({createdAt: 1}).exec()
            .then(orders => {
                console.log('Getting orders');
                res.status(200).json(orders);
            })
            .catch(error => res.status(500).json({error: error}))
    },

    addOrder: (req, res, next) => {
        Order.create({
            clientName: req.body.clientName,
            total: req.body.total,
            products: req.body.products,
            createdAt : new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()))
        }, (error, savedOrder) => {
            if (error) {
                res.status(500).json({error: error});
            } else {
                console.log(`${savedOrder} inserito`);
                res.status(200).json({message: `L'ordine con id: ${savedOrder._id} è stato inserito`});
            }
        });
    },

    concludeOrder: (req, res, next) => {
        Order.findByIdAndUpdate(req.params._id, {
            $set: {isConcluded: true}
        },{new: true}).exec()
            .then(oldOrder => {
                console.log(`${oldOrder} concluso`);
                res.status(200).json({message: `L'ordine con id: ${oldOrder._id} è stato concluso`});
            })
            .catch(error => res.status(500).json({error: error}))
    },

    deleteProductFromOrders: (req, res, next) => {
        Order.find({isConcluded: false}).exec()
            .then(orders => {
                res.locals.ordersWithCancelledProduct = orders.filter(el => el.products.indexOf(res.locals.idCancelled) !== -1);
            })
            .then(() => {
                if (res.locals.ordersWithCancelledProduct.length > 0) {
                    const idOfOrders = [];
                    for (let i = 0; i < res.locals.ordersWithCancelledProduct.length; i++) {
                        const idOfOrder = res.locals.ordersWithCancelledProduct[i]._id
                        idOfOrders.push(idOfOrder);
                    }
                    for (const id of idOfOrders) {
                        Order.findById(id).exec()
                            .then(order => {
                                const numberOfDeletedProductInTheOrder = order.products.filter(el => el.toString() === res.locals.idCancelled.toString()).length;
                                const newProducts = order.products.filter(el => el.toString() !== res.locals.idCancelled.toString());
                                const newTotal = order.total - numberOfDeletedProductInTheOrder*res.locals.deletedProductPrice;
                                if (newProducts.length > 0) {
                                    Order.findByIdAndUpdate(id, {products: newProducts, total: newTotal}).exec()
                                        .then(() => {
                                            console.log(`L'ordine con id: ${id} ha un totale aggiornato di: ${newTotal}`);
                                        });
                                } else {
                                    Order.findByIdAndUpdate(id, {products: newProducts, total: newTotal, isConcluded: true}).exec()
                                        .then(() => {
                                            console.log(`L'ordine con id: ${id} ha un totale aggiornato di: ${newTotal}`);
                                        });
                                }
                            });
                    }
                    res.status(200).json({message: `Il prodotto con id: ${res.locals.idCancelled} è stato rimosso`});
                } else {
                    res.status(200).json({message: `Il prodotto con id: ${res.locals.idCancelled} è stato rimosso`});
                }
            })
            .catch(error => res.status(500).json({error: error}))
    }
}