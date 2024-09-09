const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ImageUpload = require('../../Models/imagesModel')


// Set up multer storage configuration dynamically based on user ID
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Assuming user's ID is in req.user.id
        // const userId = req.user && req.user.id ? req.user.id : 'default';
        const userId = '66def2d58aea876b85dc9bd3';
        const uploadPath = `./uploads/${userId}`;

        // Create directory if it doesn't exist
        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath); // Save file in the user-specific folder
    },
    filename: (req, file, cb) => {
        // Create unique filename using the original name and a timestamp
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File filter to allow only image uploads
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('File is not an image!'), false);
    }
};

// Initialize multer with storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const imageUpoalde = (req, res) => {
    res.render('user/imageUpload/imageUpload');
}

const imageUpoaldeDb = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            // Handle error during upload
            return res.status(400).send(err.message);
        }

        if (req.file) {
            // const userId = req.user.id;
            const userId = '66def2d58aea876b85dc9bd3';
            const imageName = req.file.filename;
            const imageUrl = `/uploads/${userId}/${imageName}`;

            try {
                // Find the user's image document and append new image data
                const userImages = await ImageUpload.findOne({ userId });

                if (userImages) {
                    // Append new image to existing record
                    userImages.images.push({ imageName, imageUrl });
                    await userImages.save();
                } else {
                    // Create new record if user has no images yet
                    const newImageRecord = new ImageUpload({
                        userId: userId,
                        images: [{ imageName, imageUrl }]
                    });
                    await newImageRecord.save();
                }

                res.status(200).send('Image uploaded and saved to DB successfully!');
            } catch (error) {
                console.log(error);

                res.status(500).send('Error saving image to database.');
            }
        } else {
            res.status(400).send('No file uploaded.');
        }
    });
}

module.exports = { imageUpoalde, imageUpoaldeDb };