import express from 'express';
import { createDispute, getDisputes, updateDispute } from '../controllers/disputeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createDispute)
    .get(protect, admin, getDisputes);

router.route('/:id')
    .put(protect, admin, updateDispute);

export default router;
