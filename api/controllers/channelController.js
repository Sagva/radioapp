const getAllChannels = async (req,res) => {
    let allChannels = fetch(`http://api.sr.se/api/v2/channels/?format=json`)
    allChannels = await allChannels.json()
    res.json(allChannels)
}

module.exports = {
    getAllChannels
}