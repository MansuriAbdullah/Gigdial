import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Upload single image
// @route   POST /api/upload
// @access  Private
router.post('/', protect, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Return Base64 data (since Vercel has no permanent disk storage)
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        res.status(200).json({
            message: 'Image uploaded successfully',
            image: base64Image
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
});

export default router;
