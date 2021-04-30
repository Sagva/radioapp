import { createContext, useState, useEffect, useContext } from "react";
import { ChannelContext } from "../contexts/ChannelContext";
import { UserContext } from "../contexts/UserContext";

export const LikesContext = createContext();

const LikesProvider = (props) => {
  const { activeUser, isLoggedIn } = useContext(UserContext)

  //All channels from SVT API
  const { channels } = useContext(ChannelContext)

  //likedChannels from DB for active user
  const [likedChannels, setLikedChannels] = useState(false);
  
  //All channels from SVT API, but marked if some channel is liked
  const [markedChannels, setMarkedChannels] = useState(false);
  
  useEffect(() => {
    getLikedChannelsByUserId(activeUser.id) //getting liked channes from DB for active user as soon as active user is known
  }, [activeUser]);

  useEffect(() => {
    console.log(`liked channels from DB are `, likedChannels)
  }, [likedChannels]);

  useEffect(() => {
    //after we got know that user is logged in and we got channels from SVT as well as liked channels from DB for active user
    if (isLoggedIn && channels && likedChannels) {
      console.log(`activeUser.id is`, activeUser.id);
      markLikedChannel() //set mark isLiked at SVT channels (true or false depense on if the channel was in LikedChannels in the DB) 
    }
  }, [isLoggedIn, channels, likedChannels]);


  //add liked channel to DB
  const registerChannelsLike = async (userAndChannelId) => { //expecting format { userId: 2, channelId: 132}
    let result = await fetch("/api/v1/likes/likedchannels", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userAndChannelId),
    });
    result = await result.json();
    console.log('inside register function', result);
    return result;
  };

  //getting liked channes from DB for particular user
  const getLikedChannelsByUserId = async (userid) => {
    let likedChannels = await fetch(`/api/v1/likes/likedchannels/getbyuserid/${userid}`);
    likedChannels = await likedChannels.json();
    setLikedChannels(likedChannels.likedChannels)
  };

  //take one channel id from SR API and compare it with liked channel for particular user from DB 
  //returns either true or false 
  const isChannelLiked = (channelId, likedChannels) => {
    //likedChannels from DB [{channelId: 132, userId: 8}, {channelId: 213, userId: 8}...]

    for (let i = 0; i < likedChannels.length; i++) {
      if (likedChannels[i].channelId === channelId) {
        return true
      }
    }
    return false
  }

  //take all channels from SR API and for every channel Id run function isChannelLiked for checking if it liked or not
  const markLikedChannel = () => {
    let markedChannel = channels.map((channel) => {
      let isLiked = isChannelLiked(channel.id, likedChannels) //returns true or false
      return { ...channel, isLiked: isLiked }
    })
    setMarkedChannels(markedChannel)
  }

  //delete liked channel from DB
  const deleteChannelsLike = async (userAndChannelId) => { //expecting format { userId: 2, channelId: 132}
    console.log(`userAndChannelId`, userAndChannelId)
    let result = await fetch("/api/v1/likes/likedchannels/delete", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userAndChannelId),
    });
    result = await result.json();
    console.log('inside deleteChannelsLike function', result);
    return result;
  };

  const values = {
    registerChannelsLike,
    getLikedChannelsByUserId,
    markedChannels,
    deleteChannelsLike,
    getLikedChannelsByUserId
  };

  return (
    <LikesContext.Provider value={values}>
      {props.children}
    </LikesContext.Provider>
  );
};

export default LikesProvider;
