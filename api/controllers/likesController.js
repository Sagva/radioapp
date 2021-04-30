const sqlite3 = require("sqlite3");
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "../../DB/radioappUsersBD.db"));

const registerChannelsLike = (req,res)=> {
    let channelsLike = req.body
    //before trying to register the like, check if the like alredy exist
    let query = `SELECT * FROM likedChannels WHERE channelId = $channelId AND userId = $userId`

    let params = {
        $channelId: channelsLike.channelId,
        $userId: channelsLike.userId,
    }
    db.get(query, params, (err, likeExist) => {
        if(likeExist) {
            res.status(400).json({error: 'This channel is already liked'})
            
        } else {
            
            //add to dataBase
            query = `INSERT INTO likedChannels (channelId, userId) VALUES ($channelId, $userId)`
            
            db.get("PRAGMA foreign_keys = ON")//forses SQlite to validate foreign key in order to not add likes from users which dosen't exist
            db.run(query, params, function(err) {
                if(err) {
                    res.status(400).json({error: err})
                    return
                }
                res.json({success: "Channel regestered in likedChannel successfully"})
            })
        }
    })
}
const getLikedChannelsByUserId = (req,res)=> {
    let query = `SELECT * FROM likedChannels WHERE userId = $userId`
    let params = {$userId: req.params.userId}
    db.all(query, params, (err, likedChannels) => {
        if(!likedChannels) {
            res.status(400).json({error: 'There are no liked channels'})
        } else {
            res.json({
                success: "Liked channels are obtained", 
                likedChannels: likedChannels
            })
                return

        }
    })
    
}
const deleteChannelsLike = (req,res)=> {
    let channelsLike = req.body
    console.log(`channelsLike in deleteChannelsLike`, channelsLike);
    //before trying to register the like, check if the like alredy exist
    let query = `SELECT * FROM likedChannels WHERE channelId = $channelId AND userId = $userId`

    let params = {
        $channelId: channelsLike.channelId,
        $userId: channelsLike.userId,
    }
    db.get(query, params, (err, likeExist) => {
        if(likeExist) {
            
            //delete from dataBase
            query = `DELETE FROM likedChannels WHERE channelId = $channelId AND userId = $userId`
            
            db.run(query, params, function(err) {
                if(err) {
                    console.log(`in deleteChannelsLike error`, err);
                    res.status(400).json({error: err})
                    return
                }
                res.json({success: "Channel was deleted from likedChannel successfully"})
            })
        } else {
            res.status(400).json({error: 'There is no such channel in likedChannels'})
        }
    })
}

module.exports = {
    registerChannelsLike,
    getLikedChannelsByUserId,
    deleteChannelsLike
};
