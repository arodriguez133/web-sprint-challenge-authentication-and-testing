function checkPayLoad(req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.status(401).json({ message: "username and password required" })
    } else {
        next();
    }
}

module.exports = checkPayLoad
