// import dotenv library for use .env file
require('dotenv').config()

//  import library that we need
const express = require('express')
const app = express()
const http = require('http')

// create server 
const server = http.createServer(app)
// import socket.io on our server
const io = require('socket.io')(server)

// create port for server
const port = process.env.PORT || 3000

// run server that we created
server.listen(port, ()=>{
    console.log(`server is runnig on port: ${port}`)
})