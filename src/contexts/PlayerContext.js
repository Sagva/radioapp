import { createContext, useState, useContext } from "react";
import { ChannelContext } from "../contexts/ChannelContext";

export const PlayerContext = createContext();

const PlayerProvider = (props) => {
    const { getAudioSource } = useContext(ChannelContext);
    const [resourceToPlay, setResourceToPlay] = useState('');


    const handlePauseClick = () => {
        let allBtns = document.querySelectorAll('.btnPlay')
        allBtns.forEach(btn => btn.style.display = "block")
        setResourceToPlay('')
    }

    const handlePlayClick = async (e, progId) => {
        e.stopPropagation()
        await getAudioSource(progId)
            .then(result => {
                document.querySelectorAll('.btnPlay').forEach(btn => btn.style.display = "block")
                setResourceToPlay('')
                if (result.broadcasts.length > 0) {
                    let audioSourse = result.broadcasts[0].broadcastfiles[0].url
                    setResourceToPlay(audioSourse)
                    document.querySelector(`.btnPlay-${progId}`).style.display = "none"
                } else if (result.broadcasts.length === 0) {
                    alert(`Currently there are no broadcasts files for that program, try another one.`)
                    console.log('There is no brodcasts file for that program')
                }
            })
            .catch(err => console.log(`Some error here`, err))
    }




    const values = {
        resourceToPlay,
        setResourceToPlay,
        handlePauseClick,
        handlePlayClick
    };

    return (
        <PlayerContext.Provider value={values}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerProvider;
