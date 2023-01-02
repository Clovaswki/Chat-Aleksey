const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors:{
        origin: '*'
     }
})

var users = []//users online

//function add users online
const addUser = (userId, socketId) => {
    !users.some( user => user.userId === userId) &&
    users.push({userId, socketId})
}

//function remove users online 
const removeUser = (socketId) => {
    users = [...users.filter( user => user.socketId !== socketId)]
}

//function get user
const getUser = (receivedId) => {
    return users.filter( user => user.userId === receivedId)
}

io.on('connection', socket => {
    
    //add user online
    socket.on('addUser', ({userId, userName}) => {
        
        console.log(`${userName} conectado...`)
        
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    
    })
    
    //remove users online
    socket.on('disconnect', () => {
        removeUser(socket.id)
        io.emit('getUsers', users)
    })
    
    //send new message to a user
    socket.on('newMessage', ({senderId, receivedId, text, _id}) => {
        
        /*var user = getUser(receivedId)
        
        io.to(user.socketId).emit('getMessage', {
            senderId,
            text
        })*/
        
        io.emit('getMessage', {
            _id,
            sender: senderId,
            text: text,
            createdAt: Date.now(),
            receivedId
        })

        
    })

    //new notification to friend
    socket.on('newNotificationMsg', ({conversationId, senderId, receivedId}) => {
        io.emit('newNotification', {
            conversationId,
            senderId,
            receivedId
        })
    })
    
    //event of disconnection logout
    socket.on('userDisconnected', () => {
        
        removeUser(socket.id)
        io.emit('getUsers', users)
        
    })
    
    //user writing
    socket.on('userWriting', ({senderId, receivedId, state}) => {
        
        io.emit('getUserWriting', {senderId, receivedId, state})
        
    })
    
    //listening for updates to user reviews
    socket.on('updateEvaluations', () => {

        io.emit('sendUpdateEvaluations')

    })

})

//server listening 
const port = process.env.PORT || 3002
server.listen(port, () => {
    console.log(`Server running on the port ${port}...`)
})
