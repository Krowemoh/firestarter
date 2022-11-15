module.exports = (req, res, next) => req.session && req.session.admin
    ? next()
    : res.redirect("/login");
