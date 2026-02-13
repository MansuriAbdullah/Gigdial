import mongoose from 'mongoose';

const withdrawalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        default: 'pending'
    },
    processedAt: {
        type: Date
    },
    processedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rejectionReason: {
        type: String
    }
}, {
    timestamps: true
});

const Withdrawal = mongoose.model('Withdrawal', withdrawalSchema);

export default Withdrawal;
