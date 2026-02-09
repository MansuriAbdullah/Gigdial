import mongoose from 'mongoose';

const workerProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true
    },
    skills: [{
        type: String
    }],
    portfolio: [{
        title: String,
        description: String,
        images: [String],
        link: String
    }],
    aadhaarCard: {
        type: String // URL/Path
    },
    panCard: {
        type: String // URL/Path
    },
    experience: {
        type: Number, // Years
        default: 0
    },
    bio: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    walletBalance: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const WorkerProfile = mongoose.model('WorkerProfile', workerProfileSchema);

export default WorkerProfile;
