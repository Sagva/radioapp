const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");

// User routes setup goes underneath here...
router.get('/whoami', userController.whoami)
//url for checking in the browser http://localhost:3000/api/v1/users/whoami

router.post('/login', userController.login)
//url for checking in the browser http://localhost:3000/api/v1/users/login

router.get('/logout', userController.logout)
router.post('/register', userController.register)
router.post('/likedchannels', userController.registerChannelsLike)


module.exports = router;
