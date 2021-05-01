import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ChannelContext } from "../contexts/ChannelContext";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/ChannelList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { LikesContext } from "../contexts/LikesContext";


const ChannelList = () => {
    const history = useHistory()
    const location = useLocation() //for checking location.pathname

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
        if (!isLiked) {
            await registerChannelsLike(userAndChannelId)
                .then(result => {
                    if (result.success) {
                        getLikedChannelsByUserId(activeUser.id)
                    }
                })
        } else if (isLiked) {
            await deleteChannelsLike(userAndChannelId)
                .then(result => {
                    if (result.success) {
                        getLikedChannelsByUserId(activeUser.id)
                    }
                })
        }
        setIsLikePressed(!isLikePressed)

    }

    let content = ''
    let channelsToRender
    if (location.pathname === '/favoritechannels' && markedChannels) {
        channelsToRender = markedChannels.filter((element) => element.isLiked === true)

    } else {
        channelsToRender = markedChannels ? markedChannels : channels
    }

    
    if (channels) {
        // let channelsToRender = markedChannels ? markedChannels : channels
        

        content = <div className='container d-flex flex-wrap justify-content-center justify-content-lg-evenly justify-content-xl-between py-3'>

            {channelsToRender.map((ch, i) => (
                <div key={i}>
                    <div className={styles.imageBox} >
                        {isLoggedIn && <button onClick={() => handleLikeClick(ch.isLiked, ch.id)} type='button' id={`btn${ch.id}`} className={styles.btnLikeChannel}>
                            <FontAwesomeIcon icon={faHeart}
                                className={`${styles.heartIcon}`}
                                style={ch.isLiked ? { color: 'red' } : { color: 'white' }}
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
            <h1 className={styles.heading}>{location.pathname === '/favoritechannels'? 'Favoritkanaler' : 'Våra kanaler'}</h1>
            {content}

        </div>
    );
};

export default ChannelList;
