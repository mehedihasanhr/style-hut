import mongoose from "mongoose";


// * Reply Schema
const replySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reply: { type: String, required: true },
});

// * Review Schema
const reviewSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: { type: String, enum: ["review", "reply"], required: true },
    rating: { type: Number, default: 0, max: 5, min: 0 },
    comment: { type: String, default: "" },
    images: { type: [String], default: [] },
    replies: { type: [replySchema], default: []}
});


const ReviewModel = mongoose.model("Review", reviewSchema);

export default ReviewModel