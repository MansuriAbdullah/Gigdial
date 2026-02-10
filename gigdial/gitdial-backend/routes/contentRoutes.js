import express from 'express';
import { getContent, updateContent, deleteContent } from '../controllers/contentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getContent)
    .post(protect, admin, updateContent);

router.route('/:id')
    .delete(protect, admin, deleteContent);

export default router;
