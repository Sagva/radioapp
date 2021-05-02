import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const UserPage = () => {

    const { editUserName, activeUser } = useContext(UserContext);
    const [newUserName, setNewUserName] = useState(null);


    useEffect(() => {

    }, [activeUser])

    const handleOnChange = (e) => {
        setNewUserName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userData = {
            userName: newUserName,
            id: activeUser.id
        };
        await editUserName(userData)
        .then(()=>{
            document.getElementById('newUserName').value='';
        })
    };

    let content = ''
    if (activeUser) {
        content = <div className='container'>
            <h1>Min sida</h1>
            <div className='border-top py-4'>
                <h4 className='mb-3'><ins>Användarinformation</ins></h4>
                <p><b>Användarnamn:</b> {activeUser.userName}</p>
                <p><b>E-post:</b> {activeUser.email}</p>
            </div>
            <div className='py-4'>
                <h4 className='mb-3'><ins>Ändra avändarnamn</ins></h4>

                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div>
                        <label htmlFor="newUserName" className='d-block'>Skriv ett nytt användarnamn</label>
                    
                    <input
                        id='newUserName'
                        type="text"
                        placeholder="Skriv ett nytt användarnamn" 
                        onChange={handleOnChange}
                        className='d-block py-2 mb-3'
                        
                    />
                    </div>

                    <button className='btnBrand' type="submit">
                        Ändra
                    </button>
                </form>

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

export default UserPage;

