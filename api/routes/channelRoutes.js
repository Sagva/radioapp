const express = require('express')
const router = express.Router()
const channelController = require('../controllers/channelController')

router.get('', channelController.getAllChannels)
router.get('/:channelId', channelController.getChannelbyId)
//url for checking in the browser http://localhost:3000/channels/132

router.get('/schedule/:channelId/:chosenDate', channelController.getChannelSchedule)
//url for checking in the browser http://localhost:3000/api/v1/channels/schedule/132/2021-04-22

router.get('/programs/:channelId/', channelController.getChannelPrograms)
//url for checking in the browser http://localhost:3000/api/v1/channels/programs/132

router.get('/program/:programId/', channelController.getProgramById)
//url for checking in the browser http://localhost:3000/api/v1/channels/program/1603




module.exports = router;