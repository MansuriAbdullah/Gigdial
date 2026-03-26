import express from 'express';
import { recordLead, getWorkerLeads, recordAnonymousLead } from '../controllers/leadController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/record', protect, recordLead);
router.post('/anonymous-record', recordAnonymousLead);
router.get('/worker', protect, getWorkerLeads);

export default router;

