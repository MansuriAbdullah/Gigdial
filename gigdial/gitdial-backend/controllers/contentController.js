import asyncHandler from 'express-async-handler';
import Content from '../models/Content.js';

// @desc    Get content by key or all
// @route   GET /api/content
// @access  Public
const getContent = asyncHandler(async (req, res) => {
    const { key } = req.query;
    if (key) {
        const content = await Content.findOne({ key });
        if (content) {
            res.json(content);
        } else {
            res.status(404);
            throw new Error('Content not found');
        }
    } else {
        const contents = await Content.find({});
        res.json(contents);
    }
});

// @desc    Update or Create content
// @route   POST /api/content
// @access  Private/Admin
const updateContent = asyncHandler(async (req, res) => {
    const { key, title, content, section } = req.body;

    let contentItem = await Content.findOne({ key });

    if (contentItem) {
        contentItem.title = title || contentItem.title;
        contentItem.content = content || contentItem.content;
        contentItem.section = section || contentItem.section;
        const updated = await contentItem.save();
        res.json(updated);
    } else {
        const newContent = await Content.create({
            key,
            title,
            content,
            section
        });
        res.status(201).json(newContent);
    }
});

// @desc    Delete content
// @route   DELETE /api/content/:id
// @access  Private/Admin
const deleteContent = asyncHandler(async (req, res) => {
    const content = await Content.findById(req.params.id);
    if (content) {
        await Content.deleteOne({ _id: req.params.id });
        res.json({ message: 'Content removed' });
    } else {
        res.status(404);
        throw new Error('Content not found');
    }
});

export { getContent, updateContent, deleteContent };
