import { useContext, useEffect, useState } from "react";
import { ChannelContext } from "../contexts/ChannelContext";
import styles from '../styles/ChannelList.module.css'
import { UserContext } from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ProgramPage = (props) => {
    const programId = props.match.params.programId
    const {getProgrambyId } = useContext(ChannelContext);
    const { isLoggedIn } = useContext(UserContext);

    const [program, setProgram] = useState(null);
    
    
    useEffect( ()=> {
        const programGetting = async () => {
            let response = await getProgrambyId(programId)
            setProgram(response.program)

        }
        programGetting()
        
    },[programId])

    useEffect( ()=> {
        console.log(`program is`, program);
        
    },[program])

    let content = ''
    if(program) {
        
        
        content = <div>
            
            <h2 className='text-center'>{program.name}</h2>
            <div className='d-sm-flex container border-top pt-4'>
                <div className={`${styles.imageBox} mx-3 my-2 flex-shrink-0`}><img className='img-fluid img-thumbnail' src={program.programimage} alt={program.name}/></div>
                <div>
                { isLoggedIn && <button type='button' id={`btn${program.id}`} className={styles.btnLike}>
                                    <FontAwesomeIcon icon={faHeart} 
                                        className={`${styles.heartIcon}`} 
                                        // style={ ch.isLiked ? { color: 'red'} : {color : 'white'} } 
                                    />
                                </button>}
                    { program.channel.name !=='[No channel]' && <p className='mx-3 my-2'><b>Kanal:</b> {program.channel.name}</p>}
                    { program.programcategory && <p className='mx-3 my-2'><b>Kategori:</b> {program.programcategory.name}</p>}
                    { program.broadcastinfo && <p className='mx-3 my-2'><b>Sänds:</b> {program.broadcastinfo}</p>}
                    <p className='mx-3 my-2'><b>Beskrivning:</b> {program.description}</p>
                </div>
            </div>
            
        </div>
            
        
    } else {
        content = <div>Loading...</div>
    }
    return (
        <div>
            
            {content}
        </div>
    );
};

export default ProgramPage;

