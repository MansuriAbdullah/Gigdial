import Gig from '../models/Gig.js';

// @desc    Fetch all gigs
// @route   GET /api/gigs
// @access  Public
const getGigs = async (req, res) => {
    try {
        const gigs = await Gig.find({});
        res.json(gigs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single gig
// @route   GET /api/gigs/:id
// @access  Public
const getGigById = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id);

        if (gig) {
            res.json(gig);
        } else {
            res.status(404);
            throw new Error('Gig not found');
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// @desc    Create a gig
// @route   POST /api/gigs
// @access  Private
const createGig = async (req, res) => {
    try {
        const gig = new Gig({
            user: req.user._id,
            title: req.body.title || 'Sample Gig',
            description: req.body.description || 'Sample description',
            category: req.body.category || 'General',
            price: req.body.price || 0,
            deliveryTime: req.body.deliveryTime || 3,
            revisions: req.body.revisions || 1,
            image: req.body.image || '/images/sample.jpg',
        });

        const createdGig = await gig.save();
        res.status(201).json(createdGig);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a gig
// @route   PUT /api/gigs/:id
// @access  Private (Owner only)
const updateGig = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id);

        if (gig) {
            // Check if user is owner
            if (gig.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
                res.status(401);
                throw new Error('Not authorized to update this gig');
            }

            gig.title = req.body.title || gig.title;
            gig.description = req.body.description || gig.description;
            gig.category = req.body.category || gig.category;
            gig.price = req.body.price || gig.price;
            gig.deliveryTime = req.body.deliveryTime || gig.deliveryTime;
            gig.revisions = req.body.revisions || gig.revisions;
            gig.image = req.body.image || gig.image;

            const updatedGig = await gig.save();
            res.json(updatedGig);
        } else {
            res.status(404);
            throw new Error('Gig not found');
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// @desc    Delete a gig
// @route   DELETE /api/gigs/:id
// @access  Private (Owner only)
const deleteGig = async (req, res) => {
    try {
        // Use findOneAndDelete or findByIdAndDelete usually returns the doc, but findById is needed for checking owner logic if handled manually.
        const gig = await Gig.findById(req.params.id);

        if (gig) {
            // Check if user is owner
            if (gig.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
                res.status(401);
                throw new Error('Not authorized to delete this gig');
            }

            await Gig.deleteOne({ _id: gig._id });
            res.json({ message: 'Gig removed' });
        } else {
            res.status(404);
            throw new Error('Gig not found');
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// @desc    Update gig status (Admin)
// @route   PUT /api/gigs/:id/status
// @access  Private/Admin
const updateGigStatus = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id);

        if (gig) {
            gig.status = req.body.status || gig.status;
            const updatedGig = await gig.save();
            res.json(updatedGig);
        } else {
            res.status(404);
            throw new Error('Gig not found');
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export {
    getGigs,
    getGigById,
    createGig,
    updateGig,
    deleteGig,
    updateGigStatus
};
