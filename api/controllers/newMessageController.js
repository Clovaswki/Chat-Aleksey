const NewMessage = require('../models/newMessage')

module.exports = {

    getNewMessage: async (req, res) => {

        try{
            var newMessages = await NewMessage.find().exec()

            newMessages.length > 0
            ? res.status(200).json(newMessages)
            : res.status(200).json([])
        
        }catch(error){
            res.status(500).json({error: 'erro interno', errorLog: error})
        }

    },
    putNewMessage: async (req, res) => {

        var { conversationId, userId } = req.query

        try {

            var newMessage = new NewMessage({
                conversationId,
                senderId: userId
            })

            await newMessage.save()

            res.status(200).json({message: 'message save'})

        } catch (error) {
            res.status(500).json({error: 'erro interno', errorLog: error})
        }

    },
    deleteNewMessage: async (req, res) => {

        var { conversationId } = req.params

        try {
            var newMessage = await NewMessage.deleteMany({conversationId: conversationId})

            if(newMessage){
                res.status(200).json({message: 'message deleted'})
            }

            res.status(200)

        } catch (error) {
            res.status(500).json({error: 'erro interno', errorLog: error})
        }

    }

}