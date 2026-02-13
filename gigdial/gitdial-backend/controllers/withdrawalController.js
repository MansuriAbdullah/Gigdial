import asyncHandler from 'express-async-handler';
import Withdrawal from '../models/Withdrawal.js';
import Wallet from '../models/Wallet.js';
import Notification from '../models/Notification.js';

// @desc    Request a withdrawal
// @route   POST /api/withdrawals
// @access  Private (Worker)
const requestWithdrawal = asyncHandler(async (req, res) => {
    const { amount } = req.body;
    const userId = req.user._id;

    if (!amount || amount <= 0) {
        res.status(400);
        throw new Error('Invalid withdrawal amount');
    }

    const wallet = await Wallet.findOne({ user: userId });

    if (!wallet) {
        res.status(404);
        throw new Error('Wallet not found');
    }

    if (wallet.balance < amount) {
        res.status(400);
        throw new Error('Insufficient balance');
    }

    // Deduct immediately and mark transaction as pending
    wallet.balance -= amount;
    wallet.transactions.push({
        type: 'debit',
        amount,
        description: 'Withdrawal Request',
        status: 'pending'
    });
    await wallet.save();

    const withdrawal = await Withdrawal.create({
        user: userId,
        amount
    });

    // Notify user
    await Notification.create({
        user: userId,
        type: 'system',
        title: 'Withdrawal Requested',
        message: `Your withdrawal request for ₹${amount} has been received.`,
        link: '/worker-dashboard/earnings'
    });

    res.status(201).json(withdrawal);
});

// @desc    Get all withdrawals (Admin)
// @route   GET /api/withdrawals
// @access  Private/Admin
const getWithdrawals = asyncHandler(async (req, res) => {
    const withdrawals = await Withdrawal.find({})
        .populate('user', 'name email phone bankDetails')
        .sort({ createdAt: -1 });
    res.json(withdrawals);
});

// @desc    Update withdrawal status (Admin)
// @route   PUT /api/withdrawals/:id
// @access  Private/Admin
const updateWithdrawalStatus = asyncHandler(async (req, res) => {
    const { status, rejectionReason } = req.body;
    const withdrawal = await Withdrawal.findById(req.params.id);

    if (!withdrawal) {
        res.status(404);
        throw new Error('Withdrawal request not found');
    }

    if (withdrawal.status !== 'pending') {
        res.status(400);
        throw new Error('Withdrawal request already processed');
    }

    const wallet = await Wallet.findOne({ user: withdrawal.user });

    if (status === 'approved' || status === 'completed') {
        withdrawal.status = 'completed';
        withdrawal.processedAt = Date.now();
        withdrawal.processedBy = req.user._id;

        // Update the pending transaction in wallet to completed
        if (wallet) {
            const transaction = wallet.transactions.find(t =>
                t.type === 'debit' &&
                t.amount === withdrawal.amount &&
                t.status === 'pending'
            );
            if (transaction) {
                transaction.status = 'completed';
                await wallet.save();
            }
        }

        await Notification.create({
            user: withdrawal.user,
            type: 'system',
            title: 'Withdrawal Approved',
            message: `Your withdrawal of ₹${withdrawal.amount} has been processed.`,
            link: '/worker-dashboard/earnings'
        });

    } else if (status === 'rejected') {
        withdrawal.status = 'rejected';
        withdrawal.rejectionReason = rejectionReason;
        withdrawal.processedAt = Date.now();
        withdrawal.processedBy = req.user._id;

        // Refund the amount
        if (wallet) {
            wallet.balance += withdrawal.amount;
            // Mark original transaction as failed or just add a credit?
            // Let's add a credit "Refund" to make it clear history-wise
            wallet.transactions.push({
                type: 'credit',
                amount: withdrawal.amount,
                description: `Refund: Withdrawal Rejected - ${rejectionReason || 'No reason'}`,
                status: 'completed'
            });

            // Also update the original pending debit to failed for clarity
            const transaction = wallet.transactions.find(t =>
                t.type === 'debit' &&
                t.amount === withdrawal.amount &&
                t.status === 'pending'
            );
            if (transaction) {
                transaction.status = 'failed';
            }

            await wallet.save();
        }

        await Notification.create({
            user: withdrawal.user,
            type: 'system',
            title: 'Withdrawal Rejected',
            message: `Your withdrawal of ₹${withdrawal.amount} was rejected: ${rejectionReason}`,
            link: '/worker-dashboard/earnings'
        });
    }

    await withdrawal.save();
    res.json(withdrawal);
});

// @desc    Get my withdrawals
// @route   GET /api/withdrawals/my
// @access  Private
const getMyWithdrawals = asyncHandler(async (req, res) => {
    const withdrawals = await Withdrawal.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(withdrawals);
});

export {
    requestWithdrawal,
    getWithdrawals,
    updateWithdrawalStatus,
    getMyWithdrawals // Export this too
};
