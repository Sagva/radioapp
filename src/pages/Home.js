import { useContext } from "react";
import { ChannelContext } from "../contexts/ChannelContext";
import styles from "../styles/Home.module.css";

const HomePage = () => {
  
    const { channels } = useContext(ChannelContext);
    let fetchedChannels;
    let content = ''
    if(channels) {
        fetchedChannels = channels.channels
        console.log(channels.channels);
        content = <div className={styles.wrapper}>{fetchedChannels.map((ch, i) => (

            <div key={i} className={styles.channelBox}><img  src={ch.image} alt={`${ch.channeltype} ${ch.name}`}></img></div>  
        ))}</div>
    } else {
        content = <div>Loading...</div>
    }

    return (
        <div className={styles.home}>
            <h1>Our channels</h1>
            {content}
            
        </div>
    );
};

export default HomePage;
