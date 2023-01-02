const jwt = require('jsonwebtoken')

module.exports = {
    verifyTokenJWT: (req, res, next) => {
        var { tokenaccess, reservetokenaccess } = req.headers

        var token = tokenaccess && tokenaccess !== 'null' ? tokenaccess : reservetokenaccess

        if (!token || token === null || token === 'null') {
            return res.status(401).json({ auth: false, error: 'token expired!' })
        }

        try {
            jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
                if (err) return res.status(401).json({ auth: false, error: 'token expired!' })

                next()
            })
        } catch (error) {
            res.status(500).json({ auth: false, error: 'token error in verify!' })
        }
    }
}
