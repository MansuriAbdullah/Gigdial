import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
    approveWorker,
    rejectWorker,
    getPendingKYC,
    getApprovedWorkers
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/kyc/pending', protect, admin, getPendingKYC);
router.put('/worker/:id/approve', protect, admin, approveWorker);
router.put('/worker/:id/reject', protect, admin, rejectWorker);
router.get('/workers/approved', getApprovedWorkers); // Public route for browsing approved workers

export default router;
