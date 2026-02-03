import mongoose from 'mongoose';

const portfolioSchema = mongoose.Schema({
    worker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    images: [{ type: String, required: true }],
    link: { type: String },

    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, // Admin moderation
}, { timestamps: true });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;
