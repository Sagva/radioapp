const sqlite3 = require("sqlite3");
const fetch = require('node-fetch')
const json = 'format=json'
const paginationFalse = 'pagination=false'
const utils = require('../core/utilities')

const getAllChannels = async (req,res) => {
    console.log('startar getAllChannels');
    let allChannels = await fetch(`http://api.sr.se/api/v2/channels/?${json}&${paginationFalse}`)
    if(!allChannels.ok){
        throw new Error(allChannels.status)
    }
    
    allChannels = await allChannels.json()
    allChannels = res.json(allChannels)
    
    
}


const getChannelbyId = async (req,res) => {
    let channel = await fetch(`http://api.sr.se/api/v2/channels/${req.params.channelId}?${json}`)
    channel = await channel.json()
    res.json(channel)
}

const getChannelSchedule = async (req,res) => {
    //required date format 2021-04-25
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
const getChannelPrograms = async (req,res) => {
    let programs = await fetch(`http://api.sr.se/api/v2/programs/index?channelid=${req.params.channelId}&${json}&${paginationFalse}`)
    programs = await programs.json()

    res.json(programs)
}
const getProgramById = async (req,res) => {
    let program = await fetch(`http://api.sr.se/api/v2/programs/${req.params.programId}?${json}&${paginationFalse}`)
    program = await program.json()
    res.json(program)
}
const getAllCategories = async (req,res) => {
    let categories  = await fetch(`http://api.sr.se/api/v2/programcategories/?${json}&${paginationFalse}`)
    categories = await categories.json()
    res.json(categories)
}

const getProgramsByCategoryId = async (req,res) => {
    console.log(`category id is`, req.params.categotyid);
    let category = await fetch(`http://api.sr.se/api/v2/programs/index?programcategoryid=${req.params.categotyid}&${json}&pagination=true`)
    category = await category.json()
    res.json(category)
}


module.exports = {
    getAllChannels,
    getChannelbyId,
    getChannelSchedule,
    getChannelPrograms,
    getProgramById,
    getAllCategories,
    getProgramsByCategoryId
}