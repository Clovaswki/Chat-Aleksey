const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Message = new Schema({
    
    conversationId:{
        type: String
    },
    sender:{
        type: String
    },
    text:{
        type: String
    },
    users_deleted: {
        type: Array   
    }

}, {timestamps: true})

var MessageModel = mongoose.model('Messages', Message)

module.exports = MessageModel