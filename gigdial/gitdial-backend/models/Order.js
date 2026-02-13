import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    gig: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Gig',
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    deliveryTime: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'active', 'completed', 'cancelled', 'in-progress'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isReviewed: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0
    },
    review: {
        type: String,
        default: ''
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    completionOtp: {
        type: String,
    },
    completionOtpExpires: {
        type: Date,
    },
    notes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
