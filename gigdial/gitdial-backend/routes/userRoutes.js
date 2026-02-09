import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    // Address management
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    // Wallet management
    getWallet,
    addMoneyToWallet,
    // Favourites
    getFavourites,
    addFavourite,
    removeFavourite,
    // Referral
    getReferralData,
    // Workers
    getWorkers,
    getWorkerById,
    getWorkerCategories,
    getWorkerDashboardStats
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
    .post(upload.fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'aadhaarCard', maxCount: 1 },
        { name: 'panCard', maxCount: 1 }
    ]), registerUser)
    .get(protect, admin, getUsers);

router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

// Worker routes
router.get('/workers', getWorkers);
router.get('/workers/:id', getWorkerById);
router.get('/worker-categories', getWorkerCategories);
router.get('/dashboard/stats', protect, getWorkerDashboardStats);

// Address routes
router.route('/addresses')
    .get(protect, getAddresses)
    .post(protect, addAddress);
router.route('/addresses/:id')
    .put(protect, updateAddress)
    .delete(protect, deleteAddress);

// Wallet routes
router.get('/wallet', protect, getWallet);
router.post('/wallet/add', protect, addMoneyToWallet);

// Favourites routes
router.route('/favourites')
    .get(protect, getFavourites)
    .post(protect, addFavourite);
router.delete('/favourites/:workerId', protect, removeFavourite);

// Referral routes
router.get('/referral', protect, getReferralData);

router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default router;

