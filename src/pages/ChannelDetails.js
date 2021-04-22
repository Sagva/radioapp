import { useContext, useEffect, useState } from "react";
import { ChannelContext } from "../contexts/ChannelContext";
import styles from "../styles/ChannelDetails.module.css";

const ChannelDetails = (props) => {
    const {channelId} = props.match.params
    const [oneChannel, setOneChannel] = useState(null);

    const {getChannelbyId } = useContext(ChannelContext);
    console.log(channelId);
   
    useEffect(async ()=> {
        let channel = await getChannelbyId(channelId)
        setOneChannel(channel)
        
    }, [channelId])

    
    useEffect( ()=> {
        console.log(oneChannel);
        
    }, [oneChannel])

    let content = ''
    if(oneChannel) {
        let fetchedChannel = oneChannel.channel
        
        content = <div className={styles.wrapper}>
            
            <div>
                <div >
                    <img scr={fetchedChannel.image}></img> 
                </div>
                <div>{fetchedChannel.tagline}</div>
            </div>
        </div>
    } else {
        content = <div>Loading...</div>
    }
  
    return (
        <div className={styles.channelDetails}>
            <h1>channel details</h1>
            {content}
        </div>
    );
};

export default ChannelDetails;
