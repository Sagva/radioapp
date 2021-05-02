import { useContext, useEffect, useState } from "react";
import { ChannelContext } from "../contexts/ChannelContext";
import styles from "../styles/ChannelSchedule.module.css";
import {useHistory} from 'react-router-dom'

const ChannelSchedule = (props) => {
    let channelId = props.channelId
    
    
    const [schedule, setSchedule] = useState(null);
    const {getChannelSchedule } = useContext(ChannelContext);
    
    const getCurrentDate = () => {
        
        const today = new Date(); 
        const nullBeforeMonth = today.getMonth() <= 9 ? '0' : '' 
        const nullBeforeDay = today.getDate() <= 9 ? '0' : '' 
        const date = today.getFullYear() + '-' + nullBeforeMonth + (today.getMonth() + 1) + '-' +  nullBeforeDay + today.getDate();
        return date //2020-01-01
    }
    const [chosenDate, setChosenDate] = useState(getCurrentDate());
    useEffect( ()=> {
        const scheduleGetting = async () => {
            let response = await getChannelSchedule(channelId, chosenDate)
            setSchedule(response)
        }
        scheduleGetting()
        
    },[chosenDate, channelId, getChannelSchedule]) 
    
    const handleChange = (e) => {
        console.log(e.target.value);
        setChosenDate(e.target.value)
    }
    const history = useHistory()
    const redirectToProgramPage =(programId) => {
        history.push(`/program/getbyid/${programId}`)
    }

    let content = ''
    if(schedule) {
        
        
        content = <div>
            <h2>Tablå</h2>
            <div>
                <label className={styles.dateLabel} htmlFor="date"><b>Välj datum:</b></label>

                <input type="date" id="date" 
                    value={chosenDate}
                    min="2020-01-01" 
                    max="2022-12-31" 
                    onChange={(e)=>handleChange(e)}/>

            </div>
            {schedule.map((program, i) => (

             <div key={i} className={`${styles.programInfo}`} onClick={()=>redirectToProgramPage(`${program.program.id}`)}>
                 <span className='d-inline-block mt-2'><b>{program.starttimeutc}</b> <b>{program.program.name}</b></span>
                 <p className={styles.programDesc}>{program.description}</p>
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

