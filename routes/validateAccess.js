module.exports = (req, res, next) => req.session && req.session.loggedIn
    ? next()
    : res.redirect("/login");
