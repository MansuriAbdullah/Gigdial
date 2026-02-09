import mongoose from 'mongoose';

const profileViewSchema = mongoose.Schema({
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    visitor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    viewedAt: {
        type: Date,
        default: Date.now
    },
    source: {
        type: String,
        default: 'profile_page'
    }
}, {
    timestamps: true
});

// Compound index to quickly find visitors for a worker
profileViewSchema.index({ worker: 1, _id: -1 });

const ProfileView = mongoose.model('ProfileView', profileViewSchema);

export default ProfileView;
