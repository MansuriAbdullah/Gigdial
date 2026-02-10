import express from 'express';
import {
    getGigs,
    getGigById,
    createGig,
    updateGig,
    updateGig,
    deleteGig,
    updateGigStatus
} from '../controllers/gigController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getGigs)
    .post(protect, createGig);

router.route('/:id')
    .get(getGigById)
    .put(protect, updateGig)
    .delete(protect, deleteGig);

router.route('/:id/status').put(protect, admin, updateGigStatus);

export default router;
