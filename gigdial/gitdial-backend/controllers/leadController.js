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

    const leads = await Lead.find({ worker: req.user._id })
        .populate('user', 'name email phone city profileImage') // Populate user details who viewed
        .sort({ viewedAt: -1 });

    // Check subscription
    const isSubscribed = user.subscription && user.subscription.isActive && new Date(user.subscription.endDate) > new Date();

    if (!isSubscribed) {
        // Return masked leads
        const maskedLeads = leads.map(lead => {
            const leadObj = lead.toObject();
            if (leadObj.user) {
                leadObj.user.name = "Verified Customer"; // Mask name
                leadObj.user.phone = "**********"; // Mask phone
                leadObj.user.email = "********@****.com"; // Mask email
                leadObj.user.city = "Hidden";
                leadObj.user.profileImage = null; // Hide image
            } else if (leadObj.phoneNumber) {
                leadObj.phoneNumber = "**********"; // Mask anonymous phone
            }
            return {
                ...leadObj,
                isMasked: true
            };
        });

        return res.json({
            message: 'Subscription required to view full lead details',
            leads: maskedLeads,
            subscriptionRequired: true
        });
    }

    res.json({
        message: 'Leads fetched successfully',
        leads: leads,
        subscriptionRequired: false
    });
});

// @desc    Record an anonymous lead with phone number
// @route   POST /api/leads/anonymous-record
// @access  Public
const recordAnonymousLead = asyncHandler(async (req, res) => {
    const { workerId, phoneNumber } = req.body;

    if (!workerId || !phoneNumber) {
        res.status(400);
        throw new Error('Worker ID and phone number are required');
    }

    // Check if worker exists
    const worker = await User.findById(workerId);
    if (!worker) {
        res.status(404);
        throw new Error('Worker not found');
    }

    // record if not already recorded within last hour to avoid spam
    const existing = await Lead.findOne({
        worker: workerId,
        phoneNumber,
        isAnonymous: true,
        viewedAt: { $gt: new Date(Date.now() - 60 * 60 * 1000) }
    });

    if (existing) {
        return res.status(200).json(existing);
    }

    const lead = await Lead.create({
        worker: workerId,
        phoneNumber,
        isAnonymous: true,
        viewedAt: Date.now()
    });

    res.status(201).json(lead);
});

export { recordLead, getWorkerLeads, recordAnonymousLead };
