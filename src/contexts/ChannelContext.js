import { createContext, useState, useEffect } from "react";

export const ChannelContext = createContext();

const ChannelContextProvider = (props) => {
  const [channels, setChannels] = useState(null);
  const [categories, setCategories] = useState(null);
  
  useEffect(() => {
    getAllChannels()
    getAllCategories()
    
  }, []);

  
  const getAllChannels = async () => {
    let channels = await fetch(`/api/v1/allchannels`);
    channels = await channels.json();
    setChannels(channels);
  };

  const getChannelbyId = async (channelId) => {
    let channel = await fetch(`/api/v1/channel/getbyid/${channelId}`);
    channel = await channel.json();
    
    return channel
  };

  const getChannelSchedule = async (channelId, chosenDate) => {
    let schedule = await fetch(`/api/v1/schedule/${channelId}/${chosenDate}`);
    schedule = await schedule.json();
    
    return schedule
  };

  const getChannelPrograms = async (channelId) => {
    let programs = await fetch(`/api/v1/allprograms/${channelId}`);
    programs = await programs.json();
    
    return programs
  };

  const getProgrambyId = async (programId) => {
    let program = await fetch(`/api/v1/program/getbyid/${programId}`);
    program = await program.json();
    console.log(program);
    return program
  };

  const getAllCategories = async () => {
    let categories = await fetch(`/api/v1/programcategories/getall/1`);
    categories = await categories.json();
    setCategories(categories)
  };

  const getProgramsByCategoryId = async (categoryId) => {
    let programsByCategoryId = await fetch(`/api/v1/programs/getbycategoryid/${categoryId}`);
    programsByCategoryId = await programsByCategoryId.json();
    console.log(`got programs by category ID`, programsByCategoryId);
    return programsByCategoryId
  };

  const values = {
    channels,
    categories,
    getChannelbyId,
    getChannelSchedule,
    getChannelPrograms,
    getProgrambyId,
    getProgramsByCategoryId
  };

  return (
    <ChannelContext.Provider value={values}>
      {props.children}
    </ChannelContext.Provider>
  );
};

export default ChannelContextProvider;
