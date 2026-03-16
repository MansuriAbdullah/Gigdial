import asyncHandler from 'express-async-handler';
import JobRequest from '../models/JobRequest.js';
import Order from '../models/Order.js';

// @desc    Create a new job request
// @route   POST /api/job-requests
// @access  Private
const createJobRequest = asyncHandler(async (req, res) => {
    const { category, days, budget, description } = req.body;

    if (!category || !days || !budget || !description) {
        res.status(400);
        throw new Error('Please fill all fields');
    }

    const jobRequest = await JobRequest.create({
        user: req.user._id,
        category,
        days,
        budget,
        description
    });

    res.status(201).json(jobRequest);
});

// @desc    Get all job requests (for workers to see)
// @route   GET /api/job-requests
// @access  Public
const getJobRequests = asyncHandler(async (req, res) => {
    // Show only pending requests that the current worker hasn't rejected
    const jobRequests = await JobRequest.find({ 
        status: 'pending',
        rejectedBy: { $ne: req.user._id }
    })
        .populate('user', 'name city profileImage')
        .sort({ createdAt: -1 });

    res.json(jobRequests);
});

// @desc    Get job requests by user
// @route   GET /api/job-requests/my
// @access  Private
const getMyJobRequests = asyncHandler(async (req, res) => {
    const jobRequests = await JobRequest.find({ user: req.user._id })
        .populate('acceptedBy', 'name profileImage')
        .sort({ createdAt: -1 });

    res.json(jobRequests);
});

// @desc    Update job request status
// @route   PUT /api/job-requests/:id/status
// @access  Private (Admin/Worker)
const updateJobRequestStatus = asyncHandler(async (req, res) => {
    const jobRequest = await JobRequest.findById(req.params.id);

    if (jobRequest) {
        // If worker is trying to reject the request locally
        if (req.body.status === 'rejected' || req.body.status === 'ignore') {
            if (!jobRequest.rejectedBy.includes(req.user._id)) {
                jobRequest.rejectedBy.push(req.user._id);
                await jobRequest.save();
                return res.json({ message: 'Requirement dismissed' });
            }
            return res.json({ message: 'Requirement already dismissed' });
        }

        // If worker is trying to approve (claim) the request
        if (req.body.status === 'active') {
            // Check if it's already claimed
            if (jobRequest.status !== 'pending') {
                res.status(400);
                throw new Error('This requirement has already been claimed by another worker.');
            }

            // Create an Order for the worker
            await Order.create({
                buyer: jobRequest.user,
                seller: req.user._id,
                title: `${jobRequest.category} Needed`,
                description: jobRequest.description,
                price: jobRequest.budget,
                deliveryTime: jobRequest.days,
                status: 'in-progress'
            });

            jobRequest.acceptedBy = req.user._id;
        }

        jobRequest.status = req.body.status || jobRequest.status;
        const updatedJobRequest = await jobRequest.save();
        res.json(updatedJobRequest);
    } else {
        res.status(404);
        throw new Error('Job request not found');
    }
});

export { createJobRequest, getJobRequests, getMyJobRequests, updateJobRequestStatus };
