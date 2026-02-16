import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// @desc    Purchase or Update Subscription Plan
// @route   POST /api/subscription/purchase
// @access  Private (Worker only)
const purchaseSubscription = asyncHandler(async (req, res) => {
    const { plan } = req.body; // 'monthly' or 'yearly'

    if (!['monthly', 'yearly'].includes(plan)) {
        res.status(400);
        throw new Error('Invalid plan selection');
    }

    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // In a real app, you would integrate payment gateway here.
    // For now, we simulate success.

    let durationInDays = plan === 'monthly' ? 30 : 365;
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationInDays);

    user.subscription = {
        plan,
        startDate,
        endDate,
        isActive: true
    };

    const updatedUser = await user.save();

    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        subscription: updatedUser.subscription,
        token: req.user.token // Assuming token is handled by middleware but we don't need to re-issue usually, just return success
    });
});

// @desc    Get Current Subscription Status
// @route   GET /api/subscription/status
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

export { purchaseSubscription, getSubscriptionStatus };
