import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChannelContext } from "../contexts/ChannelContext";
import styles from "../styles/ChannelList.module.css";


const ChannelList = () => {
    const history = useHistory()
  
    const { channels } = useContext(ChannelContext);

    // useEffect(() => {
    //     console.log(`channels are`, channels)
        
    //   }, [channels]);
    
   
    let content = ''

    if(channels) {
        let fetchedChannels = channels.channels
        
        content = <div className='container d-flex flex-wrap justify-content-center justify-content-lg-evenly justify-content-xl-between py-3'> 
                    
                        {fetchedChannels.map((ch, i) => (
                        <div key={i} className={styles.imageBox} onClick={() => history.push(`/channel/getbyid/${ch.id}`)}>
                            <img  src={ch.image} alt={`${ch.channeltype} ${ch.name}`}></img>
                        </div>  
                        ))}
                     
                    </div>
    } else {
        content = <div>Loading...</div>
    }

    return (
        <div className={styles.channelList}>
            <h1 className={styles.heading}>Våra kanaler</h1>
            {content}
            
        </div>
    );
};

export default ChannelList;
