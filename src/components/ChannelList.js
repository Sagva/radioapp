import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ChannelContext } from "../contexts/ChannelContext";
import styles from "../styles/ChannelList.module.css";

const ChannelList = () => {
    const history = useHistory()
  
    const { channels, oneChannel } = useContext(ChannelContext);
    
   
    let content = ''

    if(channels) {
        let fetchedChannels = channels.channels
        
        content = <div className={styles.wrapper}>{fetchedChannels.map((ch, i) => (
                <div key={i} className={styles.channelBox} onClick={() => history.push(`/channels/${ch.id}`)}>
                    <img  src={ch.image} alt={`${ch.channeltype} ${ch.name}`}></img>
                </div>  
            ))}
        </div>
    } else {
        content = <div>Loading...</div>
    }

    return (
        <div className={styles.channelList}>
           
            {content}
            
        </div>
    );
};

export default ChannelList;
