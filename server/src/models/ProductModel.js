import mongoose from "mongoose";

// * Product Schema
const productSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    categories: {
        type: {
            main: { type: String, required: true },
            sub: { type: [String], default: []},
            _id: false
        }
    },
    short_desc: { type: String, default: "" },
    desc: { type: String, default: "" },
    images: { type: [String], required: true, default: [] },
    reviews: { 
        type: [mongoose.Schema.Types.ObjectId], 
        ref: "Review", 
        default: [] 
    },
    rating: { 
        type: Number,
        max: 5,
        min: 0,
        default: 0
    },
    gender: { type: String, default: "" },
    brand: { type: String, default: "No Brand" },
    specifications: { 
        type: [{
            key: { type: String, required: true },
            val: { type: String, required: true },
        }],
        default: {}
    },
    tags: { type: [String], required: true, default: [] },
    warranty: { type: String, default: "No Warranty" },
    return_policy: { type: String, default: "" },
}, { timestamps: true });



const ProductModel = mongoose.model("Product", productSchema);


export default ProductModel