// import dotenv library for use .env file
require('dotenv').config()

//  import library that we need
const express = require('express')
const app = express()
const http = require('http')
const { Socket } = require('socket.io')

// create server 
const server = http.createServer(app)
// import socket.io on our server
const io = require('socket.io')(server)


// run socket in our server
// socket.io
io.on('connection', socket => {
    const socketId = socket.id
    const userId = socket.handshake.query.userId

    // who connected ?
    console.log(`a new socket connection with id => (${userId})`)

    // send message to another user
    socket.on('send-message', (event)=>{
        console.log(`user ${userId} send a message to ${event.to} => ${event.message}`)
    })

    // who disconnected ?
    socket.on('disconnect', (event)=>{
        console.log(`user (${userId}) disconnected.`)
    })
    
})

// create port for server
//  Restful APIs
const port = process.env.PORT || 3000

app.get('/', (req, res)=>{
    res.send('<h1>HELLO! SERVER RUNNNIG</h1>')
})

// run server that we created
// Server listener
server.listen(port, ()=>{
    console.log(`server is runnig on port: ${port}`)
})