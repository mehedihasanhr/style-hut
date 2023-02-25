import mongoose from "mongoose";


//* Cart Schema
const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    carts: [{ 
        product: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product', 
            required: true 
        },
        quantity: { type: Number, required: true, default: 1 },
        total: { type: Number, required: true, default: 0 },
        extras: {
            type: [Map],
            default: []
        }
    }],
}, {timestamps: true});



const Cart = mongoose.model("Cart", cartSchema);


export default Cart;