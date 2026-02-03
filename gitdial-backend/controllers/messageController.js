import Message from '../models/Message.js';
import User from '../models/User.js';

// @desc    Send message
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

// @desc    Get messages for a conversation with a specific user
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

// @desc    Get all conversations (users chatted with)
// @route   GET /api/messages/conversations/list
// @access  Private
const getConversations = async (req, res) => {
    try {
        // Find unique recipients where I am sender
        const sent = await Message.distinct('recipient', { sender: req.user._id });
        // Find unique senders where I am recipient
        const received = await Message.distinct('sender', { recipient: req.user._id });

        const allUserIds = [...new Set([...sent.map(id => id.toString()), ...received.map(id => id.toString())])];

        const users = await User.find({ _id: { $in: allUserIds } }).select('name profileImage city');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Search users by name
// @route   GET /api/messages/search/:query
// @access  Private
const searchUsers = async (req, res) => {
    try {
        const keyword = req.params.query
            ? {
                name: {
                    $regex: req.params.query,
                    $options: 'i',
                },
            }
            : {};

        const users = await User.find({ ...keyword, _id: { $ne: req.user._id } }).select('name profileImage city');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { sendMessage, getMessages, getConversations, searchUsers };
