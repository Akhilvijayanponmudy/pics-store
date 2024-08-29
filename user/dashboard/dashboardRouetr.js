const express = require('express');
const router = express.Router();
const { dashboard } = require('./dashboardController');


router.get('/', dashboard);


module.exports = router