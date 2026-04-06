import Order from '../models/Order.js';

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
                totalPrice,
            });

            const createdOrder = await order.save();
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
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
};
