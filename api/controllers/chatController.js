const Conversation = require('../models/Conversation')
const Message = require('../models/Message')
const Evaluation = require('../models/Evaluation')

module.exports = {
    NewConversation: async (req, res) => {
        var { senderId, receivedId } = req.body

        var newConversation = new Conversation({
            members: [senderId, receivedId]
        })
        try {
            var savedConversation = await newConversation.save()

            res.status(201).json(savedConversation)
        } catch (error) {
            res.status(500).json({ error: error })
        }

    },
    GetConversations: async (req, res) => {
        var { userId } = req.params

        try {
            var conversations = await Conversation.find({
                members: { $in: [userId] }
            })
            res.status(200).json(conversations)
        } catch (error) {
            res.status(500).json({ error: error })
        }

    },
    NewMessage: async (req, res) => {

        var newMessage = new Message(req.body)

        try {
            var savedMessage = await newMessage.save()

            res.status(201).json(savedMessage)
        } catch (error) {
            res.status(500).json({ error: error })
        }

    },
    GetMessages: async (req, res) => {

        var { conversationId, userId } = req.query

        try {
            var messages = await Message.find({ conversationId: conversationId }).exec()

            //verify if user deleted the message
            var filterMessages = messages.filter(msg => !msg.users_deleted.includes(userId))

            res.status(200).json(filterMessages)
        } catch (error) {
            res.status(500).json({ error: 'erro interno!', errorLog: error })
        }

    },
    getAllMessages: async (req, res) => {
        try {
            var response = await Message.find().exec()

            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({error: 'erro interno', errorLog: error})
        }
    },
    deleteMessage: async (req, res) => {

        var { userId, messageId } = req.query

        try {
            var message = await Message.findOne({ _id: messageId }).exec()

            //if a user has already deleted the message
            if (message.users_deleted?.length > 0) {

                var successDeletedMsg = await Message.deleteOne({ _id: messageId }).exec()

                return res.status(200).json({ message: successDeletedMsg })

            }

            message.users_deleted = [userId]

            await message.save()

            res.status(200).json({ message })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno!', errorLog: error })
        }

    },
    //post a new evaluation
    newEvaluation: async (req, res) => {

        var { userId, questionOne, questionTwo, content } = req.body

        try {

            if (req.body) {

                var newEvaluation = new Evaluation({
                    userId: userId,
                    questionOneLikeOrNot: questionOne,
                    questionTwo: questionTwo,
                    comment: content
                })

                await newEvaluation.save()

                return res.status(200)

            }

            res.status(422).json({ error: 'no request body' })

        } catch (error) {
            res.status(500).json({ error: 'erro interno!' })
        }

    },
    getEvaluation: async (req, res) => {

        try {
            var evaluations = await Evaluation.find().exec()

            res.status(200).json(evaluations)
        } catch (error) {
            res.status(500).json({ error: 'erro interno' })
        }

    }
}