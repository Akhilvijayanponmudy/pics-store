const bcrypt = require('bcrypt');
const User = require('../../Models/userModel');

const registerPage = (req, res) => {
    const successMessage = req.flash('success');
    const errorMessage = req.flash('error');
    res.render('user/register/registerPage', { successMessage, errorMessage });
};

const userRegistration = async (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    if (!(userEmail && userPassword)) {
        req.flash('error', 'Email and password are required');
        return res.redirect('/register');
    }

    try {
        const checkUser = await User.findOne({ email: userEmail });
        if (checkUser) {
            req.flash('error', 'Email is already registered');
            return res.redirect('/register');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

        const newUser = new User({
            email: userEmail,
            password: hashedPassword,
        });
        await newUser.save();
        req.flash('success', 'User registered successfully');
        return res.redirect('/login');

    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'Error registering user');
        return res.redirect('/register');
    }
};

module.exports = { registerPage, userRegistration };
