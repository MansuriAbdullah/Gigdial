import User from '../models/User.js';

// @desc    Get pending KYC applications
// @route   GET /api/admin/kyc/pending
// @access  Private/Admin
const getPendingKYC = async (req, res) => {
    try {
        const pendingUsers = await User.find({
            kycStatus: 'pending',
            isProvider: true
        }).select('-password');

        res.status(200).json(pendingUsers);
    } catch (error) {
        console.error('Get pending KYC error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Approve worker KYC
// @route   PUT /api/admin/worker/:id/approve
// @access  Private/Admin
const approveWorker = async (req, res) => {
    try {
        console.log('=== APPROVE WORKER CALLED ===');
        console.log('Request params:', req.params);
        console.log('Request user:', req.user);

        const user = await User.findById(req.params.id);
        console.log('User found:', user ? user.email : 'NOT FOUND');

        if (!user) {
            console.log('User not found, returning 404');
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Updating user status...');
        user.kycStatus = 'approved';
        user.isVerified = true;
        user.isProvider = true;
        user.status = 'active';

        const savedUser = await user.save();
        console.log('User saved successfully:', savedUser.email);

        return res.status(200).json({
            message: 'Worker approved successfully',
            user: {
                _id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                kycStatus: savedUser.kycStatus,
                isVerified: savedUser.isVerified
            }
        });
    } catch (error) {
        console.error('Approve worker error:', error);
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Reject worker KYC
// @route   PUT /api/admin/worker/:id/reject
// @access  Private/Admin
const rejectWorker = async (req, res) => {
    try {
        const { reason } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.kycStatus = 'rejected';
        user.isVerified = false;
        user.rejectionReason = reason || 'Documents did not meet requirements.';

        const savedUser = await user.save();

        return res.status(200).json({
            message: 'Worker rejected',
            user: {
                _id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                kycStatus: savedUser.kycStatus,
                rejectionReason: savedUser.rejectionReason
            }
        });
    } catch (error) {
        console.error('Reject worker error:', error);
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Get all approved workers (for customer browsing)
// @route   GET /api/admin/workers/approved
// @access  Public
const getApprovedWorkers = async (req, res) => {
    try {
        const approvedWorkers = await User.find({
            kycStatus: 'approved',
            isVerified: true,
            isProvider: true,
            status: 'active'
        }).select('-password -aadhaarCard -panCard');

        res.status(200).json(approvedWorkers);
    } catch (error) {
        console.error('Get approved workers error:', error);
        res.status(500).json({ message: error.message });
    }
};

export {
    getPendingKYC,
    approveWorker,
    rejectWorker,
    getApprovedWorkers
};
