import express from 'express';
const router = express.Router();
import { createJobRequest, getJobRequests, getMyJobRequests } from '../controllers/jobRequestController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
    .get(protect, getJobRequests)
    .post(protect, createJobRequest);

router.get('/my', protect, getMyJobRequests);

export default router;
