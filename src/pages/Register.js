import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import styles from '../styles/Login.module.css'

const Register = () => {
    const history = useHistory()
    
    const { register, login, setIsLoggedIn, setActiveUser, whoAmI } = useContext(UserContext);

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    const handleNameChange = (e) => {
        setUserName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault()

        let inputedData = {
            userName,
            email,
            password
        };

        console.log('Data inputed when registered', inputedData);
        let result = await register(inputedData);
        
        if(result.error) {
            console.log('inside error if', result.error);
            
        } else if(result.success) {
            
            inputedData = {
                email,
                password
            };
            result = await login(inputedData);
            
            if (result.success) {
                setIsLoggedIn(true)
                setActiveUser(false)
                whoAmI()
                history.push("/");
            }
        }
    }

  
  return (
    
    <div className={`${styles.loginWrapper} py-2`}>
    <div className='container'>
        <h1 className='my-4 text-center'>Bli medlem</h1>
        <div className={styles.loginBlock}>
            <form onSubmit={(e) => handleSubmit(e)} className='pb-1'>
                <div className="mb-3">
                    <label for="userName" className="form-label">Your name</label>
                    <input placeholder='your name' type="text" className="form-control" id="userName" onChange={(e) => handleNameChange(e)}/>
                    
                </div>
                <div className="mb-4">
                    <label for="email" className="form-label">Email</label>
                    <input placeholder='email' type="email" className="form-control" id="email" onChange={(e) => handleEmailChange(e)}/>
                </div>
                <div className="mb-4">
                    <label for="password" className="form-label">Password</label>
                    <input placeholder='password' type="password" className="form-control" id="password" onChange={(e) => handlePasswordChange(e)}/>
                </div>
                
                <div className='text-center'><button type="submit" className='btnBrand'>Bli medlem</button></div>
            </form>
        </div>
    </div>
    </div>
  );
};

export default Register;
