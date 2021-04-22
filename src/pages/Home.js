
import styles from "../styles/Home.module.css";
import ChannelList from "../components/ChannelList";

const HomePage = () => {
    
    return (
        <div className={styles.home}>
            <h1>Våra kanaler</h1>
            <ChannelList></ChannelList>
            
        </div>
    );
};

export default HomePage;

// import { useContext } from "react";
// import { useHistory } from "react-router-dom";
// import { ChannelContext } from "../contexts/ChannelContext";
// import styles from "../styles/Home.module.css";

// const HomePage = () => {
//     const history = useHistory()
  
//     const { channels, oneChannel } = useContext(ChannelContext);
//     let fetchedChannels;
    
   
//     let content = ''
//     if(channels) {
//         fetchedChannels = channels.channels
//         console.log(channels.channels);
//         content = <div className={styles.wrapper}>{fetchedChannels.map((ch, i) => (

//             <div key={i} className={styles.channelBox} onClick={() => history.push(`/channels/${ch.id}`)}>
//                 <img  src={ch.image} alt={`${ch.channeltype} ${ch.name}`}></img>
//             </div>  
//         ))}
        
            
//         </div>
//     } else {
//         content = <div>Loading...</div>
//     }

//     return (
//         <div className={styles.home}>
//             <h1>Våra kanaler</h1>
//             {content}
            
//         </div>
//     );
// };

// export default HomePage;
