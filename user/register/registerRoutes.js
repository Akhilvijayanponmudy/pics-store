const express = require('express');
const router = express.Router();
const { registerPage,userRegistration } = require('./registerController');


router.get('/', registerPage);
router.post('/', userRegistration);


module.exports = router