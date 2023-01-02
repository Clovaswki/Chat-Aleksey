const Evaluation = require('../models/Evaluation')
const User = require('../models/User')
const fs = require('fs')

module.exports = {
    sendInfoOfDatabase: async (req, res) => {

        try{

            const bitMapChatIcon = fs.readFileSync(__dirname+'/assets/img/chatIcon.png')

            var base64 = Buffer.from(bitMapChatIcon).toString('base64')

            console.log(base64)

            res.status(200).json({
                chatIcon: base64
            })

        }catch(error){
            console.log(error)
            res.status(500).json({error: 'erro interno'})
        }

    }
}