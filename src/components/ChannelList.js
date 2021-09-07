import { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ChannelContext } from "../contexts/ChannelContext";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/ChannelList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { LikesContext } from "../contexts/LikesContext";


const ChannelList = () => {
    const history = useHistory() //by using history.push happens redirecting to channel page
    const location = useLocation() //for checking location.pathname. Depends on location.pathname the page will render different content

    const { channels } = useContext(ChannelContext);
    const { activeUser, isLoggedIn } = useContext(UserContext);
    const { registerChannelsLike, getLikedChannelsByUserId, markedChannels, deleteChannelsLike } = useContext(LikesContext);


    const handleLikeClick = async (isLiked, channelId) => {
        let userAndChannelId = {
            userId: activeUser.id,
            channelId: channelId
        }
        if (!isLiked) {//if it wasn't like before
            await registerChannelsLike(userAndChannelId)//send like to DB
                .then(result => {
                    if (result.success) {
                        getLikedChannelsByUserId(activeUser.id) //getting all liked channels from DB for the user for refreshing state
                    }
                })
        } else if (isLiked) {
            await deleteChannelsLike(userAndChannelId)//delete like from DB
                .then(result => {
                    if (result.success) {
                        getLikedChannelsByUserId(activeUser.id)//getting all liked channels from DB for the user for refreshing state
                    }
                })
        }
    }

    let channelsToRender
    if (location.pathname === '/favorites' && markedChannels) {
        //for page Favorites will render only channels with mark isLike true
        channelsToRender = markedChannels.filter((element) => element.isLiked === true)

    } else {//markedChannels is the same as channels but with one extra property 'isLiked' for every channel
        channelsToRender = markedChannels ? markedChannels : channels
    }


    let content = ''
    if (channelsToRender && channelsToRender.length === 0) {
        content = <div className='container pb-5'>There are no channels in the list </div>
    }
    else if (channelsToRender) {
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
    }

    let headerText = location.pathname === '/favorites' && isLoggedIn ? 'Favoritkanaler' : 'Våra kanaler'

    return (
        <div className={styles.channelList}>
            <h1 className={styles.heading}>{headerText}</h1>
            {content}
        </div>
    );
};

export default ChannelList;
