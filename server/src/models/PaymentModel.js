import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    status: {
        type: String,
        enum: ['paid', 'pending', 'canceled', 'failed'],
        default: 'pending'
    },
    payment: {
        type: Map,
        default: {}
    },
}, {
    timestamps: true
});


const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;