import mongoose from 'mongoose';

const disputeSchema = mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    initiator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    reason: { type: String, required: true },
    description: { type: String, required: true },
    evidence: [{ type: String }],

    status: { type: String, enum: ['open', 'resolved', 'closed'], default: 'open' },
    resolution: { type: String }, // Admin notes
    refundAmount: { type: Number },
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin
}, { timestamps: true });

const Dispute = mongoose.model('Dispute', disputeSchema);

export default Dispute;
