import asyncHandler from 'express-async-handler';
import Dispute from '../models/Dispute.js';
import Order from '../models/Order.js';

// @desc    Create a dispute based on an order or user
// @route   POST /api/disputes
// @access  Private
const createDispute = asyncHandler(async (req, res) => {
    const { orderId, defendantId, reason, description } = req.body;

    // If worker is complainant, verify they have served the defendant
    if (req.user.isProvider && !req.user.isAdmin) {
        let hasHistory = false;
        
        if (orderId) {
            const order = await Order.findOne({ _id: orderId, seller: req.user._id, buyer: defendantId });
            if (order) hasHistory = true;
        } else if (defendantId) {
            const order = await Order.findOne({ seller: req.user._id, buyer: defendantId });
            if (order) hasHistory = true;
        }

        if (!hasHistory) {
            res.status(403);
            throw new Error('You can only complain about customers you have served.');
        }
    }

    const dispute = await Dispute.create({
        complainant: req.user._id,
        defendant: defendantId, // Optional if orderId provided
        order: orderId, // Optional
        reason,
        description,
        status: 'open'
    });

    res.status(201).json(dispute);
});

// @desc    Get disputes (Admin gets all, user gets their own)
// @route   GET /api/disputes
// @access  Private
const getDisputes = asyncHandler(async (req, res) => {
    let query = {};
    if (!req.user.isAdmin) {
        query = { complainant: req.user._id };
    }

    const disputes = await Dispute.find(query)
        .populate('complainant', 'name email')
        .populate('defendant', 'name email')
        .populate('order', 'title status price')
        .sort({ createdAt: -1 });
    res.json(disputes);
});

// @desc    Update dispute status/resolution
// @route   PUT /api/disputes/:id
// @access  Private/Admin
const updateDispute = asyncHandler(async (req, res) => {
    const dispute = await Dispute.findById(req.params.id);

    if (dispute) {
        dispute.status = req.body.status || dispute.status;
        dispute.resolution = req.body.resolution || dispute.resolution;
        const updatedDispute = await dispute.save();
        res.json(updatedDispute);
    } else {
        res.status(404);
        throw new Error('Dispute not found');
    }
});

export { createDispute, getDisputes, updateDispute };
