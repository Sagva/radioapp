import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //activeUser sets either at first rendering or at Login page, 
  //format of activeUser is {id: 3, email: "www@com.com", userName: "www"}
  const [activeUser, setActiveUser] = useState(false); 

  const [likedChannels, setLikedChannels] = useState(false); 

  useEffect(() => {
    whoAmI()
  }, []);

  useEffect(() => {
    console.log(`activeUser.id is`, activeUser.id);
    getLikedChannelsByUserId(activeUser.id)
  }, [activeUser]);

  useEffect(() => {
    console.log(`liked channels are `, likedChannels)
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

  const registerChannelsLike = async (userAndChannelId) => { //expecting format { userId: 2, channelId: 132}
    let result = await fetch("/api/v1/users/likedchannels", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userAndChannelId),
    });
    result = await result.json();
    console.log('inside register function', userAndChannelId);
    console.log('inside register function', result);
    return result;
  };

  const getLikedChannelsByUserId = async (userid) => {
    console.log(`inside getLikedChannelsByUserId`)
    let likedChannel = await fetch(`/api/v1/users/likedchannels/getbyuserid/${userid}`);
    likedChannel = await likedChannel.json();
    setLikedChannels(likedChannel)
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
    whoAmI
  };

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
