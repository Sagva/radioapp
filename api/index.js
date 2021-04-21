const express = require('express')
const path = require("path");
const channelRoutes = require('./routes/channelRoutes')
const port = 3001
const prefixRoute = '/api/v1/channels'

// Server setup
const server = express()

// Make sure the server can read the req.body object
server.use(express.json())

// Routes setup
server.use(prefixRoute, channelRoutes)

// Serve static files, makes the frontend files "available" to the backend
server.use(express.static(path.join(__dirname, "../build")));

// Starts the server
server.listen(port, (err) => {
    if(err) {
        console.error('The server couldn\'t start');
        console.log(err);
    }
    console.log('Listening on port 8080');
})

