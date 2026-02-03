import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import ProfileView from '../models/ProfileView.js';

// @desc    Create a new subscription (Mock Payment)
// @route   POST /api/subscriptions
// @access  Private (Worker)
const createSubscription = asyncHandler(async (req, res) => {
    // In a real app, this would verify a Razorpay payment signature
    // here we just simulate the "Success" of a payment
    const { planType, paymentId, amount } = req.body;

    // Default to 1 month
    let duration = 30;
    if (planType === 'yearly') duration = 365;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + duration);

    const subscription = await Subscription.create({
        user: req.user._id,
        planType,
        amount,
        paymentId: paymentId || 'mock_payment_' + Date.now(),
        startDate,
        endDate,
        status: 'active'
    });

    if (subscription) {
        // Update user status
        const user = await User.findById(req.user._id);
        user.isPremium = true;
        user.subscriptionPlan = 'premium';
        user.subscriptionExpiry = endDate;
        await user.save();

        res.status(201).json(subscription);
    } else {
        res.status(400);
        throw new Error('Invalid subscription data');
    }
});

// @desc    Get my subscription status
// @route   GET /api/subscriptions/me
// @access  Private
const getMySubscription = asyncHandler(async (req, res) => {
    const subscription = await Subscription.findOne({ user: req.user._id, status: 'active' }).sort({ createdAt: -1 });

    if (subscription) {
        res.json(subscription);
    } else {
        res.json({ status: 'free', message: 'No active subscription found' });
    }
});

// @desc    Log a profile view (User views Worker)
// @route   POST /api/subscriptions/views
// @access  Private (User/Customer)
const logProfileView = asyncHandler(async (req, res) => {
    const { workerId } = req.body;

    if (!workerId) {
        res.status(400);
        throw new Error('Worker ID is required');
    }

    // Don't log self-views
    if (req.user._id.toString() === workerId) {
        res.status(200).json({ message: 'Self view ignored' });
        return;
    }

    // Check if view already exists recently (e.g., last 24h) to avoid spam
    // For now, we log every unique view logic can be added here

    await ProfileView.create({
        worker: workerId,
        visitor: req.user._id
    });

    res.status(201).json({ message: 'View logged' });
});

// @desc    Get my leads (Who viewed me)
// @route   GET /api/subscriptions/leads
// @access  Private (Worker)
const getMyLeads = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const isPremium = user.isPremium && user.subscriptionExpiry > new Date();

    const views = await ProfileView.find({ worker: req.user._id })
        .populate('visitor', 'name email phone city profileImage') // Populate visitor details
        .sort({ createdAt: -1 });

    if (isPremium) {
        // Return full details for premium users
        res.json(views);
    } else {
        // Mask details for free users
        const maskedViews = views.map(view => ({
            _id: view._id,
            viewedAt: view.viewedAt,
            visitor: {
                name: view.visitor.name.substring(0, 1) + '****', // Mask Name
                city: view.visitor.city,
                // Hide Phone/Email
                isLocked: true // Frontend can show "Upgrade to unlock"
            }
        }));
        res.json(maskedViews);
    }
});

export {
    createSubscription,
    getMySubscription,
    logProfileView,
    getMyLeads
};
