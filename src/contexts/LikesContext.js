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

  //likedPrograms from DB for active user
  const [likedPrograms, setLikedPrograms] = useState(false);
  
  //All channels from SVT API, but marked if some channel is liked
  const [markedChannels, setMarkedChannels] = useState(false);
  
  useEffect(() => {
    getLikedChannelsByUserId(activeUser.id) //getting liked channes from DB for active user as soon as active user is known
    getLikedProgramsByUserId(activeUser.id)
  }, [activeUser]);

  

  useEffect(() => {
    //after we've got known that user is logged in and we got channels from SVT as well as liked channels from DB for active user
    if (isLoggedIn && channels && likedChannels) {
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
    return result;
  };

  //getting liked channes from DB for particular user
  const getLikedChannelsByUserId = async (userid) => {
    let likedChannels = await fetch(`/api/v1/likes/likedchannels/getbyuserid/${userid}`);
    likedChannels = await likedChannels.json();
    setLikedChannels(likedChannels.likedChannels)
  };

  //take one channel/program id from SR API and compare it with likedchannel/likedprograms for particular user from DB 
  //returns either true or false 
  const isChannelOrProgramLiked = (id, listOfLikesFromDB) => {
    //listOfLikesFromDB from DB [{channelId: 132, userId: 8}, {channelId: 213, userId: 8}...]
    //or                        [{programId: 2523, userId: 8}, {programId: 4425, userId: 8}...]

    let onlyIdFromBD = listOfLikesFromDB.map((el) => { //separation channel/pragram id from user id in order to reuse function for both cases
         if(el.channelId) {
           return el.channelId
         } else if(el.programId) {
           return el.programId
         }
    })
    
    for (let i = 0; i < onlyIdFromBD.length; i++) {
      if (onlyIdFromBD[i] === id) {
        return true
      }
    }
    return false
  }

  //take all channels from SR API and for every channel Id run function isChannelOrProgramLiked for checking if it liked or not
  const markLikedChannel = () => {
    let markedChannel = channels.map((channel) => {
      let isLiked = isChannelOrProgramLiked(channel.id, likedChannels) //returns true or false
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

  //add liked program to DB
  const registerProgramsLike = async (userAndProgramId) => { //expecting format { userId: 2, channelId: 132}
    console.log(`userAndProgramId inside registerProgramsLike`, userAndProgramId)
    let result = await fetch("/api/v1/likes/likedprograms", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userAndProgramId),
    });
    result = await result.json();
    console.log('inside register function', result);
    return result;
  };

//getting liked programs from DB for particular user
const getLikedProgramsByUserId = async (userid) => {
  let likedPrograms = await fetch(`/api/v1/likes/likedprograms/getbyuserid/${userid}`);
  likedPrograms = await likedPrograms.json();
  setLikedPrograms(likedPrograms.likedPrograms)
};



//delete liked program from DB
const deleteProgramsLike = async (userAndProgramId) => { //expecting format { userId: 2, channelId: 132}
  console.log(`userAndProgramId`, userAndProgramId)
  let result = await fetch("/api/v1/likes/likedprograms/delete", {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userAndProgramId),
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
    registerProgramsLike,
    getLikedProgramsByUserId,
    isChannelOrProgramLiked,
    likedPrograms,
    deleteProgramsLike
  };

  return (
    <LikesContext.Provider value={values}>
      {props.children}
    </LikesContext.Provider>
  );
};

export default LikesProvider;
