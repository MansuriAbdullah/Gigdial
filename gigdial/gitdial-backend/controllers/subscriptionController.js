import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

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

    // Send Confirmation Emails in background
    (async () => {
        try {
            // 1. To Worker
            const workerMessage = `Hi ${updatedUser.name}, your ₹499 Monthly Package is now active! \n\nValidity: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()} \n\nYou can now access premium leads and contact customers directly. \n\nBest Regards,\nTeam GigDial`;
            const workerHtml = `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="https://i.ibb.co/Xz9kXkX/logo-png.png" alt="GigDial" style="height: 50px;">
                    </div>
                    <h2 style="color: #059669; margin-bottom: 10px;">Package Activated Successfully!</h2>
                    <p style="color: #475569; font-size: 16px;">Hello <strong>${updatedUser.name}</strong>, your premium ₹499 monthly subscription is now active on GigDial.</p>
                    <div style="background: #f0fdf4; padding: 15px; border-radius: 12px; margin: 20px 0; border: 1px solid #d1fae5;">
                        <p style="margin: 5px 0;"><strong>Plan:</strong> Monthly Membership</p>
                        <p style="margin: 5px 0;"><strong>Valid Until:</strong> ${endDate.toLocaleDateString()}</p>
                        <p style="margin: 5px 0;"><strong>Price Paid:</strong> ₹499</p>
                    </div>
                    <p style="color: #64748b; font-size: 14px;">Now you can unlock leads and boost your business earnings.</p>
                </div>
            `;
            await sendEmail({
                email: updatedUser.email,
                subject: 'GigDial Package Activated: ₹499 Monthly Plan',
                message: workerMessage,
                html: workerHtml
            });

            // 2. To Admin (Self)
            const adminMail = process.env.EMAIL_USER;
            await sendEmail({
                email: adminMail,
                subject: `Plan Purchase: ${updatedUser.name} (₹499)`,
                message: `Worker ${updatedUser.name} (${updatedUser.email}) has purchased the ₹499 monthly plan.`,
                html: `<div style="padding:20px; background:#f4f4f4;"><h3>Subscription Purchase</h3><p>Worker: ${updatedUser.name}</p><p>Email: ${updatedUser.email}</p><p>Plan: ₹499 Monthly</p></div>`
            });

            console.log(`✔ [Subscription] Emails sent for ${updatedUser.email}`);
        } catch (err) {
            console.error('✘ [Subscription] Email Error:', err);
        }
    })();

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

// @desc    Cancel Current Subscription
// @route   PUT /api/subscriptions/cancel
// @access  Private (Worker only)
const cancelSubscription = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (!user.subscription || !user.subscription.isActive) {
        res.status(400);
        throw new Error('No active subscription found to cancel');
    }

    user.subscription.isActive = false;
    user.subscription.cancelledAt = new Date();

    await user.save();

    res.json({ message: 'Subscription cancelled successfully', subscription: user.subscription });
});

export {
    purchaseSubscription,
    getSubscriptionStatus,
    requestRefund,
    getAllRefundRequests,
    updateRefundStatus,
    cancelSubscription
};
