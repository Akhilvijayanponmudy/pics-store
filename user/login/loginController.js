const bcrypt = require('bcrypt');
const User = require('../../Models/userModel');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key'; 

const loginPage = async (req, res) => {
    res.render('user/login/loginPage');
};
const loginCheck = async (req, res) => {


    const userEmail = req.body.email;
    const userPassword = req.body.password;

    if (!(userEmail && userPassword)) {
        req.flash('error', 'Email and password are required');
        return res.redirect('/register');
    }

    try {
        const checkUser = await User.findOne({ email: userEmail });

        if (checkUser) {
            const dbPassword = checkUser.password;

            const match = await bcrypt.compare(userPassword, dbPassword);
            if (match) {
                console.log('match');
                const token = jwt.sign({ id: checkUser._id, email: checkUser.email }, JWT_SECRET, {
                    expiresIn: '5h',
                });


                req.flash('success', 'Login successful');
                res.cookie('token', token, { httpOnly: true });
                return res.redirect('/');
            } else {
                console.log('nooooo');

                req.flash('error', 'Incorrect password');
                return res.redirect('/login');
            }

        } else {
            req.flash('error', 'No user found with this email');
            return res.redirect('/login');
        }

    } catch (error) {
        console.log(error);

    }





    res.send('here');
};


module.exports = { loginPage, loginCheck };