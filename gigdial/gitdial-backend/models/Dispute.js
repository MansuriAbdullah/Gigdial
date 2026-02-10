import mongoose from 'mongoose';

const disputeSchema = mongoose.Schema({
    complainant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    defendant: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User',
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Order',
    },
    reason: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['open', 'resolved', 'closed'],
        default: 'open',
    },
    resolution: {
        type: String,
        required: false,
    }
}, {
    timestamps: true,
});

const Dispute = mongoose.model('Dispute', disputeSchema);

export default Dispute;
