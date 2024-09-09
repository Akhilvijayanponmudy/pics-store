const imagesModel = require('../../Models/imagesModel');
require('dotenv').config();
const baseUrl = process.env.BASE_URL;


const dashboard = async (req, res) => {

    const loginedUserId = '66dec52e048f36dc31fe0eee';

    try {
        const userImages = await imagesModel.findOne({ userId: loginedUserId });

        if (userImages) {
            const imageUrls = userImages.images.map(image => `${baseUrl}${image.imageUrl}`);

            res.render('user/dashboard/dashboard', imageUrls);
        } else {
            // If no images are found for the user
            // res.status(404).json({ message: 'No images found for this user' });
            res.render('user/dashboard/dashboard');

        }

    } catch (error) {
        console.log(error);

    }



    res.render('user/dashboard/dashboard');
};


module.exports = { dashboard };