import { useContext, useEffect, useState } from "react";
import { ChannelContext } from "../contexts/ChannelContext";
import styles from "../styles/ChannelDetails.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ChannelSchedule from '../components/ChannelSchedule'
import ChannelPrograms from '../components/ChannelPrograms'


const ChannelDetails = (props) => {
    const {channelId} = props.match.params
    const [oneChannel, setOneChannel] = useState(null);
    const [componentToRender, setComponentToRender] = useState('schedule');
    

    const {getChannelbyId } = useContext(ChannelContext);
    
   
    // useEffect(async ()=> {
        
    //     let channel = await getChannelbyId(channelId)
    //     setOneChannel(channel)
        
    // }, [channelId])

    useEffect( ()=> {
        const channelGetting = async () => {
            let channel = await getChannelbyId(channelId)
            setOneChannel(channel)

        }
        channelGetting()
        
    },[channelId])

    
    const chooseComponentToRender = (e) => {
        setComponentToRender(e.target.value);
    }
    
    let content = ''
    if(oneChannel) {
        let fetchedChannel = oneChannel.channel
        
        content = <div className={styles.wrapper}>
             <div className={styles.detailsHeader}>
                 <div className='container'>
                     <h1>{fetchedChannel.name}</h1>
                    <div className={styles.channelInfo}>
                        <div className={styles.channelImgBox}>
                            <img  src={fetchedChannel.image} alt={`${fetchedChannel.channeltype} ${fetchedChannel.name}`}></img>
                        </div>

                        <div className='d-flex flex-column flex-md-column-reverse'>
                            <div className={styles.channelTagline}>{fetchedChannel.tagline}</div>
                            <div className='mx-4 mb-4 mb-md-0 d-flex justify-content-center justify-content-md-start '>
                                <button className={`${styles.btnChooseComp}`} type="button" id='schedule' value='schedule' onClick={(e)=>chooseComponentToRender(e)}>Tablå</button>
                                <button className={`${styles.btnChooseComp} `} type="button" id='program' value='program' onClick={(e)=>chooseComponentToRender(e)}>Program</button>
                            </div>
                        </div>
                        
                    </div>
                 </div>
             </div>
            
            <div className={`${styles.schedAndProgBlock} container`} >
                
                {componentToRender === 'schedule' ? 
                    <ChannelSchedule channelId={channelId} /> :
                    <ChannelPrograms channelId={channelId}/>
                }
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

