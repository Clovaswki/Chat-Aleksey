const passport = require('passport')
const LocalStratregy = require('passport-local').Strategy
const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = (passport) => {

    passport.use(new LocalStratregy({}, (username, password, done) => {

        try{
            
            User.findOne({email: username}).then( user => {

                if(!user) return done('O usuário não existe', false)
        
                var isValid = bcrypt.compareSync(password, user.password)
        
                if(isValid) return done(null, user)
                
                return done('Senha incorreta!', false)
            
            })
    
        }catch(error){

            return done(null, 'erro interno')
        
        }

    }))

}