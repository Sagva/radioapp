import { useContext, useEffect, useState } from "react";
import { ChannelContext } from "../contexts/ChannelContext";
import LastPublished from '../components/LastPublished.js'


const ProgramPage = (props) => {
    const programId = props.match.params.programId
    console.log(programId);
    
    const {getProgrambyId } = useContext(ChannelContext);
    const [program, setProgram] = useState(null);
    
    
    useEffect( ()=> {
        const programGetting = async () => {
            let response = await getProgrambyId(programId)
            setProgram(response.program)

        }
        programGetting()
        
    },[programId])

    useEffect( ()=> {
        console.log(program);
        
    },[program])

    let content = ''
    if(program) {
        
        
        content = <div>
            
            <h2 className='text-center'>{program.name}</h2>
            <div className='d-sm-flex'>
                <div className='mx-3 my-2'><img className='img-fluid img-thumbnail' src={program.programimage} alt={program.name}/></div>
                <div>
                    <p className='mx-3 my-2'><b>Kanal:</b> {program.channel.name}</p>
                    <p className='mx-3 my-2'><b>Kategori:</b> {program.programcategory.name}</p>
                    <p className='mx-3 my-2'><b>Sänds:</b> {program.broadcastinfo}</p>
                    <p className='mx-3 my-2'><b>Beskrivning:</b> {program.description}</p>
                </div>
            </div>
            <LastPublished/>
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

