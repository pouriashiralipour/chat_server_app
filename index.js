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

app.get('/', (req, res)=>{
    res.send('<h1>HELLO! SERVER RUNNNIG</h1>')
})

// run server that we created
server.listen(port, ()=>{
    console.log(`server is runnig on port: ${port}`)
})