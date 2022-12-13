const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    comment: { type: String, required: true },
    rating: { type: Number, required: true }
}, {
    timestamps: true
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };