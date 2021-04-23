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
  };

  const getChannelSchedule = async (channelId, chosenDate) => {
    let schedule = await fetch(`/api/v1/channels/schedule/${channelId}/${chosenDate}`);
    schedule = await schedule.json();
    
    return schedule
  };

  const getChannelPrograms = async (channelId) => {
    let programs = await fetch(`/api/v1/channels/programs/${channelId}`);
    programs = await programs.json();
    
    return programs
  };

 

  const values = {
    channels,
    getChannelbyId,
    getChannelSchedule,
    getChannelPrograms
  };

  return (
    <ChannelContext.Provider value={values}>
      {props.children}
    </ChannelContext.Provider>
  );
};

export default ChannelContextProvider;
