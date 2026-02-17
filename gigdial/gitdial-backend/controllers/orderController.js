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

        const status = paymentMethod === 'request' ? 'requested' : 'pending';

        const order = await Order.create({
            buyer: req.user._id,
            seller,
            gig,
            title,
            description,
            price: price || 0,
            deliveryTime: deliveryTime || 1,
            paymentMethod: paymentMethod || 'request',
            notes: notes || '',
            status
        });

        // Create notification for seller
        await Notification.create({
            user: seller,
            type: 'order',
            title: status === 'requested' ? 'New Service Request' : 'New Order Received',
            message: status === 'requested' ? `You have received a new service request for ${title}` : `You have received a new order for ${title}`,
            relatedOrder: order._id,
            link: status === 'requested' ? `/worker-dashboard/leads` : `/worker-dashboard/orders/${order._id}`
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

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('buyer', 'id name')
            .populate('seller', 'id name');
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

            // If order is completed (via this route - maybe for admin override or simple flow)
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

// @desc    Initiate order completion (Generate OTP)
// @route   POST /api/orders/:id/initiate-completion
// @access  Private (Worker only)
const initiateOrderCompletion = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Check if user is seller
        if (order.seller.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        order.completionOtp = otp;
        order.completionOtpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
        await order.save();

        // Notify Buyer
        await Notification.create({
            user: order.buyer,
            type: 'order',
            title: 'Order Completion Request',
            message: `Worker wants to complete order "${order.title}". Share this OTP with them: ${otp}`,
            relatedOrder: order._id,
            link: `/customer-dashboard/orders/${order._id}` // Link to order detail where they might see OTP if needed, or just notification
        });

        res.json({ message: 'OTP generated and sent to customer' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Complete order with OTP
// @route   POST /api/orders/:id/complete
// @access  Private (Worker only)
const completeOrder = async (req, res) => {
    try {
        const { otp } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (order.seller.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Allow admin override or specific master OTP if needed, but for now stick to OTP
        if (order.completionOtp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (order.completionOtpExpires < Date.now()) {
            return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
        }

        order.status = 'completed';
        order.completionOtp = undefined;
        order.completionOtpExpires = undefined;
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        // Wallet logic
        const sellerWallet = await Wallet.findOne({ user: order.seller });
        if (sellerWallet) {
            sellerWallet.balance += (order.price || 0);
            sellerWallet.transactions.push({
                type: 'credit',
                amount: (order.price || 0),
                description: `Payment for order: ${order.title}`,
                order: order._id,
                status: 'completed'
            });
            await sellerWallet.save();
        }

        await order.save();

        // Notify Buyer
        await Notification.create({
            user: order.buyer,
            type: 'order',
            title: 'Order Completed',
            message: `Your order "${order.title}" has been completed`,
            relatedOrder: order._id,
            link: `/customer-dashboard/orders/${order._id}`
        });

        res.json(order);
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
            if (order.status === 'pending' || order.status === 'requested') {
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

            if (order.isReviewed) {
                return res.status(400).json({ message: 'You already reviewed this order' });
            }

            const reviewObj = {
                reviewer: req.user._id,
                worker: order.seller,
                gig: order.gig,
                rating: Number(rating),
                comment: review,
                order: order._id
            };

            const createdReview = await Review.create(reviewObj);

            order.isReviewed = true;
            order.rating = rating;
            order.review = review;

            await order.save();

            // Update seller rating
            const seller = await User.findById(order.seller);
            const reviews = await Review.find({ worker: order.seller });
            seller.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
            seller.numReviews = reviews.length;
            await seller.save();

            res.status(201).json({ message: 'Review added' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createOrder,
    getOrderById,
    getMyOrders,
    getSellerOrders,
    getOrders,
    updateOrderStatus,
    cancelOrder,
    submitReview,
    initiateOrderCompletion,
    completeOrder
};
