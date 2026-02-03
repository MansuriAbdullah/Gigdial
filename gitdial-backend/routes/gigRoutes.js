import express from 'express';
import {
    getGigs,
    getMyGigs,
    getCategories,
    getGigById,
    createGig,
    updateGig,
    deleteGig,
} from '../controllers/gigController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getGigs)
    .post(protect, createGig);

router.route('/categories')
    .get(getCategories);

router.route('/my-gigs')
    .get(protect, getMyGigs);

router.route('/:id')
    .get(getGigById)
    .put(protect, updateGig)
    .delete(protect, deleteGig);

export default router;
