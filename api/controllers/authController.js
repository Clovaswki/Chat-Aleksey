const passport = require('passport')
require('../config/auth')(passport)
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = {
    login: async (req, res, next) => {

        if(req.body?.authWithGoogle && req.body.oauth){//oauth

            try {

                var userGoogle = await User.findOne({email: req.body.email}).exec()

                if(!userGoogle) return res.status(401).json({auth: false, error: 'usuário não encontrado'})

                if(!userGoogle.locked){ 

                    var { _id, email, name, picture, description, admin } = userGoogle
        
                    var token = jwt.sign({_id}, process.env.SECRET_TOKEN, {
                        expiresIn: 300 * 12 * 24
                    })
                    
                    res.status(200).json({
                        auth: true, 
                        id: _id, 
                        name: name, 
                        email: email, 
                        picture: picture, 
                        token: token,
                        description: description,
                        admin
                    })

                }else{
                    res.status(423).json({error: 'you are blocked', locked: true})
                }


            } catch (error) {
                res.status(500).json({auth: false, error: 'erro interno'})
            }

        }else{
            passport.authenticate('local', {session: false}, (err, user, info) => {
    
                err && next(err)
    
                if(!user){
                    return res.status(401).json({auth: false, error: err})
                }
    
                if(!user.locked){

                    var { _id, email, name, picture, description, admin } = user
        
                    var token = jwt.sign({_id}, process.env.SECRET_TOKEN, {
                        expiresIn: 300 * 12 * 24
                    })
                    
                    res.status(200).json({
                        auth: true, 
                        id: _id, 
                        name: name, 
                        email: email, 
                        picture: picture, 
                        token: token,
                        description: description, 
                        admin
                    })
                }else{
                    res.status(423).json({error: 'you are blocked', locked: true})
                }

    
            })(req, res, next)
        }

    },
    register: async (req, res) => {
        var { name, email, password, picture, oauth } = req.body

        try{
            var user = await User.findOne({email: email})
    
            if(user){
                return res.status(401).json({message: 'O usuário já existe', errorStatus: true})
            }
    
            var salt = bcrypt.genSaltSync(10)
    
            var newUser = new User({
                name: name,
                email: email,
                password: bcrypt.hashSync(password, salt),
                picture: picture,
                oauth: oauth
            })

            await newUser.save()

            res.status(200).json(newUser)

        }catch(err){
            res.status(500).json({error: 'Servidor indisponível'})
        }


    },
    verifyJWT: (req, res) => {
        var { tokenaccess } = req.headers

        if(!tokenaccess || tokenaccess == null){
            return res.status(401).json({auth: false, error: 'token expired!'})
        }

        try{
            jwt.verify(tokenaccess, process.env.SECRET_TOKEN, (err, decoded) => {
                if(err) return res.status(401).json({auth: false, error: 'token expired!'})
                
                res.status(200).json({auth: true, token: tokenaccess})
            })
        }catch(error){
            res.status(500).json({auth: false, error: 'token error in verify!'})
        }

    },
    getUsers: async (req, res) => {
        var { id } = req.query

        try{
            var users = id
            ? await User.findOne({_id: id}).exec()
            : await User.find().exec()

            res.status(200).json(users)
        }catch(error){
            res.status(500).json({error: error})
        }
    },
    changeUser: async (req, res) => {
        var { _id, name, email, picture, description } = req.body

        try{
            var user = await User.findOne({_id: _id}).exec()
    
            if(name){
                user.name = name
            }
            if(email){
                user.email = email
            }
            if(picture){
                user.picture = picture
            }
            if(description){
                user.description = description
            }

            await user.save()

            res.status(200).json(user)

        }catch(error){
            res.status(500).json({error: error})
        }

    },
    changeOptionsAdmin: async (req, res) => {

        var { object , userId } = req.body

        var { option, bool } = object

        try {
            var user = await User.findOne({_id: userId}).exec()

            option === 'admin'
            ? user.admin = bool
            : user.locked = bool

            await user.save()

            res.status(200).json({message: 'changed'})
        } catch (error) {
            res.status(500).json({error: 'erro interno', errorLog: error})
        }

    }, 
    verifyAdmin: async (req, res) => {
        var { tokenaccess, reservetokenaccess } = req.headers

        var token = tokenaccess && tokenaccess !== 'null' ? tokenaccess : reservetokenaccess

        if (!token || token === null || token === 'null') {
            return res.status(401).json({ admin: false, error: 'token expired!' })
        }

        try {
            jwt.verify(token, process.env.SECRET_TOKEN, async (err, decoded) => {
                if (err) return res.status(401).json({ admin: false, error: 'token expired!' })

                //verify admin
                var id = decoded._id   
                
                var user = await User.findOne({_id: id}).exec()

                user.admin 
                ? res.status(200).json({admin: true, message: 'success'})
                : res.status(401).json({admin: false, error: 'noAdmin',})
            })
        } catch (error) {
            res.status(500).json({ admin: false, error: 'token error in verify admin!' })
        }
    },
    checkUserBlocked: async (req, res) => {

        var { userId } = req.params

        try {
            if(typeof userId == undefined || userId == null || !userId){
                res.status(500).json({error: 'without id'})
            }else{
                var user = await User.findOne({_id: userId}).exec()
                
                !user.locked
                ? res.status(200).json({auth: true})
                : res.status(401).json({auth: false})
            }
        } catch (error) {
            res.status(500).json({error: 'erro interno', errorLog: error})
        }

    }
}