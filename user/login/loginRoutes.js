const express = require('express');
const router = express.Router();
const { loginPage,loginCheck } = require('./loginController');


router.get('/', loginPage);
router.post('/', loginCheck);


module.exports = router