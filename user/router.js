const express = require('express');
const router = express.Router();

const home = require('./home/routes');
const loginRoutes = require('./login/loginRoutes');
const registerRoutes = require('./register/registerRoutes');
const imageuploadRoutes = require('./imageupload/imageuploadRoutes');
const dashboardRoutes= require('./dashboard/dashboardRouetr')

const authenticateToken = require('./middleware/tokenVerifyer');

router.use('/', home)
router.use('/login', loginRoutes)
router.use('/register', registerRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/image-upload', imageuploadRoutes)
module.exports = router;