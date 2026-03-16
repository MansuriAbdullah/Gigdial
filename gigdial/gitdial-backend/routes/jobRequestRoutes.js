import express from 'express';
const router = express.Router();
import { createJobRequest, getJobRequests, getMyJobRequests, updateJobRequestStatus } from '../controllers/jobRequestController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
    .get(protect, getJobRequests)
    .post(protect, createJobRequest);

router.get('/my', protect, getMyJobRequests);
router.put('/:id/status', protect, updateJobRequestStatus);

export default router;
