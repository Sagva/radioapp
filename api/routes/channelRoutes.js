const express = require('express')
const router = express.Router()
const channelController = require('../controllers/channelController')

router.get('', channelController.getAllChannels)
router.get('/:channelId', channelController.getChannelbyId)
router.get('/schedule/:channelId/:chosenDate', channelController.getChannelSchedule)
//http://localhost:3000/api/v1/channels/schedule/132/2021-04-22

module.exports = router;