import express from 'express';
import { recordLead, getWorkerLeads } from '../controllers/leadController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/record', protect, recordLead);
router.get('/worker', protect, getWorkerLeads);

export default router;

