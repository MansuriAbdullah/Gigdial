import Blog from '../models/Blog.js';
import slugify from 'slugify';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true })
            .populate('author', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all blogs (Admin including unpublished)
// @route   GET /api/blogs/admin
// @access  Private/Admin
export const getAdminBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({})
            .populate('author', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get a single blog by slug or ID
// @route   GET /api/blogs/:slugOrId
// @access  Public
export const getBlogBySlugOrId = async (req, res) => {
    try {
        const { slugOrId } = req.params;
        let blog;
        
        if (slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
            blog = await Blog.findById(slugOrId).populate('author', 'name email');
        } else {
            blog = await Blog.findOne({ slug: slugOrId }).populate('author', 'name email');
        }
        
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = async (req, res) => {
    try {
        const { title, content, category, thumbnail, isPublished, excerpt } = req.body;
        
        const slug = slugify(title, { lower: true, strict: true });
        
        const blog = await Blog.create({
            title,
            slug,
            content,
            category,
            thumbnail,
            author: req.user._id,
            isPublished: isPublished !== undefined ? isPublished : true,
            excerpt
        });
        
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        
        const { title, content, category, thumbnail, isPublished, excerpt } = req.body;
        
        if (title) {
            blog.title = title;
            blog.slug = slugify(title, { lower: true, strict: true });
        }
        
        blog.content = content || blog.content;
        blog.category = category || blog.category;
        blog.thumbnail = thumbnail || blog.thumbnail;
        blog.isPublished = isPublished !== undefined ? isPublished : true;
        blog.excerpt = excerpt || blog.excerpt;
        
        const updatedBlog = await blog.save();
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        
        await Blog.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Blog removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
