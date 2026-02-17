import asyncHandler from 'express-async-handler';
import Lead from '../models/Lead.js';
import User from '../models/User.js';

// @desc    Record a profile view (Lead)
// @route   POST /api/leads/record
// @access  Private (or Public if we want non-logged in users to count, but usually we need user ID)
const recordLead = asyncHandler(async (req, res) => {
    const { workerId } = req.body;
    const userId = req.user._id; // The user viewing the profile

    if (workerId === userId.toString()) {
        // Don't record self-views
        return res.status(200).json({ message: 'Self view ignored' });
    }

    // Check if worker exists
    const worker = await User.findById(workerId);
    if (!worker) {
        res.status(404);
        throw new Error('Worker not found');
    }

    // Check if worker has active subscription
    // If not, we might still record it but not show it? The requirements say "purchase ke baad usko lead ani chaheyie".
    // This implies we record it, but they only see it if subscribed. Or maybe we only record if subscribed? 
    // Usually better to record all and filter on fetch. Let's record all.

    // Check if lead already exists recently (e.g., last 24h) to avoid spam?
    // For now, let's just create a new entry every time.

    const lead = await Lead.create({
        worker: workerId,
        user: userId,
        viewedAt: Date.now()
    });

    res.status(201).json(lead);
});

// @desc    Get leads for a worker
// @route   GET /api/leads/worker
// @access  Private (Worker only)
const getWorkerLeads = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Check subscription
    if (!user.subscription || !user.subscription.isActive) {
        // Return empty or error? Or specific message.
        // User asked for 499 package... purchase karne ke baad usko lead ani chaheyie"
        // So if no package, no leads.
        return res.status(403).json({
            message: 'Subscription required to view leads',
            leads: [],
            subscriptionRequired: true
        });
    }

    // Check expiry
    if (new Date(user.subscription.endDate) < new Date()) {
        return res.status(403).json({
            message: 'Subscription expired',
            leads: [],
            subscriptionRequired: true
        });
    }

    const leads = await Lead.find({ worker: req.user._id })
        .populate('user', 'name email phone city profileImage') // Populate user details who viewed
        .sort({ viewedAt: -1 });

    res.json(leads);
});

export { recordLead, getWorkerLeads };
