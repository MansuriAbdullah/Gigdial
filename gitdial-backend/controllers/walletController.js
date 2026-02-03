import Wallet from '../models/Wallet.js';
import User from '../models/User.js';

// @desc    Get user wallet balance and transactions
// @route   GET /api/wallet/my-wallet
// @access  Private
const getMyWallet = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const transactions = await Wallet.find({ user: req.user._id }).sort({ createdAt: -1 });

        res.json({
            balance: user.walletBalance || 0,
            transactions
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getMyWallet };
