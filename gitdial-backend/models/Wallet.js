import mongoose from 'mongoose';

const walletSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true
    },
    type: {
        type: String,
        enum: ['credit', 'debit'], // credit = money in, debit = money out
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    balanceAfter: {
        type: Number
    },
    description: {
        type: String,
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order' // specific order if applicable
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'success'
    },
    referenceId: {
        type: String // Gateway transaction ID
    }
}, {
    timestamps: true
});

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;
