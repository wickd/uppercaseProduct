module.exports = (req, res, next) => {
    if (req.user) {
        // todo: redirect from config..
        res.redirect('/dashboard/pages/constructions');
    } else {
        next();
    }
};