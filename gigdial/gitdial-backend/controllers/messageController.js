import Message from '../models/Message.js';
import User from '../models/User.js';

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
    try {
        const { recipientId, content } = req.body;
        const senderId = req.user._id.toString();
        const conversationId = [senderId, recipientId].sort().join('_');

        const message = await Message.create({
            conversationId,
            sender: senderId,
            recipient: recipientId,
            content
        });

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get messages for a conversation
// @route   GET /api/messages/:userId
// @access  Private
const getMessages = async (req, res) => {
    try {
        const otherUserId = req.params.userId;
        const myId = req.user._id.toString();
        const conversationId = [myId, otherUserId].sort().join('_');

        const messages = await Message.find({ conversationId })
            .populate('sender', 'name profileImage')
            .populate('recipient', 'name profileImage')
            .sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all conversations for a user
// @route   GET /api/messages/conversations/list
// @access  Private
const getConversations = async (req, res) => {
    try {
        const userId = req.user._id.toString();

        // Find all messages where user is sender or recipient
        const messages = await Message.find({
            $or: [{ sender: userId }, { recipient: userId }]
        }).sort({ createdAt: -1 });

        // Get unique user IDs
        const userIds = new Set();
        messages.forEach(msg => {
            const otherId = msg.sender.toString() === userId ? msg.recipient.toString() : msg.sender.toString();
            userIds.add(otherId);
        });

        // Fetch user details
        const users = await User.find({ _id: { $in: Array.from(userIds) } })
            .select('name profileImage city');

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Search users
// @route   GET /api/messages/search/:query
// @access  Private
const searchUsers = async (req, res) => {
    try {
        const query = req.params.query;
        const users = await User.find({
            name: { $regex: query, $options: 'i' }
        }).select('name profileImage city').limit(10);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { sendMessage, getMessages, getConversations, searchUsers };
