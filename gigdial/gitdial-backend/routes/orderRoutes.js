import express from 'express';
import {
    createOrder,
    getOrderById,
    getMyOrders,
    getSellerOrders,
    updateOrderStatus,
    cancelOrder,
    submitReview,
    getOrders,
    requestCompletionOtp,
    completeOrderWithOtp
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (none for orders usually)

// Protected routes
router.route('/').post(protect, createOrder).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/seller').get(protect, getSellerOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/status').put(protect, updateOrderStatus);
router.route('/:id/cancel').put(protect, cancelOrder);
router.route('/:id/review').post(protect, submitReview);
router.route('/:id/otp').post(protect, requestCompletionOtp);
router.route('/:id/complete').post(protect, completeOrderWithOtp);

export default router;
