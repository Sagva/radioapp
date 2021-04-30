import { createContext, useState, useEffect, useContext } from "react";
import { ChannelContext } from "../contexts/ChannelContext";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { channels } = useContext(ChannelContext)

  //activeUser sets either at first rendering or at Login page, 
  //format of activeUser is {id: 3, email: "www@com.com", userName: "www"}
  const [activeUser, setActiveUser] = useState(false); 

  //likedChannels from DB
  const [likedChannels, setLikedChannels] = useState(false); 

  //All channels from SVT API, but marked if some channel is liked
  const [markedChannels, setMarkedChannels] = useState(false); 

  useEffect(() => {
    whoAmI()
  }, []);

  useEffect(() => {
    getLikedChannelsByUserId(activeUser.id)
  }, [activeUser]);

  useEffect(() => {
    console.log(`isLoggedIn`, isLoggedIn);
    
    if(isLoggedIn && channels && likedChannels) {
      console.log(`activeUser.id is`, activeUser.id);
      
      markLikedChannel()

    }
  }, [isLoggedIn, channels, likedChannels]);

  useEffect(() => {
    console.log(`liked channels from DB are `, likedChannels)
  }, [likedChannels]);

  
  const whoAmI = async () => {
    let who = await fetch("/api/v1/users/whoami");
    who = await who.json()
    .then(who => {
      if(!who) {
        return
      }
      setIsLoggedIn(true);
      setActiveUser(who)
    })
    .catch(err => console.log(err))
    
  };


  const login = async (userData) => {
    let result = await fetch("/api/v1/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    result = await result.json();
    
    return result;
  };

  const logout = async () => {
    let result = await fetch("/api/v1/users/logout");
    result = await result.json();
    console.log('inside logout function', result);
    return result;
    
  };
  
  const register = async (userData) => {
    let result = await fetch("/api/v1/users/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    result = await result.json();
    console.log('inside register function', userData);
    console.log('inside register function', result);
    return result;
  };

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
    
    for (let i=0; i<likedChannels.length; i++) {
      if (likedChannels[i].channelId === channelId) {
        return true
      }
    }
    return false
  }

  //take all channels from SR API and for every channel Id run function isChannelLiked for checking if it liked or not
  const markLikedChannel = () => {
      let markedChannel = channels.map((channel) =>{ 
          let isLiked = isChannelLiked(channel.id, likedChannels) //returns true or false
          return {...channel, isLiked: isLiked}
      })
      setMarkedChannels(markedChannel)
  }

  //delete liked channel to DB
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
    isLoggedIn,
    setIsLoggedIn,
    login,
    logout,
    register,
    setActiveUser,
    activeUser,
    registerChannelsLike,
    whoAmI,
    markedChannels,
    deleteChannelsLike,
    setMarkedChannels,
    markLikedChannel,
    getLikedChannelsByUserId
  };

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
