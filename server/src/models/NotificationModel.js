import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    type: {
        type: String,
        enum: ["like", "comment", "reply", "follow", "mention", "message", "out_of_stock", "new_product", "new_user", "new_order", "sold" ],
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    notification: {
        type: Object,
        required: true,
    },
}, {
    timestamps: true,
});


const Notification = mongoose.model("Notification", notificationSchema);


export default Notification;