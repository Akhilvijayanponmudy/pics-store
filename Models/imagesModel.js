const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for storing images related to a user
const ImageSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // User ID reference
        required: true
    },
    images: [
        {
            imageName: { type: String, required: true },  // Name of the image file
            imageUrl: { type: String, required: true },   // URL or path of the uploaded image
            uploadDate: { type: Date, default: Date.now } // Upload timestamp
        }
    ]
});

// Create model based on the schema
const ImageUpload = mongoose.model('ImageUpload', ImageSchema);

module.exports = ImageUpload;
