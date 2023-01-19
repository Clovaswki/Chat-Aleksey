# Getting Started with Create React App

## chat app for web - Chat Aleksey

This project is a chat web application built with ReactJS library. 
The web app has an **Rest Api** built in **ExpressJS** framework that performs a CRUD system with the NoSql 
database **mongoDB** besides of a authentication flow based in JWT token. 

### websocket Api

For realtime communication the chat application uses a websocket server built 
with **ExpressJS** framework and **socket.io** library. The websocket server
listen by default on the port **3002**.

## Technologies

Frontent - specified bellow
    
    the application was built with **ReactJS** library.

Backend - specified bellow

    Rest API the Rest Api was built with ExpressJS framework 

    Websocket API the websocket ap was built ExpressJS and Socket.io

## Settings

the main dependencies needed in the project are specified bellow

>**App React** - frontend

    bootstrap => 5.2.0
    axios => 0.27.2
    @material-ui/core => 4.12.4
    @mui/material => 5.10.0
    react-router-dom => 6.3.0

>**Rest API**

    bcryptjs => 2.4.3
    cors => 2.8.5
    dotenv => 16.0.1
    express => 4.18.1
    jsonwebtoken => 8.5.1
    mongoose => 6.5.2
    nodemon => 2.0.19
    passport => 0.6.0
    passport-local => 1.0.0

>**Websocket server**

    express => 4.18.1
    mongoose => 6.5.3
    nodemon => 2.0.19
    socket.io => 4.5.1

## Start

**App React**

    npm start - start the app for production

    default port:3000

**Rest API**

    npm run dev - start the API for development

    default port:3001

**Websocket API** 

    npm run dev - start the API for development

    default port:3002

## Execution

![login](https//i.ibb.co/ssxytY4/CA-login.png)

![register](https//i.ibb.co/tQzvQyN/CA-register.png)

![chat](https//i.ibb.co/D14Qygk/CA-homepage.png)

![.](https//i.ibb.co/RPzGTvv/CA-h.png)

![admin](https//i.ibb.co/RzN1DzZ/CA-admin.png)