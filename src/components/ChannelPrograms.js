import { useContext, useEffect, useState } from "react";
import { ChannelContext } from "../contexts/ChannelContext";
 import styles from "../styles/ChannelPrograms.module.css";


const ChannelPrograms = (props) => {
    let channelId = props.channelId
    console.log(channelId);
    
    const {getChannelPrograms } = useContext(ChannelContext);
    const [programs, setPrograms] = useState(null);
    
    
    useEffect( ()=> {
        const programsGetting = async () => {
            let response = await getChannelPrograms(channelId)
            setPrograms(response.programs)

        }
        programsGetting()
        
    },[])

    useEffect( ()=> {
        console.log(programs);
        
    },[programs])

    

    let content = ''
    if(programs) {
        
        
        content = <div className={styles.programsBox}>

            {programs.map((program, i) => (

            <div key={i} className={styles.programInfo}>
                <div className={styles.programImgBox}><img src={program.programimage} alt={program.name}/></div>
                <div className={styles.programDetails}>
                    <span><b>{program.name}</b> </span>
                    <p className={`${styles.programDesc} d-sm-none`}>{program.description.slice(0, 50) + "..."}</p>
                    <p className={`${styles.programDesc} d-none d-sm-block`}>{program.description}</p>
                    
                    
                </div>
            </div>
            ))}
            
        </div>
            
        
    } else {
        content = <div>Loading...</div>
    }
    return (
        <div className={styles.channelPrograms}>
           
            {content}
        </div>
    );
};

export default ChannelPrograms;

