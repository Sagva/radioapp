import { useContext } from "react";
import { ChannelContext } from "../contexts/ChannelContext";
import styles from "../styles/Home.module.css";

const HomePage = () => {
  
    const { channels } = useContext(ChannelContext);
    console.log(channels);

//   const renderChannels = () => {
//     return channels.map((channel) => (
//       <div>
        
//       </div>
//     ));
//   };

    return (
        <div className={styles.home}>
            <h1>This is the Home page</h1>
        </div>
    );
};

export default HomePage;
