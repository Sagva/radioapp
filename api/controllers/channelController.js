const sqlite3 = require("sqlite3");
const fetch = require('node-fetch')

const getAllChannels = async (req,res) => {
    let allChannels = await fetch(`http://api.sr.se/api/v2/channels/?format=json`)
    allChannels = await allChannels.json()
    res.json(allChannels)
}

module.exports = {
    getAllChannels
}