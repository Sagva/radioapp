const express = require("express");

const router = express.Router();
const likesController = require("../controllers/likesController");


router.post('/likedchannels', likesController.registerChannelsLike)
router.get('/likedchannels/getbyuserid/:userId', likesController.getLikedChannelsByUserId)
router.delete('/likedchannels/delete', likesController.deleteChannelsLike)

module.exports = router;
