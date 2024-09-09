const express = require('express');
const router = express.Router();
const { imageUpoalde, imageUpoaldeDb } = require('./imageuploadController');


router.get('/', imageUpoalde);
router.post('/', imageUpoaldeDb);


module.exports = router