const express = require('express')
const router = express.Router()
const channelController = require('../controllers/channelController')

router.get('/allchannels', channelController.getAllChannels)

router.get('/channel/getbyid/:channelId', channelController.getChannelbyId)
//url for checking in the browser http://localhost:3000/channels/132

router.get('/schedule/:channelId/:chosenDate', channelController.getChannelSchedule)


router.get('/allprograms/:channelId/', channelController.getChannelPrograms)
//url for checking in the browser http://localhost:3000/api/v1/allprograms/132

router.get('/program/getbyid/:programId/', channelController.getProgramById)
//url for checking in the browser  http://localhost:3000/api/v1/program/getbyid/519

router.get('/programcategories/getall/:dummyId', channelController.getAllCategories)
//url for checking in the browser 

router.get('/programs/getbycategoryid/:categotyid', channelController.getProgramsByCategoryId)
//url for checking in the browser http://localhost:3000/api/v1/programs/getbycategoryid/82 //Dokumentär

router.post('/program/play', channelController.getAudioSource)
//url for checking in the browser http://localhost:3000/api/v1/program/play    





module.exports = router;