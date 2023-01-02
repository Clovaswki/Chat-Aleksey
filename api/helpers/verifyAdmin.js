const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = {
    checkAdminAndToken: async (req, res, next) => {
        var { tokenaccess, reservetokenaccess } = req.headers

        var token = tokenaccess && tokenaccess !== 'null' ? tokenaccess : reservetokenaccess

        if (!token || token === null || token === 'null') {
            return res.status(401).json({ admin: false, error: 'token expired!' })
        }

        try {
            //check token
            jwt.verify(token, process.env.SECRET_TOKEN, async (err, decoded) => {
                if (err) return res.status(401).json({ admin: false, error: 'token expired!' })

                //decode id of user 
                var id = decoded._id   
                
                var user = await User.findOne({_id: id}).exec()

                user.admin 
                ? next()
                : res.status(401).json({admin: false, error: 'no admin'})
            })
        } catch (error) {
            res.status(500).json({ admin: false, error: 'token error in verify admin!' })
        }
    }
}
