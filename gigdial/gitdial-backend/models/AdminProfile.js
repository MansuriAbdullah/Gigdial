import mongoose from 'mongoose';

const adminProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true
    },
    roleLevel: {
        type: String,
        enum: ['super_admin', 'moderator', 'support'],
        default: 'moderator'
    },
    permissions: [{
        type: String // e.g., 'manage_users', 'approve_gigs'
    }],
    actionLogs: [{
        action: String,
        targetId: String,
        timestamp: { type: Date, default: Date.now }
    }]
}, {
    timestamps: true
});

const AdminProfile = mongoose.model('AdminProfile', adminProfileSchema);

export default AdminProfile;
