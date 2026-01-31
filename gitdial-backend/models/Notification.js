import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true
    },
    type: {
        type: String,
        enum: ['order_status', 'message', 'payment', 'system', 'promotion'],
        required: true
    },
    title: {
        type: String
    },
    message: {
        type: String,
        required: true
    },
    link: {
        type: String // URL to redirect
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
