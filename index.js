//  import library we need
const express = require('express')
const app = express()
const http = require('http')

// create server 
const server = http.createServer(app)

// create port for server
const port = process.env.PORT || 3000