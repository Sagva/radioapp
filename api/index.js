const express = require('express')
const session = require('express-session')

const path = require("path");
const port = 3001

const channelRoutes = require('./routes/channelRoutes')
const userRoutes = require('./routes/userRoutes')
const likesRoutes = require('./routes/likesRoutes')

const prefixRoute = '/api/v1'
const userPrefix = "/api/v1/users";
const likesPrefix = "/api/v1/likes";

// Server setup
const server = express()

// Make sure the server can read the req.body object
server.use(express.json())

//Express-session setup
server.use(
    session({
      // The secret is required and it is used to sign the session ID cookie. Can either be a string or an array of strings. This should be extacted to its own file, it could be a json-file and it should also be gitignored.
      secret: "The Phantom Menace",
      // resave forces the session to be saved back to the session store, even if the session was never modified during the request.
      resave: false,
      // saveUninitialized forces the session to be saved to the store. A session is uninitialized when it is new but not modified
      saveUninitialized: true,
      // Settings object for the session ID cookie, there are many settings you can do, most of the are not required, see the docs for more info. We only need the secure-option in this case. We set this to "auto" in order to enable epress-session to automatically match the determined security of the connection.
      cookie: { secure: "auto" },
    })
);

// Routes setup
server.use(prefixRoute, channelRoutes)
server.use(userPrefix, userRoutes);
server.use(likesPrefix, likesRoutes);

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

