import express from 'express';
import { purchaseSubscription, getSubscriptionStatus } from '../controllers/subscriptionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/purchase', protect, purchaseSubscription);
router.get('/status', protect, getSubscriptionStatus);

export default router;
