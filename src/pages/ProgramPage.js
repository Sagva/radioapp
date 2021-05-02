import { useContext, useEffect, useState } from "react";
import { ChannelContext } from "../contexts/ChannelContext";
import styles from '../styles/ChannelList.module.css'
import { UserContext } from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { LikesContext } from "../contexts/LikesContext";

const ProgramPage = (props) => {
    const programId = props.match.params.programId
    const { getProgrambyId } = useContext(ChannelContext);
    const { isLoggedIn, activeUser } = useContext(UserContext);
    const { registerProgramsLike, isChannelOrProgramLiked, likedPrograms, getLikedProgramsByUserId, deleteProgramsLike } = useContext(LikesContext);

    const [program, setProgram] = useState(null);

    //getting program from SR API
    useEffect(() => {
        const programGetting = async () => {
            let response = await getProgrambyId(programId)
            setProgram(response.program)
        }
        programGetting()
    }, [programId])

    const [isProgramLiked, setIsProgramLiked] = useState(false);

    //check if the program is in the list of liked programs of that user
    useEffect(() => {
        if (isLoggedIn && program && likedPrograms) {
            setIsProgramLiked(isChannelOrProgramLiked(program.id, likedPrograms))//either true or false
        }
    }, [isLoggedIn, program, likedPrograms])

    //for changing status of the program on like click
    const markProgram = () => {
        getLikedProgramsByUserId(activeUser.id)//getting liked programs from DB for particular user, 
        //function refreshes variable 'likedPrograms', it triggers renewal of variable 'isProgramLiked', so the icon heart gets its color
        
    }

    const handleLikeClick = async (programId) => {
        let userAndProgramId = {
            userId: activeUser.id,
            programId: programId
        }
        if (!isProgramLiked) {
            await registerProgramsLike(userAndProgramId) //add liked program to DB
            markProgram()//refreshes variable 'isProgramLiked'
        } else if (isProgramLiked) {
            await deleteProgramsLike(userAndProgramId)////delete liked program from DB
            markProgram()//refreshes variable 'isProgramLiked'
        }
    }

    let content = ''
    if (program) {
        content = <div>
            <h2 className='text-center'>{program.name}</h2>
            <div className='d-sm-flex container border-top pt-4'>
                <div className={`${styles.imageBox} mx-3 my-2 flex-shrink-0`}>
                    <img className='img-fluid img-thumbnail' src={program.programimage} alt={program.name} />
                </div>
                <div>
                    {program.channel.name !== '[No channel]' && <p className='mx-3 my-2'><b>Kanal:</b> {program.channel.name}</p>}
                    {program.programcategory && <p className='mx-3 my-2'><b>Kategori:</b> {program.programcategory.name}</p>}
                    {program.broadcastinfo && <p className='mx-3 my-2'><b>Sänds:</b> {program.broadcastinfo}</p>}
                    <p className='mx-3 my-2'><b>Beskrivning:</b> {program.description}</p>
                    <p>program.id {program.id}</p>
                </div>
                <div className='flex-grow-1 d-flex justify-content-end align-items-start'>
                    {isLoggedIn && <button onClick={() => handleLikeClick(program.id)} type='button' id={`btn${program.id}`} className={`${styles.btnLikeProgram} my-2 `}>
                        <FontAwesomeIcon icon={faHeart}
                            className={`${styles.heartIcon}`}
                            style={isProgramLiked ? { color: 'red' } : { color: 'white' }}
                        />
                    </button>}
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

