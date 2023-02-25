import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    carts: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
        default: 'pending'
    },
    
    address: {
        type: { 
            country: { type: String, default: '' },
            city: { type: String, default: '' },
            street: { type: String, default: '' },
            house: { type: String, default: '' },
            apartment: { type: String, default: '' },
            zip: { type: String, default: '' },
            _id: false
        },
        default: {}
    },
    payment_status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', default: null },
    total: { type: Number, required: true, default: 0 },
    delivery: {
        type: {
            type: String,
            enum: ['delivery', 'pickup'],
            default: 'delivery'
        },
        date: { type: Date, default: Date.now },
        time: { type: String, default: '' },
        comment: { type: String, default: '' },
        _id: false
    },

}, {timestamps: true});


const Order = mongoose.model("Order", orderSchema);

export default Order;