import { useContext, useEffect, useState } from "react";
import { ChannelContext } from "../contexts/ChannelContext";
import styles from "../styles/ChannelDetails.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ChannelSchedule from '../components/ChannelSchedule'


const ChannelDetails = (props) => {
    const {channelId} = props.match.params
    const [oneChannel, setOneChannel] = useState(null);
    

    const {getChannelbyId } = useContext(ChannelContext);
    
   
    useEffect(async ()=> {
        
        let channel = await getChannelbyId(channelId)
        setOneChannel(channel)
        
    }, [channelId])

    
    const getCurrentDate = () => {
        //2020-01-01
        const today = new Date(); 
        const nullBeforeMonth = today.getMonth() <= 9 ? '0' : '' 
        const nullBeforeDay = today.getDate() <= 9 ? '0' : '' 
        const date = today.getFullYear() + '-' + nullBeforeMonth + (today.getMonth() + 1) + '-' +  nullBeforeDay + today.getDate();
        return date
    }
    const [chosenDate, setChosenDate] = useState(getCurrentDate());
    // let chosenDate;
    const handleChange = (e) => {
        console.log(e.target.value);
        setChosenDate(e.target.value)
    }

    let content = ''
    if(oneChannel) {
        let fetchedChannel = oneChannel.channel
        
        content = <div className={styles.wrapper}>
             <h1>{fetchedChannel.name}</h1>
            <div className={styles.channelInfo}>
                <div className={styles.channelImgBox}>
                    <img  src={fetchedChannel.image} alt={`${fetchedChannel.channeltype} ${fetchedChannel.name}`}></img>
                </div>
                <div className={styles.channelTagline}>{fetchedChannel.tagline}</div>
                
            </div>
            <div style={{background: 'white', color: '#333'}}>
                <h2>Tablå</h2>
                <div>
                    {/* <button type="button" value='Igår'>Igår</button>
                    <button type="button" value='Idag'>Idag</button>
                    <button type="button" value='Imorgon'>Imorgon</button> */}
                    <div>
                        <label className={styles.dateLabel} htmlFor="start"><b>Välj datum:</b></label>

                        <input type="date" id="start" name="trip-start"
                            value={chosenDate}
                            min="2020-01-01" max="2022-12-31" onChange={(e)=>handleChange(e)}/>

                    </div>
                </div>
                
                <ChannelSchedule channelId={channelId} chosenDate={chosenDate}/>
            </div>
        </div>
    } else {
        content = <div>Loading...</div>
    }
  
    return (
        <div className={styles.channelDetails}>
           
            {content}
        </div>
    );
};

export default ChannelDetails;

