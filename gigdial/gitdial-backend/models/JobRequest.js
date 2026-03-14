import mongoose from 'mongoose';

const jobRequestSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    category: {
        type: String,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'completed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const JobRequest = mongoose.model('JobRequest', jobRequestSchema);

export default JobRequest;
