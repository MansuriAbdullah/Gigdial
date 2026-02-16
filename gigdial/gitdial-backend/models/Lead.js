import mongoose from 'mongoose';

const leadSchema = mongoose.Schema({
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    viewedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
});

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
