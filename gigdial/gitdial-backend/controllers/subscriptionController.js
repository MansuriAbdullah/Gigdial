import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// @desc    Purchase or Update Subscription Plan
// @route   POST /api/subscription/purchase
// @access  Private (Worker only)
const purchaseSubscription = asyncHandler(async (req, res) => {
    const { plan } = req.body; // 'monthly'

    if (plan !== 'monthly') {
        res.status(400);
        throw new Error('Invalid plan selection. Only monthly plans are available.');
    }

    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // In a real app, you would integrate payment gateway here.
    let durationInDays = 30;
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationInDays);

    user.subscription = {
        plan,
        startDate,
        endDate,
        isActive: true,
        refundStatus: 'none'
    };

    const updatedUser = await user.save();

    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        subscription: updatedUser.subscription,
        token: req.user.token
    });
});

// @desc    Request Refund for Subscription
// @route   POST /api/subscriptions/refund
// @access  Private (Worker only)
const requestRefund = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (!user.subscription || !user.subscription.isActive) {
        res.status(400);
        throw new Error('No active subscription found to refund');
    }

    if (user.subscription.refundStatus === 'pending') {
        res.status(400);
        throw new Error('Refund request already in progress');
    }

    user.subscription.refundStatus = 'pending';
    user.subscription.refundRequestedAt = new Date();

    await user.save();

    res.json({ message: 'Refund request submitted to admin', subscription: user.subscription });
});

// @desc    Get All Refund Requests
// @route   GET /api/subscriptions/refunds
// @access  Private (Admin only)
const getAllRefundRequests = asyncHandler(async (req, res) => {
    const usersWithRefunds = await User.find({ 'subscription.refundStatus': 'pending' })
        .select('name email phone subscription');

    res.json(usersWithRefunds);
});

// @desc    Admin Update Refund Status
// @route   PUT /api/subscriptions/refund/:userId
// @access  Private (Admin only)
const updateRefundStatus = asyncHandler(async (req, res) => {
    const { status } = req.body; // 'processed' or 'rejected'
    const { userId } = req.params;

    if (!['processed', 'rejected'].includes(status)) {
        res.status(400);
        throw new Error('Invalid status. Use "processed" or "rejected".');
    }

    const user = await User.findById(userId);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (user.subscription.refundStatus !== 'pending') {
        res.status(400);
        throw new Error('No pending refund request found for this user');
    }

    user.subscription.refundStatus = status;
    user.subscription.refundProcessedAt = new Date();

    if (status === 'processed') {
        user.subscription.isActive = false; // Deactivate plan on successful refund
    }

    await user.save();

    res.json({ message: `Refund ${status} successfully`, subscription: user.subscription });
});

// @desc    Get Current Subscription Status
// @route   GET /api/subscriptions/status
// @access  Private
const getSubscriptionStatus = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Check if subscription expired
    if (user.subscription && user.subscription.isActive && user.subscription.endDate < new Date()) {
        user.subscription.isActive = false;
        await user.save();
    }

    res.json(user.subscription || { plan: 'none', isActive: false });
});

export {
    purchaseSubscription,
    getSubscriptionStatus,
    requestRefund,
    getAllRefundRequests,
    updateRefundStatus
};
