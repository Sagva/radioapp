import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChannelContext } from "../contexts/ChannelContext";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/ChannelList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { LikesContext } from "../contexts/LikesContext";


const ChannelList = () => {
    const history = useHistory()

    const [isLikePressed, setIsLikePressed] = useState(false); 
  
    const { channels } = useContext(ChannelContext);

    const { activeUser, isLoggedIn } = useContext(UserContext);
    const { registerChannelsLike, getLikedChannelsByUserId, markedChannels, deleteChannelsLike } = useContext(LikesContext);

    
    const handleLikeClick = async (isLiked, channelId) => {
        console.log(`channelId is`, channelId, `user id is ${activeUser.id}`) //{ userId: 2, channelId: 132}
        let userAndChannelId = { 
            userId: activeUser.id,
            channelId: channelId
        }
        if(!isLiked) {
            await registerChannelsLike(userAndChannelId)
            .then(result => {
                if(result.success) {
                    document.querySelector(`#btn${channelId}`).children[0].style.color = 'red'
                    getLikedChannelsByUserId(activeUser.id)
                }
            })
        } else {
            await deleteChannelsLike(userAndChannelId)
            .then(result => {
                if(result.success) {
                    document.querySelector(`#btn${channelId}`).children[0].style.color = 'white'
                    getLikedChannelsByUserId(activeUser.id)
                }
            })
        }
        setIsLikePressed(!isLikePressed)
       
    }

    let content = ''

    if(channels) {
        let channelsToRender = markedChannels ? markedChannels : channels
        
        content = <div className='container d-flex flex-wrap justify-content-center justify-content-lg-evenly justify-content-xl-between py-3'> 
                    
                        {channelsToRender.map((ch, i) => (
                           <div key={i}>
                            <div className={styles.imageBox} >
                                { isLoggedIn && <button onClick={()=> handleLikeClick(ch.isLiked, ch.id)} type='button' id={`btn${ch.id}`} className={styles.btnLike}>
                                    <FontAwesomeIcon icon={faHeart} 
                                        className={`${styles.heartIcon}`} 
                                        style={ ch.isLiked ? { color: 'red'} : {color : 'white'} } 
                                    />
                                </button>}
                                <img onClick={() => history.push(`/channel/getbyid/${ch.id}`)} src={ch.image} alt={`${ch.channeltype} ${ch.name}`}></img>
                            </div>  
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
