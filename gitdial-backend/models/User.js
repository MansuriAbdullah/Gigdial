import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    skills: [{
        type: String,
    }],
    aadhaarCard: {
        type: String,
        required: false,
    },
    panCard: {
        type: String,
        required: false,
    },
    profileImage: {
        type: String,
        required: false,
    },
    isProvider: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    role: { type: String, enum: ['admin', 'worker', 'customer'], default: 'customer' },
    bio: { type: String },
    portfolio: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio' }],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    experience: { type: Number, default: 0 }, // Years of experience
    completedJobs: { type: Number, default: 0 }, // Number of completed jobs

    isVerified: { type: Boolean, default: false },

    // Wallet & Transactions
    walletBalance: { type: Number, default: 0 },
    walletTransactions: [{
        type: { type: String, enum: ['credit', 'debit'], required: true },
        amount: { type: Number, required: true },
        description: { type: String, required: true },
        status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' },
        createdAt: { type: Date, default: Date.now }
    }],

    loyaltyPoints: { type: Number, default: 0 },

    // Saved Addresses
    addresses: [{
        type: { type: String, enum: ['home', 'work', 'other'], default: 'home' },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        isDefault: { type: Boolean, default: false }
    }],

    // Favourites (saved workers)
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    // Referral System
    referralCode: { type: String, unique: true, sparse: true },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    referrals: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
        earnings: { type: Number, default: 0 },
        createdAt: { type: Date, default: Date.now }
    }],
    totalReferralEarnings: { type: Number, default: 0 },

    // KYC & Verification
    kycStatus: { type: String, enum: ['pending', 'approved', 'rejected', 'not_submitted'], default: 'not_submitted' },
    rejectionReason: { type: String },

    // Subscription & Premium
    isPremium: { type: Boolean, default: false },
    subscriptionPlan: { type: String, enum: ['free', 'premium'], default: 'free' },
    subscriptionExpiry: { type: Date },

    status: { type: String, enum: ['active', 'banned', 'suspended'], default: 'active' },
    lastLogin: { type: Date },
}, {
    timestamps: true,

});

// Method to check password match
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash password before saving
userSchema.pre('save', async function () {
    // Generate referral code for new users
    if (this.isNew && !this.referralCode) {
        this.referralCode = `GIG${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    }

    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
