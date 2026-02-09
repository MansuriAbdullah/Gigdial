import mongoose from 'mongoose';

const gigSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true,
    },
    title: {
        type: String,
        required: true,
        index: 'text',
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        index: true,
    },
    subCategory: { type: String },
    city: { type: String, required: true },
    tags: [{ type: String }],

    price: {
        type: Number,
        required: true,
        default: 0,
    },
    deliveryTime: {
        type: Number, // In days
        required: true,
    },
    revisions: {
        type: Number,
        required: true,
        default: 1,
    },

    coverImage: { type: String },
    gallery: [{ type: String }],

    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    salesCount: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, {
    timestamps: true,
});

const Gig = mongoose.model('Gig', gigSchema);

export default Gig;
