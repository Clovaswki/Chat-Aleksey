const router = require('express').Router()
//functions helpers
    const { verifyTokenJWT } = require('./helpers/verifyJWT')
    const { checkAdminAndToken } = require('./helpers/verifyAdmin')

//controllers
    //controllers of authentication
    const {
        login,
        register,
        verifyJWT,
        getUsers,
        changeUser,
        verifyAdmin,
        changeOptionsAdmin,
        checkUserBlocked
    } = require('./controllers/authController')
    //controllers of chat
    const { 
        NewConversation, 
        GetConversations, 
        NewMessage,
        GetMessages,
        deleteMessage,
        newEvaluation,
        getEvaluation,
        getAllMessages
    } = require('./controllers/chatController')
    //controllers of other functions
    const { sendInfoOfDatabase } = require('./controllers/otherFunctionsController')
    
    //controller of badge new messages
    const { putNewMessage, deleteNewMessage, getNewMessage } = require('./controllers/newMessageController')

//routes
    //User authenticate
        //Login
        router.post('/user/login', login)
        //Register
        router.post('/user/register', register)
        //verify JWT token
        router.get('/user/verify-token', verifyJWT)
    //Users
        //get all users
        router.get('/user/get-users', verifyTokenJWT, getUsers)
        //change one or more properties of user
        router.post('/user/change-user', verifyTokenJWT, changeUser)
        //check if user is blocked
        router.get('/user/check-blocked/:userId', checkUserBlocked)
    //Chat messenger
        //new conversation
        router.post('/chat/new-conversation', verifyTokenJWT, NewConversation)
        //get conversations
        router.get('/chat/get-conversations/:userId', verifyTokenJWT, GetConversations)
        //new message
        router.post('/chat/new-message', verifyTokenJWT, NewMessage)
        //get messages
        router.get('/chat/get-messages', verifyTokenJWT, GetMessages)
        //delete message
        router.get('/chat/delete-messages', verifyTokenJWT, deleteMessage)
        
        //evaluations
        //post evaluation on the chat aleksey
        router.post('/chat/evaluation-chat', verifyTokenJWT, newEvaluation)
        //get evaluations
        router.get('/chat/get-evaluations', verifyTokenJWT, getEvaluation)
        //other functions
        //sent info of database to admin page
        router.get('/chat/informations', verifyTokenJWT, sendInfoOfDatabase)
        
    //Chat messenger - badge new messages
        //get all new messages
        router.get('/chat/get-newMsg', verifyTokenJWT, getNewMessage)
        //send new message
        router.get('/chat/send-newMsg', verifyTokenJWT, putNewMessage)
        //delete new message
        router.delete('/chat/delete-newMsg/:conversationId', verifyTokenJWT, deleteNewMessage)
    //Admin
        //verify admin
        router.get('/check-admin', verifyAdmin)
        //get all messages
        router.get('/chat/get-allmessages', checkAdminAndToken, getAllMessages)
        //change options of user by admin
        router.post('/change-option', checkAdminAndToken, changeOptionsAdmin)    

module.exports = router