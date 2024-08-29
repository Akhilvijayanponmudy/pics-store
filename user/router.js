const express = require('express');
const router = express.Router();

const home = require('./home/routes');
const loginRoutes = require('./login/loginRoutes');
const registerRoutes = require('./register/registerRoutes');
const authenticateToken = require('./middleware/tokenVerifyer');

router.use('/', home)
router.use('/login', loginRoutes)
router.use('/register', registerRoutes)
router.use('/dashboard', registerRoutes)
module.exports = router;