import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    createSubscription,
    getMySubscription,
    logProfileView,
    getMyLeads
} from '../controllers/subscriptionController.js';

const router = express.Router();

router.route('/')
    .post(protect, createSubscription);

router.route('/me')
    .get(protect, getMySubscription);

router.route('/views')
    .post(protect, logProfileView);

router.route('/leads')
    .get(protect, getMyLeads);

export default router;
