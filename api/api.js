//import of modules
    const express = require('express')
    const app = express()
    const cors = require('cors')
    const mongoose = require('mongoose')
    const router = require('./routes')
//Config
    //connect with database MongoDB
        mongoose.connect(process.env.MONGO_URL_REDUX).then(() => {
            console.log('MongoDB connected...')
        }).catch( err => {
            console.log(err)
        })
    //cors
        app.use(cors({
            origin: '*'
        }))
    //test
        //....
    //body parser
        app.use(express.urlencoded({extended: true, limit: '10mb'}))
        app.use(express.json({limit: '10mb'}))
//Routes
    app.use(router)
//server listening
    const port = process.env.PORT || 3001
    app.listen(port, () => {
        console.log(`Server running on the url http://localhost:${port}`)
    })
