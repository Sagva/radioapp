import { useContext, useEffect, useState } from "react";
import { ChannelContext } from "../contexts/ChannelContext";
 


const LastPublished = () => {
    
    let content = ''
    if(true) {
        
        
        content = <div>
            
        </div>
            
        
    } else {
        content = <div>Loading...</div>
    }
    return (
        <div>
            <h1>Last Published</h1>
            {content}
        </div>
    );
};

export default LastPublished;

