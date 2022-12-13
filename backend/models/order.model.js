const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }],
    total: { type: Number, default: 0 },
    status: { type: String, default: 'pending' },
    shipping: { 
        type: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zip: { type: String, required: true }
        }, 
        required: true 
    },

    payment_status: { type: String, default: 'pending' },
    
});


const Order = mongoose.model('Order', orderSchema);

module.exports = { Order };