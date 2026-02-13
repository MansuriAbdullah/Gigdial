import express from 'express';
import {
    requestWithdrawal,
    getWithdrawals,
    updateWithdrawalStatus,
    getMyWithdrawals
} from '../controllers/withdrawalController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, requestWithdrawal)
    .get(protect, admin, getWithdrawals);

router.route('/my').get(protect, getMyWithdrawals);

router.route('/:id').put(protect, admin, updateWithdrawalStatus);

export default router;
