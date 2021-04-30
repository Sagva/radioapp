const express = require("express");

const router = express.Router();
const likesController = require("../controllers/likesController");
//const likesPrefix = "/api/v1/likes";

router.post('/likedchannels', likesController.registerChannelsLike)
router.get('/likedchannels/getbyuserid/:userId', likesController.getLikedChannelsByUserId)
router.delete('/likedchannels/delete', likesController.deleteChannelsLike)
router.post('/likedprograms', likesController.registerProgramsLike)
router.get('/likedprograms/getbyuserid/:userId', likesController.getLikedProgramsByUserId)
router.delete('/likedprograms/delete', likesController.deleteProgramsLike)

module.exports = router;
