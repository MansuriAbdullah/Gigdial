import express from 'express';
import { sendMessage, getMessages, getConversations, searchUsers } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, sendMessage);
router.route('/conversations/list').get(protect, getConversations);
router.route('/search/:query').get(protect, searchUsers);
router.route('/:userId').get(protect, getMessages);

export default router;
