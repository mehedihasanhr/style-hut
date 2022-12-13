const { Cart } = require('../models/cart.model');

class CartController {


    async create (req, res) {
        const data = req.body;

        const cart = await Cart.create(data);

        if(!cart) {
            return res.status(500).json({message: 'Error creating cart', error: true, });
        }

        return res.status(201).json({
            message: 'Cart created',
            error: false,
            cart
        });
    }


    // find cart by user id
    async find (req, res) {
        const {uid} = req.params;

        const cart = await Cart.findOne({user: uid}).populate();

        if(!cart) {
            return res.status(404).json({message: 'Cart not found', error: true, });
        }

        return res.status(200).json({
            message: 'Cart found',
            error: false,
            cart
        });
    }


}

module.exports = { CartController };