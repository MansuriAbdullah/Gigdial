import express from 'express';
import { getMyWallet } from '../controllers/walletController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/my-wallet').get(protect, getMyWallet);

export default router;
