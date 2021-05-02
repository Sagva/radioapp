import { useContext, useEffect, useState } from "react";
import {useHistory} from 'react-router-dom'
import { ChannelContext } from "../contexts/ChannelContext";
import styles from "../styles/ChannelPrograms.module.css";

const ChosenPrograms = (props) => {
    const categoryId = props.match.params.categoryId
    const {getProgramsByCategoryId } = useContext(ChannelContext);
    const [programs, setPrograms] = useState(null);
    
    
    useEffect( ()=> {
        const programsGetting = async () => {
            let response = await getProgramsByCategoryId(categoryId)
            setPrograms(response.programs)

        }
        programsGetting()
        
    },[categoryId, getProgramsByCategoryId])

    useEffect( ()=> {
        console.log(programs);
        
    },[programs])

    const history = useHistory()
    const redirectToProgramPage =(programId) => {
        history.push(`/program/getbyid/${programId}`)
    }

    let content = ''
    if(programs) {
        
        
        content = <div className={styles.programsBox}>
            <h2 className='px-0 border-bottom'>{programs[0].programcategory.name}</h2>
            {programs.map((program, i) => (

            <div key={i} className={`${styles.programInfo} d-flex my-3`} onClick={()=>redirectToProgramPage(`${program.id}`)}>
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
        <div className='container'>
           
            {content}
        </div>
    );
};

export default ChosenPrograms;

