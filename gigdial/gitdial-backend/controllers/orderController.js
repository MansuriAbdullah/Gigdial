import Order from '../models/Order.js';
import User from '../models/User.js';
import Review from '../models/Review.js';
import Wallet from '../models/Wallet.js';
import Notification from '../models/Notification.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
    try {
        const {
            gig,
            seller,
            title,
            description,
            price,
            deliveryTime,
            paymentMethod,
            notes
        } = req.body;

        const order = await Order.create({
            buyer: req.user._id,
            seller,
            gig,
            title,
            description,
            price,
            deliveryTime,
            paymentMethod,
            notes: notes || '',
            status: 'in-progress' // Set status to in-progress directly
        });

        // Create notification for seller
        await Notification.create({
            user: seller,
            type: 'order',
            title: 'New Order Received',
            message: `You have received a new order for ${title}`,
            relatedOrder: order._id,
            link: `/worker-dashboard/orders/${order._id}`
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('buyer', 'name email profileImage')
            .populate('seller', 'name email profileImage')
            .populate('gig', 'title');

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my orders (as buyer)
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user._id })
            .populate('seller', 'name profileImage rating')
            .populate('gig', 'title')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get orders for seller (worker)
// @route   GET /api/orders/seller
// @access  Private
const getSellerOrders = async (req, res) => {
    try {
        const orders = await Order.find({ seller: req.user._id })
            .populate('buyer', 'name profileImage email phone')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = req.body.status || order.status;

            // If order is completed, update wallet
            if (req.body.status === 'completed') {
                const sellerWallet = await Wallet.findOne({ user: order.seller });
                if (sellerWallet) {
                    sellerWallet.balance += order.price;
                    sellerWallet.transactions.push({
                        type: 'credit',
                        amount: order.price,
                        description: `Payment for order: ${order.title}`,
                        order: order._id,
                        status: 'completed'
                    });
                    await sellerWallet.save();
                }

                // Create notification for buyer
                await Notification.create({
                    user: order.buyer,
                    type: 'order',
                    title: 'Order Completed',
                    message: `Your order "${order.title}" has been completed`,
                    relatedOrder: order._id,
                    link: `/customer-dashboard/orders/${order._id}`
                });
            }

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            if (order.status === 'pending') {
                order.status = 'cancelled';
                order.cancelledBy = req.user._id;
                order.cancellationReason = req.body.reason;

                await order.save();

                // Create notification for the other party
                const notifyUser = order.buyer.toString() === req.user._id.toString()
                    ? order.seller
                    : order.buyer;

                await Notification.create({
                    user: notifyUser,
                    type: 'order',
                    title: 'Order Cancelled',
                    message: `Order "${order.title}" has been cancelled`,
                    relatedOrder: order._id
                });

                res.json({ message: 'Order cancelled successfully' });
            } else {
                res.status(400).json({ message: 'Cannot cancel order in current status' });
            }
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit review for order
// @route   POST /api/orders/:id/review
// @access  Private
const submitReview = async (req, res) => {
    try {
        const { rating, review } = req.body;
        const order = await Order.findById(req.params.id);

        if (order) {
            if (order.status !== 'completed') {
                return res.status(400).json({ message: 'Can only review completed orders' });
            }

            if (order.buyer.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized to review this order' });
            }

            // Create Review in Review Collection
            await Review.create({
                gig: order.gig,
                order: order._id,
                reviewer: req.user._id,
                worker: order.seller,
                rating: rating,
                comment: review
            });

            // Update Worker's Average Rating
            const worker = await User.findById(order.seller);
            if (worker) {
                const reviews = await Review.find({ worker: order.seller });
                const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

                worker.rating = avgRating.toFixed(1);
                worker.numReviews = reviews.length;
                await worker.save();
            }

            // Update order
            order.isReviewed = true;
            order.rating = rating;
            order.review = review;
            await order.save();

            // Create notification for worker
            await Notification.create({
                user: order.seller,
                type: 'review',
                title: 'New Review Received',
                message: `You received a ${rating}-star review`,
                relatedOrder: order._id,
                link: `/worker-dashboard/reviews`
            });

            res.status(201).json({ message: 'Review submitted successfully' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('buyer', 'name email')
            .populate('seller', 'name email')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Request Completion OTP
// @route   POST /api/orders/:id/otp
// @access  Private (Worker)
const requestCompletionOtp = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            res.status(404);
            throw new Error('Order not found');
        }

        // Only seller can request completion
        if (order.seller.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized');
        }

        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        order.completionOtp = otp;
        order.completionOtpExpires = otpExpires;
        await order.save();

        // Send OTP to buyer via Notification (Simulating SMS)
        await Notification.create({
            user: order.buyer,
            type: 'system',
            title: 'Provide OTP to Completing Service',
            message: `The worker has requested to complete the service. Please share this OTP with them: ${otp}`,
            relatedOrder: order._id
        });

        // In a real app, send SMS here using Twilio/SNS
        // sendSms(buyer.phone, `Your OTP is ${otp}`);

        res.json({
            message: 'OTP sent to customer notification center',
            testOtp: otp // Included for testing purposes since SMS is not active
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Complete Order with OTP
// @route   POST /api/orders/:id/complete
// @access  Private (Worker)
const completeOrderWithOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            res.status(404);
            throw new Error('Order not found');
        }

        if (order.seller.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized');
        }

        if (order.completionOtp !== otp) {
            res.status(400);
            throw new Error('Invalid OTP');
        }

        if (order.completionOtpExpires < Date.now()) {
            res.status(400);
            throw new Error('OTP has expired');
        }

        // Mark as completed
        order.status = 'completed';
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        order.completionOtp = undefined;
        order.completionOtpExpires = undefined;

        // Update Wallet
        const sellerWallet = await Wallet.findOne({ user: order.seller });
        if (sellerWallet) {
            sellerWallet.balance += order.price;
            sellerWallet.transactions.push({
                type: 'credit',
                amount: order.price,
                description: `Payment for order: ${order.title}`,
                order: order._id,
                status: 'completed'
            });
            await sellerWallet.save();
        }

        // Notify Buyer
        await Notification.create({
            user: order.buyer,
            type: 'order',
            title: 'Order Completed',
            message: `Your order "${order.title}" has been successfully completed by the worker. Please rate your experience!`,
            relatedOrder: order._id,
            link: `/customer-dashboard/orders/${order._id}`
        });

        const updatedOrder = await order.save();
        res.json(updatedOrder);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createOrder,
    getOrderById,
    getMyOrders,
    getSellerOrders,
    updateOrderStatus,
    cancelOrder,
    submitReview,
    getOrders,
    requestCompletionOtp,
    completeOrderWithOtp
};
