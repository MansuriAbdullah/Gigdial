import mongoose from 'mongoose';

const customerProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gig' // Can be Gig or Worker, usually Gigs
    }],
    savedAddresses: [{
        label: String, // Home, Office
        address: String,
        city: String,
        zipCode: String,
        isDefault: { type: Boolean, default: false }
    }],
    walletBalance: {
        type: Number,
        default: 0
    },
    loyaltyPoints: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const CustomerProfile = mongoose.model('CustomerProfile', customerProfileSchema);

export default CustomerProfile;
