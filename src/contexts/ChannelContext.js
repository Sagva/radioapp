import { createContext, useState, useEffect } from "react";

export const ChannelContext = createContext();

const ChannelContextProvider = (props) => {
  const [channels, setChannels] = useState(null);
  
  

  useEffect(() => {
    getAllChannels();
  }, []);

  const getAllChannels = async () => {
    let channels = await fetch("/api/v1/channels");
    channels = await channels.json();
    
    setChannels(channels);
  };

  const getChannelbyId = async (channelId) => {
    let channel = await fetch(`/api/v1/channels/${channelId}`);
    channel = await channel.json();
    
    return channel

    // setOneChannel(channel);
  };
  const getChannelSchedule = async (channelId, chosenDate) => {
    let schedule = await fetch(`/api/v1/channels/schedule/${channelId}/${chosenDate}`);
    schedule = await schedule.json();
    
    return schedule

    // setSchedule(schedule);
  };

 

  const values = {
    channels,
    getChannelbyId,
    getChannelSchedule
  };

  return (
    <ChannelContext.Provider value={values}>
      {props.children}
    </ChannelContext.Provider>
  );
};

export default ChannelContextProvider;
