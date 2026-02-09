import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    gig: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Gig'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Order'
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Customer who left the review
    },
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Worker regarding whom the review is
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    reply: {
        type: String // Worker's reply
    }
}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
