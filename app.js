const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const multer = require('multer');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View engine setup
app.set('view engine', 'ejs');
app.use('/uploads', express.static('uploads'));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// CORS setup
app.use(cors());

// Session middleware
app.use(session({
    secret: 'your-secret-key', // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));


// Flash middleware
app.use(flash());

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Set Storage Engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB file size limit
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  }).single('image');

  // Check File Type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// Router setup
const mainRouter = require('./routes');
app.use('/', mainRouter);

// Error handling middleware (optional)
app.use((req, res, next) => {
    res.status(404).render('404', { title: '404 Not Found' });
});

// Global variables for flash messages (optional)
app.use((req, res, next) => {
    res.locals.successMessage = req.flash('success');
    res.locals.errorMessage = req.flash('error');
    next();
});

module.exports = app;
