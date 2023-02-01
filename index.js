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
