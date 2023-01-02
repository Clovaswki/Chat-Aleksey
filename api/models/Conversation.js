const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Conversation = new Schema({
    members:{
        type: Array
    },
}, {timestamps: true})

var ConversationModel = mongoose.model('conversations', Conversation)

module.exports = ConversationModel