import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getWorkers,
    getWorkerById,
    getWorkerDashboardStats,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    approveWorker,
    rejectWorker,
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    getWallet,
    addMoneyToWallet,
    getAdminStats,
    getFavourites,
    getWorkerCategories
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/worker-categories', getWorkerCategories);
router.post('/', upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'aadhaarCard', maxCount: 1 },
    { name: 'panCard', maxCount: 1 }
]), registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/workers', getWorkers);
router.get('/workers/:id', getWorkerById);

// Protected routes
router.get('/favourites', protect, getFavourites);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.get('/worker/dashboard/:id', protect, getWorkerDashboardStats);

router.put('/workers/:id/approve', protect, admin, approveWorker);
router.put('/workers/:id/reject', protect, admin, rejectWorker);

// Address Management Routes
router.route('/addresses')
    .get(protect, getAddresses)
    .post(protect, addAddress);

router.route('/addresses/:id')
    .put(protect, updateAddress)
    .delete(protect, deleteAddress);

// Wallet Routes (MUST BE BEFORE ADMIN /:id ROUTE)
router.get('/wallet', protect, getWallet);
router.post('/wallet/add', protect, addMoneyToWallet);

// Admin routes
router.get('/dashboard/stats', protect, admin, getAdminStats);

router.route('/')
    .get(protect, admin, getUsers);

router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);



export default router;
