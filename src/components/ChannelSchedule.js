 import { useContext, useEffect, useState } from "react";
import { ChannelContext } from "../contexts/ChannelContext";
 import styles from "../styles/ChannelSchedule.module.css";


const ChannelSchedule = (props) => {
    let channelId = props.channelId
    let chosenDate = props.chosenDate
    
    const [schedule, setSchedule] = useState(null);
    const {getChannelSchedule } = useContext(ChannelContext);
    
    
    useEffect( ()=> {
        const scheduleGetting = async () => {
            let response = await getChannelSchedule(channelId, chosenDate)
            setSchedule(response)
        }
        scheduleGetting()
        
    },[chosenDate])

    // useEffect( ()=> {
    //     console.log(schedule);
        
    // },[schedule])

    

    let content = ''
    if(schedule) {
        
        
        content = <div>

            {schedule.map((program, i) => (

             <div key={i} className={styles.programInfo}>
                 <b>{program.starttimeutc}</b> <b>{program.program.name}</b>
                 <p>{program.description}</p>
             </div>
            ))}
            
        </div>
            
        
    } else {
        content = <div>Loading...</div>
    }
    return (
        <div className={styles.channelSchedule}>
           
            {content}
        </div>
    );
};

export default ChannelSchedule;

