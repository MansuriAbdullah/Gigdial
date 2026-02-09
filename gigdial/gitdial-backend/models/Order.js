import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    gig: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Gig',
    },
    seller: { // Store redundant seller info for easier query
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    amount: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['wallet', 'card', 'upi', 'PayPal'], required: true }, // Added PayPal for compatibility with seeder
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },

    // Workflow Status
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'submitted', 'completed', 'cancelled', 'disputed'],
        default: 'pending'
    },

    // Deliverables
    requirements: { type: String }, // Customer requirements
    deliveryFile: { type: String }, // Worker submission
    deliveredAt: { type: Date },

    // Review & Rating
    rating: { type: Number, min: 1, max: 5 },
    review: { type: String },
    rated: { type: Boolean, default: false },

    // Timestamps
    completedAt: { type: Date },
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
