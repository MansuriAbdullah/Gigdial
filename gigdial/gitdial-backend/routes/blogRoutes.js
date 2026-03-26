import express from 'express';
const router = express.Router();
import {
    getBlogs,
    getAdminBlogs,
    getBlogBySlugOrId,
    createBlog,
    updateBlog,
    deleteBlog
} from '../controllers/blogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/')
    .get(getBlogs)
    .post(protect, admin, createBlog);

router.get('/admin', protect, admin, getAdminBlogs);

router.route('/:id')
    .put(protect, admin, updateBlog)
    .delete(protect, admin, deleteBlog);

router.get('/:slugOrId', getBlogBySlugOrId);

export default router;
