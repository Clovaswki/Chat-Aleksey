const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewMessage = Schema({

    conversationId: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    }

}, {timestamps: true})

var modelNewMessage = mongoose.model('newMessages', NewMessage)

module.exports = modelNewMessage