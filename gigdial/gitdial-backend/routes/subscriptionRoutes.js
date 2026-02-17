import express from 'express';
import {
    purchaseSubscription,
    getSubscriptionStatus,
    requestRefund,
    getAllRefundRequests,
    updateRefundStatus
} from '../controllers/subscriptionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/purchase', protect, purchaseSubscription);
router.get('/status', protect, getSubscriptionStatus);
router.post('/refund', protect, requestRefund);

// Admin routes
router.get('/refunds', protect, admin, getAllRefundRequests);
router.put('/refund/:userId', protect, admin, updateRefundStatus);

export default router;
