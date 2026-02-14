import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'gigdial-uploads', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
        resource_type: 'auto', // Automatically detect resource type
        public_id: (req, file) => {
            // Generate unique filename
            return `${file.fieldname}-${Date.now()}`;
        },
    },
});

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|pdf/;
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Images and PDFs only!'));
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});

export default upload;
