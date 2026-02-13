import express from 'express';
import {
    getGigs,
    getGigById,
    createGig,
    updateGig,
    deleteGig,
    updateGigStatus,
    getMyGigs,
    getAllGigs,
    getCategories,
    getGigsByWorker
} from '../controllers/gigController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getGigs)
    .post(protect, createGig);

router.route('/my-gigs').get(protect, getMyGigs);
router.route('/admin/all').get(protect, admin, getAllGigs);
router.route('/categories').get(getCategories);
router.route('/worker/:workerId').get(getGigsByWorker);

router.route('/:id')
    .get(getGigById)
    .put(protect, updateGig)
    .delete(protect, deleteGig);

router.route('/:id/status').put(protect, admin, updateGigStatus);

export default router;
