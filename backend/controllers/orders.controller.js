const { Order } = require('../models/order.model');


class OrderController {
    async index (req, res) {
        const orders = await Order.find({}).populate('user').populate('products.product');

        if(!orders) {
            return res.status(404).json({message: 'No orders found', error: true, });
        }

        return res.status(200).json({
            message: 'Orders found',
            error: false,
            orders
        })
    }


    // create a new order
    async create (req, res) {
        const {user, products,status, total, shipping, payment_status} = req.body;

        const newOrder = await Order.create({
            user,
            products,
            total,
            status,
            shipping,
            payment_status
        });

        if(!newOrder) {
            return res.status(500).json({message: 'Error creating order', error: true, });
        }

        return res.status(201).json({
            message: 'Order created',
            error: false,
            newOrder
        })
    }


    // find order by user id
    async find(req, res){
        const {uid} = req.params;

        const orders = await Order.findOne({user: uid}).populate('user').populate('products.product');

        if(!orders) {
            return res.status(404).json({message: 'Order not found', error: true, });
        }


        return res.status(200).json({
            message: 'Order found',
            error: false,
            orders
        })
    }


    // delete an order
    async delete (req, res) {
        const {id} = req.params;

        const order = await Order.findByIdAndDelete(id);

        if(!order) {
            return res.status(404).json({message: 'Order not found', error: true, });
        }

        return res.status(200).json({
            message: 'Order deleted',
            error: false,
            order
        })
    }
}


module.exports = { OrderController };