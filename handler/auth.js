exports.auth = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    } else {
        return res.redirect("/login")
    }
}