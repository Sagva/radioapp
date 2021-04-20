const express = require('express')
const server = express()
const channelRoutes = require('./routes/channelRoutes')
const port = 3001
const prefixRoute = 'api/v1/channels'


server.listen(port, (err) => {
    if(err) {
        console.error('The server couldn\'t start');
        console.log(err);
    }
    console.log('Listening on port 8080');
})

server.use(express.json())

// Serve static files, makes the frontend files "available" to the backend
server.use(express.static(path.join(__dirname, "../build")));

server.use(prefixRoute, channelRoutes)

