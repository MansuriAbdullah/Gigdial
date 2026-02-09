import Order from '../models/Order.js';
import User from '../models/User.js';
import Wallet from '../models/Wallet.js';
import Notification from '../models/Notification.js';
import Review from '../models/Review.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    try {
        const {
            gigId,
            sellerId,
            paymentMethod,
            totalPrice
        } = req.body;

        if (!gigId) {
            res.status(400);
            throw new Error('No gig ordered');
            return;
        } else {
            const order = new Order({
                gig: gigId,
                user: req.user._id,
                seller: sellerId,
                paymentMethod,
                amount: totalPrice,
                totalAmount: totalPrice,
            });

            const createdOrder = await order.save();

            // Notify Seller
            await Notification.create({
                recipient: sellerId,
                type: 'order_status',
                title: 'New Order Received',
                message: `You have received a new order of ₹${totalPrice}!`,
                link: '/worker-dashboard/leads'
            });

            res.status(201).json(createdOrder);
        }
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
            .populate('user', 'name email')
            .populate('gig', 'title price image');

        if (order) {
            // Only admin, buyer, or seller can view
            if (req.user.isAdmin || order.user._id.equals(req.user._id) || order.seller.equals(req.user._id)) {
                res.json(order);
            } else {
                res.status(401);
                throw new Error('Not authorized to view this order');
            }
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('gig', 'title images')
            .populate('seller', 'name profileImage rating')
            .sort({ createdAt: -1 });

        // Transform to match frontend expectations
        const formattedOrders = orders.map(order => ({
            _id: order._id,
            serviceName: order.gig?.title || 'Service',
            workerName: order.seller?.name || 'Worker',
            date: order.createdAt,
            time: new Date(order.createdAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            amount: order.totalAmount,
            status: order.status === 'completed' ? 'completed' :
                order.status === 'cancelled' ? 'cancelled' : 'active',
            rated: order.rated || false,
            rating: order.rating,
            review: order.review
        }));

        res.json(formattedOrders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// @desc    Submit review for order
// @route   POST /api/orders/:id/review
// @access  Private
const submitReview = async (req, res) => {
    try {
        const { rating, review } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            res.status(404);
            throw new Error('Order not found');
        }

        // Only customer can review
        if (order.user.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Not authorized to review this order');
        }

        if (order.status !== 'completed') {
            res.status(400);
            throw new Error('Can only review completed orders');
        }

        order.rating = rating;
        order.review = review;
        order.rated = true;

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

        res.json({ message: 'Review submitted successfully', order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            res.status(404);
            throw new Error('Order not found');
        }

        // Only customer can cancel
        if (order.user.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Not authorized to cancel this order');
        }

        if (order.status === 'completed' || order.status === 'cancelled') {
            res.status(400);
            throw new Error('Cannot cancel this order');
        }

        order.status = 'cancelled';
        await order.save();

        res.json({ message: 'Order cancelled successfully', order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
    submitReview,
    cancelOrder,
    getSellerOrders,
    updateOrderStatus
};

// @desc    Get logged in worker orders (sales)
// @route   GET /api/orders/seller-orders
// @access  Private
const getSellerOrders = async (req, res) => {
    try {
        const orders = await Order.find({ seller: req.user._id })
            .populate('user', 'name email profileImage phone city address')
            .populate('gig', 'title price image')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Seller/Admin)
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            // Check if user is seller or admin
            if (order.seller.toString() !== req.user._id.toString() && !req.user.isAdmin) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            const oldStatus = order.status;
            order.status = req.body.status;

            if (req.body.status === 'completed' && oldStatus !== 'completed') {
                const commission = order.totalAmount * 0.1; // 10% commission
                const netAmount = order.totalAmount - commission;

                // Update seller wallet
                const seller = await User.findById(order.seller);
                if (seller) {
                    seller.walletBalance = (seller.walletBalance || 0) + netAmount;
                    await seller.save();

                    // Log transaction
                    await Wallet.create({
                        user: order.seller,
                        type: 'credit',
                        amount: netAmount,
                        description: `Earning from Order ${order._id} (${order.gig?.title || 'Gig'})`,
                        order: order._id,
                        status: 'success',
                        balanceAfter: seller.walletBalance
                    });
                }

                order.isPaid = true; // Assume completed means paid if not already
                order.completedAt = Date.now();
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

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name').populate('gig', 'title');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
