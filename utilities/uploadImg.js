const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Specify the directory to save the uploaded files
    },
    filename: (req, file, cb) => {
        // Create a unique filename using the original name and the current timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Retain the original file extension
    }
});

// Create the multer instance with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload; // Export the upload middleware for use in your routes
