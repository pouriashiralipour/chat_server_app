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
    console.log(`a new socket connection with id => (${socket.id})`)
    console.log(socket.handshake)
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