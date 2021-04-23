const sqlite3 = require("sqlite3");
const fetch = require('node-fetch')
const json = 'format=json'
const paginationFalse = 'pagination=false'
const utils = require('../core/utilities')

const getAllChannels = async (req,res) => {
    let allChannels = await fetch(`http://api.sr.se/api/v2/channels/?${json}&${paginationFalse}`)
    allChannels = await allChannels.json()
    res.json(allChannels)
}
const getChannelbyId = async (req,res) => {
    let channel = await fetch(`http://api.sr.se/api/v2/channels/${req.params.channelId}?${json}`)
    channel = await channel.json()
    res.json(channel)
}

const getChannelSchedule = async (req,res) => {
    //format 2021-04-25
    let schedule = await fetch(`http://api.sr.se/api/v2/scheduledepisodes?${json}&${paginationFalse}&channelid=${req.params.channelId}&date=${req.params.chosenDate}`)
    schedule = await schedule.json()
    
    schedule.schedule = schedule.schedule.map(obj => {
        return {
            ...obj,
            starttimeutc: utils.convertDateToTime(obj.starttimeutc, 'time'),
            endtimeutc: utils.convertDateToTime(obj.endtimeutc, 'time'),
            date: utils.convertDateToTime(obj.starttimeutc),
        }
    })

    res.json(schedule.schedule)
}


module.exports = {
    getAllChannels,
    getChannelbyId,
    getChannelSchedule
}