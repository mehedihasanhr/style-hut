const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }],
    total: { type: Number, default: 0 },
    status: { type: String, default: 'pending' }
})


const Cart = mongoose.model('Cart', cartSchema);


module.exports = { Cart };