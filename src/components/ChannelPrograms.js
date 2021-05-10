import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom'
import { ChannelContext } from "../contexts/ChannelContext";
import { LikesContext } from "../contexts/LikesContext";
import { UserContext } from "../contexts/UserContext";
import { PlayerContext } from "../contexts/PlayerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styles from "../styles/ChannelPrograms.module.css";


const ChannelPrograms = (props) => {
    let channelId = props.channelId ? props.channelId : '' //the component uses 2 times. One time it gets props, but the other time it uses data from context, so if there is no prop, we don't want to use them

    const location = useLocation() //for checking location.pathname. Depends on location.pathname the page will render different content
    const history = useHistory()//by using history.push happens redirecting to program page

    const { getChannelPrograms, getProgrambyId } = useContext(ChannelContext);
    const { isLoggedIn } = useContext(UserContext);
    const { likedPrograms } = useContext(LikesContext);
    const { handlePauseClick, handlePlayClick, resourceToPlay, setResourceToPlay  } = useContext(PlayerContext);

    //Decision about what programs we are going to render (all programs from SR API or only liked for that particular user) will depend on location.pathname
    let isAllPrograms = location.pathname === '/favorites' ? false : true
    
    //programsToRender which depends on location.pathname will store here
    const [programsToRender, setProgramsToRender] = useState([]);

    

    useEffect(() => {

    }, [programsToRender])


    //for geting all programs from SR API for one particular channel
    useEffect(() => {
        if (isAllPrograms) {//if isAllPrograms=true we are not on the '/favorites' page, so we will render all programs

            const programsGetting = async () => {
                let response = await getChannelPrograms(channelId)//get all programs from SR API for the particular channel
                setProgramsToRender(response.programs)//save result in programsToRender
            }
            programsGetting()
        }
    }, [channelId, getChannelPrograms, isAllPrograms])

    //for rendering only favorite programs
    const programsGetting = async () => {
        likedPrograms.forEach(async (element) => {//take favorite program's ID's from DB 
            await getProgrambyId(element.programId)//for every ID call function which get a program from SR API
                .then(response => {
                    setProgramsToRender(prevArray => [...prevArray, response.program]) //save result in programsToRender
                })
        })
    }
    useEffect(() => {
        if (!isAllPrograms && likedPrograms) {//if isAllPrograms=false we are on the '/favorites' page, so we will render only liked programs. We need also wait until 'likedPrograms' are obtained from DB
            programsGetting()
        }
    }, [likedPrograms, isAllPrograms])

    
    const redirectToProgramPage = (programId) => {
        setResourceToPlay('')
        history.push(`/program/getbyid/${programId}`)
    }

     


    let headerText = location.pathname === '/favorites' && isLoggedIn ? <h1>Favoritprogram</h1> : <h2>Program</h2>
    let content = ''

    if (programsToRender.length === 0) {
        content = <div className='container'>
            {headerText}
            <p>There are no programs in the list</p>
        </div>

    } else if (programsToRender) {
        content = <div className='container mb-5 pb-5'>
            {headerText}
                <AudioPlayer 
                    className='player'
                    customAdditionalControls={[]}
                    onPause={handlePauseClick} 
                    src={resourceToPlay ? resourceToPlay : '#'}
                    // other props here
                /> 
            {programsToRender.map((program, i) => (
                <div key={i} className={`${styles.programInfo} d-flex my-3`} onClick={() => redirectToProgramPage(`${program.id}`)}>
                    <div className={styles.programImgBox}><img src={program.programimage} alt={program.name} /></div>
                    <div className={styles.programDetails}>
                        <span><b>{program.name}</b> </span>
                        <p className={`${styles.programDesc} d-sm-none`}>{program.description.slice(0, 50) + "..."}</p>
                        <p className={`${styles.programDesc} d-none d-sm-block`}>{program.description}</p>
                    </div>
                    
                    <button onClick={(e)=> handlePlayClick(e, `${program.id}` )} className={`btnPlay btnPlay-${program.id}`}>
                        <FontAwesomeIcon icon={faPlay} className='playIcon'/>
                    </button>
                </div>
            ))}
           
        </div>
    }

    return (
        <div >

            {content}
        </div>
    );
};

export default ChannelPrograms;

