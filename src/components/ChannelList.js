import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChannelContext } from "../contexts/ChannelContext";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/ChannelList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


const ChannelList = () => {
    const history = useHistory()
  
    const { channels } = useContext(ChannelContext);

    const { registerChannelsLike, activeUser, isLoggedIn, markedChannels } = useContext(UserContext);

    useEffect(() => {
        console.log(`activeUser is`, activeUser)
        
    }, [activeUser]);

    
    
    const handleLikeClick = async (channelId) => {
        console.log(`channelId of liked channel`, channelId, `by user with id ${activeUser.id}`) //{ userId: 2, channelId: 132}
        let userAndChannelId = { 
            userId: activeUser.id,
            channelId: channelId
        }
        let result = await registerChannelsLike(userAndChannelId)
        .then(result => {
            if(result.success) {
                document.querySelector(`#btn${channelId}`).children[0].style.color = 'red'
                console.log(`isSuccess`, result)
            }
        })
       
    }

    let content = ''

    if(channels) {
        let channelsToRender = markedChannels ? markedChannels : channels
        
        content = <div className='container d-flex flex-wrap justify-content-center justify-content-lg-evenly justify-content-xl-between py-3'> 
                    
                        {channelsToRender.map((ch, i) => (
                           <div key={i}>
                            <div className={styles.imageBox} >
                                { isLoggedIn && <button onClick={()=> handleLikeClick(ch.id)} type='button' id={`btn${ch.id}`} className={styles.btnLike}>
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
