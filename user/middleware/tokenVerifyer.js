function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        req.flash('error', 'Please log in to view that resource');
        return res.redirect('/login');
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            req.flash('error', 'Token is not valid');
            return res.redirect('/login');
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;