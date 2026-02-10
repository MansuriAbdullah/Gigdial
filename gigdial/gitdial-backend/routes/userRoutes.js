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
    rejectWorker
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
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
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.get('/worker/dashboard/:id', protect, getWorkerDashboardStats);

// Admin routes
router.route('/')
    .get(protect, admin, getUsers);

router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

router.put('/workers/:id/approve', protect, admin, approveWorker);
router.put('/workers/:id/reject', protect, admin, rejectWorker);

export default router;
