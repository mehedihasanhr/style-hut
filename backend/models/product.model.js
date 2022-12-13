const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true, trim: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    images: {type: Array, required: true},
    category: {type: String, required: true},
    quantity: {type: Number, required: true},
    sold: {type: Number, default: 0},
    sizes: {type: Array, required: true},
}, {
    timestamps: true
})



module.exports = {
    Product: mongoose.model("Product", productSchema)
};
