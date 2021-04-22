const sqlite3 = require("sqlite3");
const fetch = require('node-fetch')

const getAllChannels = async (req,res) => {
    let allChannels = await fetch(`http://api.sr.se/api/v2/channels/?format=json&pagination=false`)
    allChannels = await allChannels.json()
    res.json(allChannels)
}
const getChannelbyId = async (req,res) => {
    console.log(req.params.channelId);
    let channel = await fetch(`http://api.sr.se/api/v2/channels/${req.params.channelId}?format=json`)
    channel = await channel.json()
    res.json(channel)
}

module.exports = {
    getAllChannels,
    getChannelbyId
}