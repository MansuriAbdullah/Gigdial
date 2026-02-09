import express from 'express';
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
    submitReview,
    cancelOrder,
    getSellerOrders,
    updateOrderStatus
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
// Seller routes
router.route('/seller-orders').get(protect, getSellerOrders);

router.route('/:id/status').put(protect, updateOrderStatus);

router.route('/myorders').get(protect, getMyOrders);
router.route('/my-orders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/review').post(protect, submitReview);
router.route('/:id/cancel').put(protect, cancelOrder);

export default router;
