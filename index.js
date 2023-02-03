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
const mongoClient = require('mongodb').mongoClient

// variables
const port = process.env.PORT || 3000
const users = []



// run socket in our server
// socket.io
io.on('connection', socket => {
    const socketId = socket.id
    const userId = socket.handshake.query.userId
    // function for find socketId and userId for give message 
    users.push({
        userId: userId,
        socketId: socketId
    })
    // who connected ?
    console.log(`a new socket connection with id => (${userId})`)

    // function for join users to room
    socket.on('join-room', (event)=>{
        socket.join(`ROOMID::${event.roomId}`)
        console.log(`user: ${userId} join to a room: ${event.roomId}`)
    })

    // function for leave users from room
    socket.on('leave-room', (event)=>{
        socket.leave(`ROOMID::${event.roomId}`)
        console.log(`use: ${userId} left to a room: ${event.roomId}`)
    })


    // send message to another user
    socket.on('send-message', (event)=>{

        if(!!event.roomId){
            // Multi persons
            io.to(`ROOMID::${event.roomId}`).emit('onMessage', {
                'message': event.message,
                'from': userId,
                'roomId': event.roomId
            })
            
        }else{
            // Indivisually 
            console.log(`user ${userId} send a message to ${event.to} => ${event.message}`)
            const filterUsers = users.filter((elem) => elem.userId == event.to)
            const receiverSocketId =  filterUsers[0].socketId
            if(filterUsers.length > 0){
                socket.broadcast.to(receiverSocketId).emit('onMessage', {
                    'message': event.message,
                    'from': userId
                    })
            }
        }
    })

    // who disconnected ?
    socket.on('disconnect', (event)=>{
        console.log(`user (${userId}) disconnected.`)
        // delete userData
        const index = users.indexOf((elem) => elem.userId == userId)
        users.slice(index, 1)
    })
    
})

// create port for server
//  Restful APIs
app.get('/', (req, res)=>{
    res.send('<h1>HELLO! SERVER RUNNNIG</h1>')
})
// Restful Api for register user
app.post('/register', (req, res)=>{
    const userName = req.body.username
    const password = req.body.password
})

// run server that we created
// Server listener
server.listen(port, ()=>{
    console.log(`server is runnig on port: ${port}`)
})