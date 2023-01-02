const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    description:{
        type: String
    },
    password:{
        type: String
    },
    picture: {
        type: String
    },
    oauth: {
        type: Boolean
    },
    locked: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

var SchemaUser = mongoose.model('users', User)

module.exports = SchemaUser