import asyncHandler from 'express-async-handler';
import JobRequest from '../models/JobRequest.js';

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
    const jobRequests = await JobRequest.find({ status: 'pending' })
        .populate('user', 'name city profileImage')
        .sort({ createdAt: -1 });

    res.json(jobRequests);
});

// @desc    Get job requests by user
// @route   GET /api/job-requests/my
// @access  Private
const getMyJobRequests = asyncHandler(async (req, res) => {
    const jobRequests = await JobRequest.find({ user: req.user._id })
        .sort({ createdAt: -1 });

    res.json(jobRequests);
});

export { createJobRequest, getJobRequests, getMyJobRequests };
