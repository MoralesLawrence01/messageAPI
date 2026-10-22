const authMiddleware = (req, res, next) => {
    if (!req.session.userId){
        return res.status(401).json({
            message: "please log in first",
            ok: false
        })
    }
    next()
}

module.exports = { authMiddleware }